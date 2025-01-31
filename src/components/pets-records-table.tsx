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
import { ToastAction } from "./ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Updatepet } from "./update-pet-form";

export function PetRecordsTable({ number }: { number?: number }) {
  const { toast } = useToast();
  const [petRecords, setPetRecords] = useState<any>([]);
  useEffect(() => {
    const getAllAddoptionHistory = async () => {
      const response = await fetch("https://pet-nation.onrender.com/getallpet");
      const data = await response.json();
      if (response.ok) {
        setPetRecords(data.data);
      } else {
        setPetRecords([]);
      }
    };
    getAllAddoptionHistory();
  }, []);

  const handleDeletePets = async (id: string) => {
    const response = await fetch(
      `https://pet-nation.onrender.com/deletepet/${id}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      return toast({
        variant: "destructive",
        className: "h-[50px] font-bold myfont",
        description: "An unknown error has occurred",
      });
    } else {
      const filter_id = petRecords.filter((x: any) => x.id !== id);
      setPetRecords(filter_id);
      return toast({
        variant: "success",
        className: "h-[50px] font-bold myfont",
        description: "Pet record was deleted successfully",
      });
    }
  };
  const displayedPetRecords = number ? petRecords.slice(0, number) : petRecords;
  return displayedPetRecords.length > 0 ? (
    <Table className="myfont">
      <TableCaption className="bg-foreground/5 py-4 border-y m-0">
        A list of your recent invoices.
      </TableCaption>
      <TableHeader>
        <TableRow className="bg-foreground/5">
          <TableHead className="">Pet ID</TableHead>
          <TableHead className="whitespace-nowrap">Pet Breed</TableHead>
          <TableHead className="whitespace-nowrap">Health status</TableHead>
          <TableHead className="whitespace-nowrap">Pet age</TableHead>
          <TableHead className="whitespace-nowrap">Pet species</TableHead>
          <TableHead className="whitespace-nowrap">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {displayedPetRecords.map((pet: any, index: number) => (
          <TableRow
            key={index}
            className="even:bg-foreground/5 whitespace-nowrap h-12"
          >
            <TableCell className="font-medium text-blue-500">
              {pet.id}
            </TableCell>
            <TableCell className="capitalize">{pet.breed}</TableCell>
            <TableCell className="whitespace-nowrap">
              <div
                className={` ${
                  pet.health === "healthy"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                } font-bold  flex items-center py-2 rounded-full justify-center`}
              >
                {pet.health}
              </div>
            </TableCell>
            <TableCell>{pet.age}</TableCell>
            <TableCell className="whitespace-nowrap">{pet.species}</TableCell>

            <TableCell className="whitespace-nowrap">
              <div className="flex items-center ">
                <Updatepet
                  formData={{
                    breed: pet.breed,
                    age: pet.age,
                    species: pet.species,
                    health: pet.health,
                    image: pet.image,
                  }}
                  petId={pet.id}
                  petRecords={petRecords}
                  setPetRecords={setPetRecords}
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
                          onClick={() => handleDeletePets(pet.id)}
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
      {Array.from({ length: 18 }).map((_, index) => (
        <div
          key={index}
          className="aspect-video h-12 w-full rounded-sm border bg-muted/50 animate-pulse"
        />
      ))}
    </div>
  );
}
