import { MdPets } from "react-icons/md";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function VersionSwitcher() {
  // const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <MdPets className="text-2xl text-yellow-500" />
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-semibold tracking-widest text-base uppercase">
              Pet Adoption
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
