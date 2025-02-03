import { useEffect, useState } from "react";
import Contact from "./Contact"
import SearchBar from "./SearchBar"
type SidePannelProps = {
    contacts: Contact[];
    selectedContact:Contact | undefined;
    setSelectedContact: (contact: Contact) => void;

}
function SidePannel({ contacts, selectedContact,setSelectedContact}: SidePannelProps) {
    return (
        <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            <SearchBar />
            <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
                {contacts?.map((contact: Contact) => (
                    <Contact
                        onClick={() => setSelectedContact(contact)}
                        key={contact.id}
                        contact={contact}
                        isActive={selectedContact?.id === contact.id}
                    />
                ))}
            </div>
        </div>
    )
}

export default SidePannel