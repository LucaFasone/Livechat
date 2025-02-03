import Chat from '@/components/Chat'
import SidePannel from '@/components/SidePannel'
import { Contact } from '@/lib/types'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'


export const Route = createFileRoute('/_auth/')({
  component: Page,
})

function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact>();
  useEffect(() => {
    setContacts([{
      id: 1,
      name: "Oppy",
      image: "https://randomuser.me/api/portraits/lego/7.jpg",
      lastMessage: "Hello there!"
    }, {
      id: 2,
      name: "Rover",
      image: "https://randomuser.me/api/portraits/lego/8.jpg",
      lastMessage: "General Kenobi!",
      unread: 2

    }, {
      id: 3,
      name: "Curiosity",
      image: "https://randomuser.me/api/portraits/lego/9.jpg",
      lastMessage: "I'm on Mars!"
    }]);
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Flash Chat</h1>
        <div className="flex bg-white rounded-xl shadow-lg overflow-hidden h-[80vh]">
          <SidePannel 
          contacts={contacts}
          selectedContact={selectedContact}
          setSelectedContact={setSelectedContact}
          />
          <Chat selectedContact={selectedContact} />
        </div>
      </div>
    </div>

  )

}
