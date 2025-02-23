"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, X } from "lucide-react";

export default function TopNav() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!["/", "/chats", "/groups", "/posts"].includes(pathname)) {
      setIsSearching(false);
    }
    if (["/search"].includes(pathname)) {
      setSearchIcon(false);
    }
  }, [pathname]);

  const handleSearchClick = () => {
    if (["/", "/chats", "/groups", "/posts"].includes(pathname)) {
      setIsSearching(true);
    } else {
      router.push("/search");
    }
  };

  return (
    <nav className="flex items-center justify-between p-4 top-nav">
      {!isSearching ? (
        <>
          {/* Left Section: Logo */}
          <div className="text-xl font-bold mob-app-logo">MyLogo</div>

          {/* Right Section: Icons */}
          <div className="flex items-center space-x-4">
            {searchIcon && (
              <button className="p-2 rounded top-nav-icons" onClick={handleSearchClick}>
                <Search size={20} />
              </button>
            )}

            <button className="p-2 rounded top-nav-icons">
              <Bell size={20} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center w-full bg-white">
          <input
            type="text"
            placeholder="Search contacts..."
            className="flex-grow outline-none text-black px-2"
          />
          <button className="p-2" onClick={() => setIsSearching(false)}>
            <X size={20} />
          </button>
        </div>
      )}
    </nav>
  );
}
