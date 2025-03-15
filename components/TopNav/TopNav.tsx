"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search, Bell, X } from "lucide-react";
import Link from "next/link";

export default function TopNav() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchIcon, setSearchIcon] = useState(true);
  const [placeholder, setPlaceholder] = useState("Search...");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!["/", "/chats", "/groups", "/posts"].includes(pathname)) {
      setIsSearching(false);
    }

    setSearchIcon(pathname !== "/search");

    const placeholderMap: Record<string, string> = {
      "/": "Search contacts...",
      "/chats": "Search chats...",
      "/groups": "Search groups...",
      "/posts": "Search posts...",
      "/search": "Search something..."
    };

    setPlaceholder(placeholderMap[pathname] || "Search...");
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
          <Link href="/">
            <div className="text-xl font-bold mob-app-logo">MyLogo</div>
          </Link>
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
        <div className="flex items-center w-full bg-[var(--main-background-color)]">
          <input
            type="text"
            placeholder={placeholder}
            className="w-full h-10 flex-grow outline-none bg-[var(--main-background-color)] text-[var(--main-text-color)] px-2"
          />
          <button className="p-2" onClick={() => setIsSearching(false)}>
            <X size={20} />
          </button>
        </div>
      )}
    </nav>
  );
}
