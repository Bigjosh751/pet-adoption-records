import { CgEditFlipH } from "react-icons/cg";
import { AiFillDelete } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";
import { UpdateAdoptionHistoryTable } from "./update-adoption-history-table";
import { ToastAction } from "./ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function RecentPetTable() {
  const { toast } = useToast();
  const [adaptors, setAdaptors] = useState<any>([]);
  useEffect(() => {
    const getAllPet = async () => {
      const response = await fetch("https://pet-nation.onrender.com/getallpet");
      const data = await response.json();
      if (response.ok) {
        setAdaptors(data.data.slice(0, 5));
      } else {
        setAdaptors([]);
      }
    };
    getAllPet();
  }, []);
  return adaptors.length > 0 ? (
    <Table className="myfont">
      <TableCaption className="bg-foreground/5 py-4 border-y m-0">
        A list of your recent adaption history.
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-foreground/5">
          <TableHead className="">Pet ID</TableHead>
          <TableHead className="whitespace-nowrap">Name of Adaptor</TableHead>
          <TableHead className="whitespace-nowrap">Email Address</TableHead>
          <TableHead className="whitespace-nowrap">Date of Adoption</TableHead>
          <TableHead className="whitespace-nowrap">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adaptors.map((adaptor: any) => (
          <TableRow
            key={adaptor.petId}
            className="even:bg-foreground/5 whitespace-nowrap h-12"
          >
            <TableCell className="font-medium text-blue-500">
              {adaptor.petId}
            </TableCell>
            <TableCell className="capitalize">{adaptor.adopterName}</TableCell>
            <TableCell>{adaptor.email}</TableCell>
            <TableCell className="whitespace-nowrap">
              {adaptor.adoptionDate}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              <div className="flex items-center">
                <UpdateAdoptionHistoryTable
                  trigger={
                    <Button className="h-[35px] rounded-md bg-yellow-500 hover:bg-yellow-700 w-[50px] rounded-e-none cursor-pointer flex items-center justify-center text-white text-xl">
                      <CgEditFlipH />
                    </Button>
                  }
                />
                <Button
                  className="h-[35px] hover:bg-red-800 rounded-md bg-red-600 w-[50px] rounded-s-none cursor-pointer flex items-center justify-center text-white text-lg"
                  onClick={() =>
                    toast({
                      title: "Confirm Delete",
                      description:
                        "Are you sure you want to delete this record?",
                      action: (
                        <ToastAction
                          altText="Try again"
                          className="bg-red-600 hover:bg-red-800"
                        >
                          Proceed
                        </ToastAction>
                      ),
                    })
                  }
                >
                  <AiFillDelete />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ) : (
    <div className="flex flex-1 flex-col gap-2 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="aspect-video h-12 w-full rounded-sm border bg-muted/50 animate-pulse"
        />
      ))}
    </div>
  );
}
