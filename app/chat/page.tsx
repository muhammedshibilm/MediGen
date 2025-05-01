"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import SideBar from "@/components/Sidebar";
import { Image as ImageIcon, Plus, SendIcon, ThumbsUp, ThumbsDown } from "lucide-react";
import { CircleLoader } from "react-spinners";
import ReactMarkdown from "react-markdown";
import { useNetworkStatus } from "@/context/networkStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import Image  from "next/image";
import ai_avathar from "../../public/android/android-launchericon-144-144.png";

interface Message {
  text: string;
  sender: "human" | "ai";
  feedbackGiven?: boolean;
}

interface AuthData {
  token: string;
  isAdmin: boolean;
}

// Custom hook to manage WebSocket connection
function useChatSocket(isOnline: boolean, token: string | null) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    if (!isOnline || !token) return;
    const ws = new WebSocket(`ws://127.0.0.1:8000/chat?token=${token}`);
    ws.onopen = () => console.log("Connected to WebSocket");
    ws.onerror = (error) => console.error("WebSocket Error:", error);
    setSocket(ws);
    return () => {
      ws.close();
    };
  }, [isOnline, token]);
  return socket;
}

// Modal component with Framer Motion animation
function Modal({
  isOpen,
  onClose,
  title,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 rounded-lg p-6 w-11/12 max-w-lg shadow-xl"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">{title}</h2>
              <button onClick={onClose} className="text-gray-300 text-2xl">
                &times;
              </button>
            </div>
            <div className="text-white">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  // Loading states for modals and training
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [retrainLoading, setRetrainLoading] = useState<boolean>(false);
  const [csvTrainLoading, setCsvTrainLoading] = useState<boolean>(false);

  const [showSymptomModal, setShowSymptomModal] = useState(false);
  const [symptomsInput, setSymptomsInput] = useState<string>("");

  const [showDrugModal, setShowDrugModal] = useState(false);
  const [drugInput, setDrugInput] = useState<string>("");

  const [showTreatmentModal, setShowTreatmentModal] = useState(false);
  const [treatmentData, setTreatmentData] = useState({
    medical_history: "",
    allergies: "",
    current_medications: "",
    symptoms: "",
  });

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { isOnline } = useNetworkStatus();

  // Fetch auth info from your API
  const getAuthInfo = useCallback(async (): Promise<AuthData> => {
    const res = await fetch("/api/auth/me");
    if (!res.ok) {
      throw new Error("Unauthorized");
    }
    const data = await res.json();
    return { token: data.token, isAdmin: data.isAdmin };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { token, isAdmin } = await getAuthInfo();
        setAuthToken(token);
        setIsAdmin(isAdmin);
      } catch (error) {
        console.error("Error retrieving auth token:", error);
      }
    })();
  }, [getAuthInfo]);

  const ws = useChatSocket(isOnline, authToken);

  useEffect(() => {
    if (!ws) return;
    ws.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const formattedText = data.message.replace(/\\n/g, "\n");
        setMessages((prev) => [
          ...prev,
          { text: formattedText, sender: "ai", feedbackGiven: false },
        ]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      } finally {
        setLoading(false);
      }
    };
  }, [ws]);

  const sendMessage = () => {
    if (ws && input.trim()) {
      ws.send(input);
      setMessages((prev) => [...prev, { text: input, sender: "human" }]);
      setInput("");
      setLoading(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files are allowed.");
        return;
      }
      const formData = new FormData();
      formData.append("file", file);
      try {
        if (!authToken) throw new Error("Missing auth token");
        const response = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Medical document uploaded successfully!");
          console.log("Upload successful:", data);
        } else {
          toast.error(data.error || "Upload error.");
          console.error("Upload error:", data.error);
        }
      } catch (error) {
        toast.error("Error uploading file.");
        console.error("Error uploading file:", error);
      }
    }
  };

  const handleFeedback = async (index: number, isPositive: boolean) => {
    const aiMessage = messages[index];
    if (!aiMessage || aiMessage.sender !== "ai" || aiMessage.feedbackGiven)
      return;
    let userQuery = "";
    for (let i = index - 1; i >= 0; i--) {
      if (messages[i].sender === "human") {
        userQuery = messages[i].text;
        break;
      }
    }
    const feedbackLabel =  isPositive ? "medical" : "non-medical";
    try {
      if (!authToken) throw new Error("Missing auth token");
      const res = await fetch("http://127.0.0.1:8000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          query: userQuery,
          response_text: aiMessage.text,
          feedback_label: feedbackLabel,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Feedback submitted.");
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[index].feedbackGiven = true;
          return newMessages;
        });
      } else {
        toast.error(data.error || "Feedback error.");
      }
    } catch (error) {
      toast.error("Error submitting feedback.");
      console.error("Feedback error:", error);
    }
  };

  const handleRetrain = async () => {
    try {
      if (!authToken) throw new Error("Missing auth token");
      setRetrainLoading(true);
      toast.info("Retraining model, please wait...");
      const res = await fetch("http://127.0.0.1:8000/retrain", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`Retrain success: ${data.message}`);
      } else {
        toast.error(data.error || "Retrain error.");
      }
    } catch (error) {
      toast.error("Error retraining model.");
      console.error("Retrain error:", error);
    } finally {
      setRetrainLoading(false);
    }
  };

  const handleTrainCSV = async () => {
    try {
      if (!authToken) throw new Error("Missing auth token");
      setCsvTrainLoading(true);
      toast.info("Training CSV data, please wait...");
      const res = await fetch("http://127.0.0.1:8000/train-csv", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`CSV Training complete: ${data.message}`);
      } else {
        toast.error(data.error || "CSV Training error.");
      }
    } catch (error) {
      toast.error("Error training CSV data.");
      console.error("CSV Training error:", error);
    } finally {
      setCsvTrainLoading(false);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSymptomSubmit = async () => {
    if (!symptomsInput.trim()) return;
    try {
      if (!authToken) throw new Error("Missing auth token");
      setModalLoading(true);
      toast.info("Processing symptom assessment...");
      const res = await fetch("http://127.0.0.1:8000/symptom-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          symptoms: symptomsInput.split(",").map((s) => s.trim()),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Symptom assessment received.");
        setMessages((prev) => [
          ...prev,
          { text: `Symptoms: ${symptomsInput}`, sender: "human" },
          { text: data.message, sender: "ai", feedbackGiven: false },
        ]);
      } else {
        toast.error(data.error || "Symptom checker error.");
      }
    } catch (error) {
      toast.error("Error checking symptoms.");
    } finally {
      setModalLoading(false);
      setShowSymptomModal(false);
      setSymptomsInput("");
    }
  };

  const handleDrugSubmit = async () => {
    if (!drugInput.trim()) return;
    try {
      if (!authToken) throw new Error("Missing auth token");
      setModalLoading(true);
      toast.info("Processing drug interaction check...");
      const res = await fetch("http://127.0.0.1:8000/drug-interaction-checker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          drugs: drugInput.split(",").map((d) => d.trim()),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Drug interaction results received.");
        setMessages((prev) => [
          ...prev,
          { text: `Drug check: ${drugInput}`, sender: "human" },
          { text: data.message, sender: "ai", feedbackGiven: false },
        ]);
      } else {
        toast.error(data.error || "Drug interaction error.");
      }
    } catch (error) {
      toast.error("Error checking drug interactions.");
    } finally {
      setModalLoading(false);
      setShowDrugModal(false);
      setDrugInput("");
    }
  };

  const handleTreatmentSubmit = async () => {
    if (!treatmentData.medical_history.trim() && !treatmentData.symptoms.trim())
      return;
    try {
      if (!authToken) throw new Error("Missing auth token");
      setModalLoading(true);
      toast.info("Processing personalized treatment...");
      const res = await fetch("http://127.0.0.1:8000/personalized-treatment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(treatmentData),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Personalized treatment received.");
        setMessages((prev) => [
          ...prev,
          {
            text: `Personalized Treatment Request: ${JSON.stringify(treatmentData)}`,
            sender: "human",
          },
          { text: data.message, sender: "ai", feedbackGiven: false },
        ]);
      } else {
        toast.error(data.error || "Treatment error.");
      }
    } catch (error) {
      toast.error("Error requesting personalized treatment.");
    } finally {
      setModalLoading(false);
      setShowTreatmentModal(false);
      setTreatmentData({
        medical_history: "",
        allergies: "",
        current_medications: "",
        symptoms: "",
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex h-screen">
        <SideBar />
        <div className="container mx-auto flex-1 flex flex-col pt-10" id="chatpage">
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setShowSymptomModal(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              disabled={modalLoading || retrainLoading || csvTrainLoading}
            >
              Symptom Checker
            </button>
            <button
              onClick={() => setShowDrugModal(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              disabled={modalLoading || retrainLoading || csvTrainLoading}
            >
              Drug Interaction Checker
            </button>
            <button
              onClick={() => setShowTreatmentModal(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              disabled={modalLoading || retrainLoading || csvTrainLoading}
            >
              Personalized Treatment
            </button>
            {isAdmin && (
              <>
            
              </>
            )}
          </div>
          <div  
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 w-[90%] mx-auto scrollbar-hide"
            style={{ paddingBottom: "5rem" }}
          >
            {!isOnline ? (
              <p className="text-center text-red-500">
                You are offline. Please check your internet connection.
              </p>
            ) : (
              <>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${
                      msg.sender === "human" ? "items-end" : "items-start"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {msg.sender === "ai" && (
                        <div className="w-8 h-8 rounded-full  flex items-center justify-center">
                          <Image  src={ai_avathar} alt="ai_avthar"/>
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                          msg.sender === "human"
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-black rounded-bl-none"
                        }`}
                      >
                        {msg.sender === "ai" ? (
                          <ReactMarkdown>{msg.text}</ReactMarkdown>
                        ) : (
                          <p>{msg.text}</p>
                        )}
                      </div>
                      {msg.sender === "human" && (
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white font-bold">U</span>
                        </div>
                      )}
                    </div>
                    {msg.sender === "ai" && !msg.feedbackGiven && (
                      <div className="flex gap-2 mt-1 ml-10">
                        <button
                          onClick={() => handleFeedback(index, true)}
                          className="p-1 rounded hover:bg-green-200"
                          aria-label="Thumbs Up"
                        >
                          <ThumbsUp size={20} />
                        </button>
                        <button
                          onClick={() => handleFeedback(index, false)}
                          className="p-1 rounded hover:bg-red-200"
                          aria-label="Thumbs Down"
                        >
                          <ThumbsDown size={20} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <CircleLoader color="#0E86D4" size={40} />
                  </div>
                )}
              </>
            )}
          </div>
          <div className="w-[90%] shadow-md p-4 fixed bottom-0 flex items-center gap-4 bg-black">
            {isAdmin && (
              <button
                onClick={handleRetrain}
                className="px-3 py-2 bg-yellow-400 text-black font-bold rounded-md focus:outline-none"
                aria-label="Retrain model"
                disabled={retrainLoading || modalLoading || csvTrainLoading}
              >
                {retrainLoading ? "Retraining..." : "Retrain"}
              </button>
            )}
            <button
              className="p-2 rounded-md hover:bg-gray-400 focus:outline-none"
              aria-label="Upload a document"
              onClick={handleUploadClick}
              disabled={retrainLoading || modalLoading || csvTrainLoading}
            >
              <Plus />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              accept="application/pdf"
            />
            <button
              className="p-2 rounded-md hover:bg-gray-400 focus:outline-none"
              aria-label="Add an image"
              disabled={retrainLoading || modalLoading || csvTrainLoading}
            >
              <ImageIcon role="img" aria-label="Add an image" />
            </button>
            <div className="flex-1">
              <input
                disabled={
                  loading ||
                  !isOnline ||
                  retrainLoading ||
                  modalLoading ||
                  csvTrainLoading
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message"
                style={{ resize: "none" }}
                className="w-full p-2 border rounded-md bg-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={sendMessage}
              className="p-2 rounded-md hover:bg-blue-400 focus:outline-none text-blue-500"
              aria-label="Send message"
              disabled={
                loading ||
                !isOnline ||
                retrainLoading ||
                modalLoading ||
                csvTrainLoading
              }
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={showSymptomModal}
        onClose={() => setShowSymptomModal(false)}
        title="Symptom Checker"
      >
        <p className="mb-2">Enter your symptoms (comma separated):</p>
        <input
          type="text"
          value={symptomsInput}
          onChange={(e) => setSymptomsInput(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-700 text-white"
          placeholder="e.g., headache, fever, nausea"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setShowSymptomModal(false)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
            disabled={modalLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSymptomSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            disabled={modalLoading}
          >
            {modalLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showDrugModal}
        onClose={() => setShowDrugModal(false)}
        title="Drug Interaction Checker"
      >
        <p className="mb-2">Enter drug names (comma separated):</p>
        <input
          type="text"
          value={drugInput}
          onChange={(e) => setDrugInput(e.target.value)}
          className="w-full p-2 border rounded-md bg-gray-700 text-white"
          placeholder="e.g., Aspirin, Ibuprofen"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setShowDrugModal(false)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
            disabled={modalLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleDrugSubmit}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            disabled={modalLoading}
          >
            {modalLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showTreatmentModal}
        onClose={() => setShowTreatmentModal(false)}
        title="Personalized Treatment Recommendations"
      >
        <p className="mb-2">Fill in your details:</p>
        <input
          type="text"
          value={treatmentData.medical_history}
          onChange={(e) =>
            setTreatmentData({ ...treatmentData, medical_history: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2 bg-gray-700 text-white"
          placeholder="Medical History"
        />
        <input
          type="text"
          value={treatmentData.allergies}
          onChange={(e) =>
            setTreatmentData({ ...treatmentData, allergies: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2 bg-gray-700 text-white"
          placeholder="Allergies"
        />
        <input
          type="text"
          value={treatmentData.current_medications}
          onChange={(e) =>
            setTreatmentData({ ...treatmentData, current_medications: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2 bg-gray-700 text-white"
          placeholder="Current Medications"
        />
        <input
          type="text"
          value={treatmentData.symptoms}
          onChange={(e) =>
            setTreatmentData({ ...treatmentData, symptoms: e.target.value })
          }
          className="w-full p-2 border rounded-md mb-2 bg-gray-700 text-white"
          placeholder="Symptoms"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setShowTreatmentModal(false)}
            className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition-colors"
            disabled={modalLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleTreatmentSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={modalLoading}
          >
            {modalLoading ? "Processing..." : "Submit"}
          </button>
        </div>
      </Modal>
    </>
  );
}
