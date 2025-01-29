export default function Saved() {
  const contacts = [
    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },    { name: "John Doe", profilePic: "/assets/images/profile-bg.png" },
    { name: "Jane Smith", profilePic: "/assets/images/profile-bg.png" },
    { name: "Michael Johnson", profilePic: "/assets/images/profile-bg.png" },
    { name: "Emily Davis", profilePic: "/assets/images/profile-bg.png" },
  ];  

  return (
    <div className="contacts-list-container p-4">
      {/* Contacts List */}
      <div className="contacts-list flex flex-col gap-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-2"
          >
            <img
              src={contact.profilePic}
              alt={`${contact.name}'s profile`}
              className="w-12 h-12 rounded-full"
            />
            <span className="text-lg font-medium truncate chat-items-name">
              {contact.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
