import type { Contact } from "@/lib/types";
import { UserCircle } from "lucide-react";

type ContactProps = {
  contact: Contact;
  isActive: boolean;
  variant?: "sidebar" | "chatPage"; 
  onClick: () => void;
};

function Contact({
  contact: { image, lastMessage, name, unread, lastSeen },
  isActive,
  variant = "sidebar",
  onClick,
}: ContactProps) {
  return (
    <div
      className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer 
        ${isActive ? "bg-gray-200 hover:bg-gray-200" : "" }`}
      onClick={onClick}
    >
      <div className={`${variant === "chatPage" ? "h-12 w-12" : "h-10 w-10"} rounded-full mr-3`}>
        {image ? (
          <img
            className="w-full h-full object-cover rounded-full"
            src={image}
            alt={`${name}'s profile picture`}
          />
        ) : (
          <UserCircle className="text-gray-400 w-full h-full" />
        )}
      </div>

      <div className="truncate">
        <h3 className="font-semibold">{name}</h3>
        {variant === "sidebar" ? (
          <p className="text-sm text-gray-600">{lastMessage}</p>
        ) : (
          <p className="text-sm text-gray-500">
          {lastSeen 
            ? `Ultimo accesso: ${lastSeen.toLocaleDateString()} alle ${lastSeen.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
            : "Online"}
        </p>
        )}
      </div>

      {variant === "sidebar" && unread && (
        <div className="ml-auto">
          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
            {unread > 9 ? "9+" : unread}
          </span>
        </div>
      )}
    </div>
  );
}

export default Contact;
