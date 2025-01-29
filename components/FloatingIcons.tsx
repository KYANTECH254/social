import { Users, Globe, Settings, User } from "lucide-react";
import Link from "next/link";

export default function FloatingIcons() {
    const floatingIcons = [
        // { text: "Acquaintances", icon: Users },
        // { text: "Public", icon: Globe },
        // { text: "Settings", icon: Settings },
        // { text: "Profile", icon: User },

        { text: "Acquaintances", icon: "👥", border: false , link: "/people"},
        { text: "Public", icon: "🌍", border: false , link: "/public"},
        { text: "Settings", icon: "⚙️", border:false , link: "/settings"},
        { text: "Profile", icon: "👤", border: true , link: "/profile"},
    ];

    return (
        <div className="floating-icons w-full floating-icons-container">
            {floatingIcons.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Link href={item.link} key={item.link}>
                    <div
                        key={index}
                        className="flex flex-col items-center w-full gap-2 p-3 transition floating-icons-item"
                    >
                        <div className={`floating-icon  ${item.border ? 'floating-icon-border' : ''}`}> {item.icon}</div>
                        <span className="text-sm mt-1 truncate text-center floating-icon-text">
                            {item.text}
                        </span>
                    </div>
                    </Link>
                );
            })}
        </div>
    )
}