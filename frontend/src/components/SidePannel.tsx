import { useEffect, useState } from "react";
import SearchBar from "./SearchBar"
import { Button } from "./ui/button";
import { Plus, UserCircle } from "lucide-react";
import { Contact as ContactType } from "@/lib/types";
import Contact from "./Contact";
import { useRouteContext } from "@tanstack/react-router";

type SidePannelProps = {
    contacts: Contact[];
    selectedContact: Contact | undefined;
    setSelectedContact: (contact: Contact) => void;

}
function SidePannel({ contacts, selectedContact, setSelectedContact }: SidePannelProps) {
    const [showAccountModal, setShowAccountModal] = useState(false)
    const x = useRouteContext()
    return (
        <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 h-full">
            <div className="flex flex-col items-center p-2">
                <Button
                    variant="ghost"
                    className="flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowAccountModal(true)}
                >
                    <UserCircle className="h-5 w-5" />
                    <span>Il mio account</span>
                </Button>

                <div className="flex justify-center items-center w-full">
                    <SearchBar classNames={["flex-1"]} />
                    <Button className="m-2">
                        <Plus />
                    </Button>
                </div>
            </div>

            <div className="divide-y divide-gray-200 overflow-y-auto flex-1">
                {contacts?.map((contact: ContactType) => (
                    <Contact
                        onClick={() => { setSelectedContact(contact); delete contact.unread }}
                        key={contact.id}
                        contact={contact}
                        isActive={selectedContact?.id === contact.id}
                    />
                ))}
            </div>
            {showAccountModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold">Il mio account</h2>
                            <Button variant="ghost" className="p-1" onClick={() => setShowAccountModal(false)}>
                                ✕
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <UserCircle className="h-16 w-16 text-gray-400" />
                            <div>
                                <h3 className="font-semibold">Nome Utente</h3>
                                <p className="text-sm text-gray-600">email@example.com</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full">
                                Modifica profilo
                            </Button>
                            <Button variant="outline" className="w-full">
                                Impostazioni
                            </Button>
                            <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )

}

export default SidePannel