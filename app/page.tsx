import FloatingIcons from "../components/FloatingIcons";
import ItemsNav from "../components/ItemsNav/ItemsNav";
import TopNav from "../components/TopNav/TopNav";
import Saved from "../components/pages/Saved";

export default function Home() {
  return (
    <main>
      <TopNav />
      <ItemsNav />
      <Saved />
      <FloatingIcons />
    </main>
  );
}
