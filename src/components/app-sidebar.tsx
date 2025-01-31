import { BsFillFileEarmarkFill } from "react-icons/bs";
import { FaStore } from "react-icons/fa";
import { FaHorse } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import * as React from "react";

import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const data = {
  navMain: [
    {
      title: "My Dashboard",
      icon: <BsFillGrid1X2Fill className="" />,
      route: "/",
      num: 0,
    },
    {
      title: "Avaliable pets",
      icon: <FaStore className="text-xl" />,
      route: "/dashboard/available-pets",
    },
    {
      title: "Manage pets records",
      icon: <BsFillFileEarmarkFill className="text-xl" />,
      route: "/dashboard/manage-pets-records",
    },
    {
      title: "Pet adoption records",
      icon: <FaHorse className="text-xl" />,
      route: "/dashboard/pet-adoption-records",
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const direct = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const isActiveRoute = (routeHref: string) => {
    return location.pathname === routeHref;
  };
  return (
    <Sidebar {...props} className="myfont bg-background border-r border-border">
      <SidebarHeader className="bg-background">
        <VersionSwitcher
        // versions={data.versions}
        // defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent className="gap-0 bg-background text-sm">
        {/* We create a collapsible SidebarGroup for each parent. */}
        <section className="px-4 pt-5 space-y-3">
          {data.navMain.map((item, index) => (
            <div
              className={`p-5 h-[40px] cursor-pointer bg-foreground/5 rounded-md gap-4 text-muted-foreground flex items-center ${
                isActiveRoute(item.route) &&
                "bg-yellow-500 text-white font-bold"
              } `}
              key={index}
              onClick={() => direct(item.route)}
            >
              <span>{item.icon}</span>
              <span className="">{item.title}</span>
            </div>
          ))}
        </section>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
