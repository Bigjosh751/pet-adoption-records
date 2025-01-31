import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Toaster } from "@/components/ui/toaster";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CreatePet } from "@/components/create-pet";
import { PetRecordsTable } from "@/components/pets-records-table";

export default function ManagePetRecords() {
  const direct = useNavigate();
  return (
    <SidebarProvider>
      <Toaster />

      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background z-40 h-16 shrink-0 items-center gap-2 border-b px-4 myfont justify-between">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink onClick={() => direct("/")}>
                    My Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-yellow-500">
                    Manage pets records
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center gap-4">
            <CreatePet
              trigger={
                <Button className="bg-yellow-500 hover:bg-yellow-500 text-white font-bold h-[40px]">
                  Create Pet
                </Button>
              }
            />
          </div>
        </header>
        <div className="p-5">
          <div className="p-6 border  rounded-lg overflow-scroll">
            <PetRecordsTable />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
