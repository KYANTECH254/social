"use client"

import FloatingIcons from "../components/FloatingIcons";
import ItemsNav from "../components/ItemsNav/ItemsNav";
import TopNav from "../components/TopNav/TopNav";
import Saved from "../components/pages/Saved";
import { useTheme } from "@/hooks/useTheme";

export default function Home() {
  useTheme();
  return (
    <main>
      <TopNav />
      <ItemsNav />
      <Saved />
      <FloatingIcons />
    </main>
  );
}
