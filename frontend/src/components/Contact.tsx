import type { Contact } from "@/lib/types"
import { UserCircle } from "lucide-react"
type ContactProps = {
  contact: Contact;
  isActive: boolean;
  onClick: () => void;
};
function Contact({ contact: { image, lastMessage, name, unread }, isActive, onClick }: ContactProps) {

  return (
    <div className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer ${isActive ? "bg-gray-200 hover:bg-gray-200" : ""}`}
      onClick={onClick}>
      {image ? <div className="h-10 w-10 rounded-full mr-3"><img className="w-full h-full object-cover rounded-full" src={image} alt={`${name}'s profile picture`} /> </div> : <UserCircle className="min-h-10 min-w-10 text-gray-400 mr-3" />}
      <div className="truncate">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm text-gray-600 ">{lastMessage}</p>

      </div>
      <div className="ml-auto">
        {unread && <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">{unread > 9 ? "9+" : unread}</span>}
      </div>
    </div>
  )
}

export default Contact