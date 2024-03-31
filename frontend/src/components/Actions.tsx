import { DNS } from "@/DNSDATA/columns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { NotebookPen, Trash2 } from "lucide-react";
import { toast } from "./ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Form from "./Form";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

interface FormData {
    name: string;
    domainLink: string;
    recordType: string;
  }

const Actions = ({ row }: { row: DNS }) => {
  const [open, setOpen] = useState(false);
  const deleteRow = async () => {
    try {
      const res = await axios.delete(
        `${process.env.BASE_URL}/api/dns/deleteDNSById?id=${row.id}`
      );
      if (res.status === 200) {
        toast({
          title: "Record deleted successfully",
        });
      } else {
        toast({
          title: "Error deleted record",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log("An error occured while deleting");
    }
  };
  const editDNS: SubmitHandler<FormData> = async (data) => {
    const newData = {
        ...data,
        id: row.id
    }
    try {
      const res = await axios.patch(
        `${process.env.BASE_URL}/api/dns/editDNS`,
        newData
      );
      if (res.status === 200) {
        toast({
          title: "Record edited successfully",
        });
      } else {
        toast({
          title: "Error editing record",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log("An error occured", err);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0 bg-violet-500 hover:bg-violet-400"
          >
            <span className="sr-only">Open menu</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM12.5 8.625C13.1213 8.625 13.625 8.12132 13.625 7.5C13.625 6.87868 13.1213 6.375 12.5 6.375C11.8787 6.375 11.375 6.87868 11.375 7.5C11.375 8.12132 11.8787 8.625 12.5 8.625Z"
                fill="white"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="flex items-center"
            onClick={() => setOpen(true)}
          >
            <NotebookPen size={16} className="mr-2" color="gray" />
            Edit DNS
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex items-center" onClick={deleteRow}>
            <Trash2 size={16} className="mr-2" color="gray" />
            Delete DNS
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Record</DialogTitle>
          </DialogHeader>
          <Form onSubmit={editDNS} isEdit={true} prevData={row} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Actions;
