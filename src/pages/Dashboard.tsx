import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
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
import DashboardCurrentStats from "@/components/dashboard-stats";
import { useNavigate } from "react-router-dom";
import PetCards from "@/components/pet-card";
import { PetAdaptorHistoryTable } from "@/components/pet-adoption-history-table";
import { CreatePet } from "@/components/create-pet";

export default function Dashboard() {
  const direct = useNavigate();

  return (
    <SidebarProvider>
      <Toaster />
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 z-40 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 myfont justify-between">
          <div className="flex items-center gap-2">
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
            <ModeToggle />
          </div>
        </header>
        <div className="p-5 myfont text-sm space-y-5">
          <div className="px-6 py-4 border  rounded-lg ">
            <DashboardCurrentStats />
          </div>
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg">Available pets </div>
            <Button
              onClick={() => direct("dashboard/available-pets")}
              className="text-xs bg-yellow-500 hover:bg-yellow-600 font-bold text-white px-12"
            >
              View all
            </Button>
          </div>
          <PetCards number={6} />
          <div className="flex items-center justify-between">
            <div className="font-bold text-lg">Recent adoptors history </div>
            <Button
              onClick={() => direct("/dashboard/pet-adoption-records")}
              className="text-xs bg-yellow-500 hover:bg-yellow-600 font-bold text-white px-12"
            >
              View all
            </Button>
          </div>
          <div className="p-6 border  rounded-lg overflow-scroll">
            <PetAdaptorHistoryTable number={5} />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
