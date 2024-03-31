import { SubmitHandler } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import axios from "axios";
import { toast } from "./ui/use-toast";
import Form from "./Form";
import { useAuth } from "@/Context/UserContext";

interface FormData {
  name: string;
  domainLink: string;
  recordType: string;
}

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.BASE_URL}/api/dns/addDNS`,
        data
      );
      if (res.status === 200) {
        toast({
          title: "DNS record created successfully",
        });
      } else {
        toast({
          title: "Error while creating DNS record",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log("An error occured", err);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 h-[70px] bg-violet-600 text-white">
      <h1 className="font-semibold text-lg">DNS Vault</h1>
      {isLoggedIn && (
        <div className="space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-transparent border border-white hover:bg-violet-500">
                Add New DNS
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New DNS</DialogTitle>
              </DialogHeader>
              <Form onSubmit={onSubmit} />
            </DialogContent>
          </Dialog>
          <Button className="bg-transparent border border-white hover:bg-violet-500" onClick={logout}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
