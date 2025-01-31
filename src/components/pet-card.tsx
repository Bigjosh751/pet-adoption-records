import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { CreateAdoptionHistoryTable } from "./create-adoption-history-table";

function PetCards({ number }: { number?: number }) {
  const [pets, setPets] = useState<any>([]);
  useEffect(() => {
    const getAllAddoptionHistory = async () => {
      const response = await fetch("https://pet-nation.onrender.com/getallpet");
      const data = await response.json();
      if (response.ok) {
        setPets(data.data);
      } else {
        setPets([]);
      }
    };
    getAllAddoptionHistory();
  }, []);
  const displayedPets = number ? pets.slice(0, number) : pets;
  return displayedPets.length > 0 ? (
    <section className="grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2 grid gap-2 myfont text-sm w-full">
      {displayedPets.map((pet: any, index: number) => (
        <div
          className="bg-foreground/5 p-5 rounded-md flex items-center gap-5 relative"
          key={index}
        >
          <div
            className={`text-[8px] font-bold rounded-sm min-w-[50px] px-1 ${
              pet.health === "healthy"
                ? "bg-green-500 text-white"
                : "bg-[red] text-white"
            } absolute top-3 right-3 flex items-center justify-center`}
          >
            {pet.health}
          </div>
          <div className="w-[100px] h-[100px] bg-background rounded-md flex-shrink-0 overflow-hidden">
            <img
              src={pet.image.trim()}
              alt={pet.image.trim()}
              className="w-full h-full"
            />
          </div>
          <div className="flex-col flex items-start gap-2 w-full">
            <div className="font-bold text-base capitalize">{pet.breed}</div>
            <div className="flex items-center gap-4 w-full text-[12px]">
              <span className="text-muted-foreground whitespace-nowrap">
                Species: <span className="font-bold">{pet.species}</span>
              </span>
              <span className="text-muted-foreground whitespace-nowrap">
                Age: <span className="font-bold">{pet.age}</span>
              </span>
            </div>
            <CreateAdoptionHistoryTable
              petId={pet.id}
              trigger={
                <Button className="text-sm w-full font-bold bg-yellow-500 hover:bg-yellow-700 text-white">
                  Adopt pet
                </Button>
              }
            />
          </div>
        </div>
      ))}
    </section>
  ) : (
    <div className="animate-pulse grid-cols-3 max-sm:grid-cols-1 max-xl:grid-cols-2 grid gap-2 w-full">
      {[...Array(number ? number : 35)].map((_, index) => (
        <div
          key={index}
          className="bg-foreground/5 rounded-lg shadow-md w-full p-5 flex items-center gap-5"
        >
          <div className="bg-background rounded-md h-[100px] w-[100px] flex-shrink-0"></div>{" "}
          <div className="flex flex-col space-y-2 w-full">
            <div className="h-4 bg-background rounded-md"></div>{" "}
            <div className="h-3 bg-background rounded-md"></div>{" "}
            <div className="h-8 bg-background rounded-md mt-auto"></div>{" "}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PetCards;
