import { CgSpinnerAlt } from "react-icons/cg";
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
import { createAdoptionTypes } from "@/schema/form-validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
export function UpdateAdoptionHistoryTable({
  trigger,
  formData,
  adaptorID,
}: {
  trigger: React.ReactNode;
  formData: z.infer<typeof createAdoptionTypes>;
  adaptorID: string;
}) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createAdoptionTypes>>({
    resolver: zodResolver(createAdoptionTypes),
    defaultValues: {
      email: formData?.email || "",
      name: formData?.name || "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof createAdoptionTypes>) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://pet-nation.onrender.com/updateadoptor/${adaptorID}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            adaptorName: values.name,
            email: values.email,
          }),
        }
      );
      const result = await response.text();
      console.log(result);
      if (!response)
        return toast({
          variant: "destructive",
          className: "h-[50px] font-bold myfont",
          description: "Could not establish a secure connection",
        });
      if (!response.ok) {
        const feedback = await response.text();
        return toast({
          variant: "destructive",
          className: "h-[50px] font-bold myfont",
          description: feedback,
        });
      }
      return toast({
        variant: "success",
        className: "h-[50px] font-bold myfont",
        description: "Update was successful",
      });
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="myfont">
        <SheetHeader>
          <SheetTitle>Edit adopter records</SheetTitle>
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
              name="name"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">Name of Adaptor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Joan James John"
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
              name="email"
              render={({ field }) => (
                <FormItem className="w-full relative">
                  <FormLabel className="text-xs">
                    Email of the adaptor
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John@gmail.com"
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
