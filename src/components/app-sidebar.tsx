"use client"

import * as React from "react"
import {
  AudioWaveform,

  BusFront,

  Command,
  Flag,
  GalleryVerticalEnd,

  MountainSnow,

  SquareTerminal,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "./shared/Logo"

// This is sample data.
const data = {

  navMain: [
    {
      title: "Overview",
      url: "/dashboard",
      icon: SquareTerminal,
      isActive: true,

    },
    {
      title: "All Tour",
      url: "/dashboard/allTour",
      icon: BusFront,
      isActive: true,

    },
    {
      title: "All Division",
      url: "/dashboard/allDivision",
      icon: Flag,
      isActive: true,

    },
    {
      title: "All Tour Type",
      url: "/dashboard/allTourType",
      icon: MountainSnow,
      isActive: true,

    },
    {
      title: "All User",
      url: "/dashboard/allUser",
      icon: User2,
      isActive: true,

    },

  ],

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}
