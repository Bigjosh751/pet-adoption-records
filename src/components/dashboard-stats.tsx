import { useEffect, useState } from "react";
import { FaDoorClosed, FaInbox } from "react-icons/fa";
import { MdHourglassTop } from "react-icons/md";

function DashboardCurrentStats() {
  const [totalPets, setTotalPets] = useState<number>(0);
  const [totalAdopters, setTotalAdopters] = useState<number>(0);
  const [totalSpecies, setTotalSpecies] = useState<number>(0);
  const [totalBreed, setTotalBreed] = useState<number>(0);
  const loadStats = async () => {
    try {
      const response = await fetch(
        `https://pet-nation.onrender.com/getallpet`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        const uniqueSpecies: any = [
          ...new Set(result.data.map((pet: any) => pet.species)),
        ];
        const uniqueBreed: any = [
          ...new Set(result.data.map((pet: any) => pet.breed)),
        ];
        console.log(uniqueBreed);
        setTotalBreed(uniqueBreed.length);
        setTotalSpecies(uniqueSpecies.length);
        setTotalPets(result["total number of pets"]);
      } else {
      }
    } catch (error) {
      console.log("error:", error);
    }
    try {
      const response = await fetch(
        `https://pet-nation.onrender.com/alladoptorhistory`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const result = await response.json();
        setTotalAdopters(result["totalNumberOfAdoptorNames"]);
      } else {
      }
    } catch (error) {
      console.log("error:", error);
    }
  };
  useEffect(() => {
    loadStats();
  }, []);
  return (
    <section className="w-full mb-5">
      <div className="flex items-center justify-between w-full mb-5">
        <div className="">
          <p className="text-base">Current stats</p>
          <p className="surface-text">
            Here are some of your current statistics
          </p>
        </div>
      </div>

      <div className="mb-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-3">
          <div className="py-3 px-7 border bg-foreground/5 rounded-md flex items-center gap-5">
            <div className="text-yellow-500 text-2xl">
              <FaInbox />
            </div>
            <div className="">
              <p className=" max-sm:text-xs">Total pet available</p>
              <p className=" text-xs surface-text">{totalPets} pets</p>
            </div>
          </div>
          <div className="py-3 px-7 border bg-foreground/5 rounded-md flex items-center gap-5">
            <div className="text-yellow-500 text-2xl">
              <MdHourglassTop />
            </div>
            <div className="">
              <p className=" max-sm:text-xs">Total adoptors</p>
              <p className=" text-xs surface-text">{totalAdopters} adopters</p>
            </div>
          </div>
          <div className="py-3 px-7 border bg-foreground/5 rounded-md flex items-center gap-5">
            <div className="text-yellow-500 text-2xl">
              <FaDoorClosed />
            </div>
            <div className="">
              <p className=" max-sm:text-xs">Total species</p>
              <p className=" text-xs surface-text">{totalSpecies} species</p>
            </div>
          </div>
          <div className="py-3 px-7 border bg-foreground/5 rounded-md flex items-center gap-5">
            <div className="text-yellow-500 text-2xl">
              <FaDoorClosed />
            </div>
            <div className="">
              <p className=" max-sm:text-xs">Total Breed</p>
              <p className=" text-xs surface-text">{totalBreed} breed</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardCurrentStats;
