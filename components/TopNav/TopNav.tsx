import { Search, Bell, User } from "lucide-react";
export default function TopNav () {
  return (
    <nav className="flex items-center justify-between p-4 top-nav">
      {/* Left Section: Logo */}
      <div className="text-xl font-bold mob-app-logo">MyLogo</div>

      {/* Right Section: Icons */}
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded top-nav-icons">
          <Search size={20} />
        </button>
        <button className="p-2 rounded top-nav-icons">
          <Bell size={20} />
        </button>
      </div>
    </nav>
  );
};

