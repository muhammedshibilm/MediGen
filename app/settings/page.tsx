"use client";
import { useState,useEffect } from "react";
import { HelpCircle, History, MoveLeft, MoveRight, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string | null>("profile");
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  const backButton = (): void => {
    router.back();
  };

  
const logout = async () => {
  try {
    const res = await fetch("/api/auth/logout", { method: "GET" });
    const data = await res.json();
    if (!res.ok) {
      return toast.error(data.error || "Something went wrong");
    }
    toast.success(data.message || "Logout successful");
    window.location.reload()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Failed to log out");
  }
};

    useEffect(() => {
     
      const fetchUser = async () => {
        try {
          const res = await fetch("/api/auth/me", { method: "GET" });
          const data = await res.json();
          if (res.ok) {
    
            setUser(data);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
   
          setUser(null);
        }
      };

      const history = async () => { 
        try {
          const res = await fetch("/api/doctor-contact", { method: "GET" });
          const data = await res.json();
          if (res.ok) {
            setHistory(data);
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          setHistory([]);
        }
      };
      history();
      fetchUser();
    }, []);



  const renderContent = () => {
    switch (selectedSection) {
      case "profile":
        return <div className=" flex flex-col justify-center items-center  space-y-5">
          <h1 className="text-2xl font-bold text-start w-full">Profile Information</h1>
          <UserCircle2 size={80}/>
         <div className="space-y-4">
         <h1 className="text-xl">Username: {user?.username} </h1>
         <p className="text-md">Email: {user?.email}</p>
         </div>

        </div>;
      case "history":
        return <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold">Appointment History</h1>
            <table>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className=" even:bg-gray-800 ">
                    <td>{item.doctor.split("-")[0]}</td>
                    <td>{item.preferdate.split("T")[0]}</td>
                    <td>{item.preferdate.split("T")[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>;
      case "help":
        return <div>Help and Support Information</div>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className="h-screen container mx-auto">
      <div className="flex gap-10 items-center mt-5">
        <MoveLeft size={35} onClick={backButton} className="hover:cursor-pointer" />
        <h1 className="text-3xl text-center font-bold  w-full">Settings Page</h1>
      </div>
      <div className="flex mt-10 h-full">
        {/* Left Section */}
        <div className="left flex flex-col justify-evenly gap-4 w-1/3">
          <div
            className="flex items-center gap-10 hover:cursor-pointer"
            onClick={() => setSelectedSection("profile")}
          >
            <UserCircle2 size={30} /> <h1 className="text-2xl">Profile</h1> <MoveRight size={30} className={`${selectedSection=="profile"? "text-custom-yellow": "text-white"}`}/>
          </div>
          <div
            className="flex items-center gap-10 hover:cursor-pointer"
            onClick={() => setSelectedSection("history")}
          >
            <History size={30} /> <h1 className="text-2xl">Appointment History</h1> <MoveRight  size={30} className={`${selectedSection=="history"? "text-custom-yellow": "text-white"}`}/>
          </div>
          <div
            className="flex items-center gap-10 hover:cursor-pointer"
            onClick={() => setSelectedSection("help")}
          >
            <HelpCircle size={30} /> <h1 className="text-2xl">Help</h1> <MoveRight size={30}  className={`${selectedSection=="help"? "text-custom-yellow": "text-white"}`} />
          </div>
          <Button className="mr-10 bg-red-600 py-5 text-lg font-bold" onClick={logout}>Log out</Button>
        </div>

        {/* Right Section */}
        <div className="right w-2/3  pl-5">{renderContent()}</div>
      </div>
    </div>
  );
}
