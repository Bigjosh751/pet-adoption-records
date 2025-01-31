import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { createPetSchema } from "@/schema/form-validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CgSpinnerAlt } from "react-icons/cg";
import { useState } from "react";
export function Updatepet({
  trigger,
  petId,
  formData,
  petRecords,
  setPetRecords,
}: {
  trigger: React.ReactNode;
  petId: string;
  formData: z.infer<typeof createPetSchema>;
  petRecords: any;
  setPetRecords: React.Dispatch<any>;
}) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof createPetSchema>>({
    resolver: zodResolver(createPetSchema),
    defaultValues: {
      breed: formData.breed || "",
      health: formData.health || "",
      age: formData.age || "",
      species: formData.species || "",
      image: formData.image || "",
    },
  });
  async function onSubmit(values: z.infer<typeof createPetSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://pet-nation.onrender.com/updatepet/${petId}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            breed: values.breed,
            health: values.health,
            age: values.age,
            species: values.species,
            image: values.image,
          }),
        }
      );
      const data = await response.json();
      console.log(data.data);
      if (!response.ok) {
        return toast({
          variant: "destructive",
          className: "h-[50px] font-bold myfont",
          description: data.message,
        });
      } else {
        const updatedData = petRecords.map((item: any) =>
          item.id === petId ? { ...data.data } : item
        );
        setPetRecords(updatedData);
        return toast({
          variant: "success",
          className: "h-[50px] font-bold myfont",
          description: data.message,
        });
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update pet records</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="health"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">Health Status</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Healthy"
                      className="focus-visible:ring-yellow-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">Image url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cucascian Shephard"
                      className="focus-visible:ring-yellow-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">Breed of pet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Cucascian Shephard"
                      className="focus-visible:ring-yellow-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="species"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">Species of pet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Dog"
                      className="focus-visible:ring-yellow-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">Age of pet</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4 years old"
                      className="focus-visible:ring-yellow-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <SheetFooter>
              {isLoading ? (
                <Button
                  type="button"
                  className="bg-yellow-500 text-white font-bold w-full mt-5 hover:bg-yellow-700 opacity-50"
                >
                  <CgSpinnerAlt className="animate-spin text-2xl" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-yellow-500 text-white font-bold w-full mt-5 hover:bg-yellow-700"
                >
                  Save changes
                </Button>
              )}
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
