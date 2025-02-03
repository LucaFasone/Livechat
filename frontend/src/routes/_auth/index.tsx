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
      lastMessage: "Hello there!",
      lastSeen: new Date("2021-09-01T00:00:00Z"),
    }, {
      id: 2,
      name: "Rover",
      image: "https://randomuser.me/api/portraits/lego/8.jpg",
      lastMessage: "General Kenobi!",
      unread: 2,
      lastSeen: new Date("2021-09-01T00:00:00Z"),

    }, {
      id: 3,
      name: "Curiosity",
      image: "https://randomuser.me/api/portraits/lego/9.jpg",
      lastMessage: "I'm on Mars!",
      lastSeen: new Date("2021-09-01T00:00:00Z"),
    },
    {
      id: 4,
      name: "Perseverance",
      image: "https://randomuser.me/api/portraits/lego/1.jpg",
      lastMessage: "I'm on Mars too!",
      lastSeen: new Date("2021-09-01T00:00:00Z"),
    }
  ]);
  }, [])
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Flash Chat</h1>
        <div className="flex bg-white rounded-xl shadow-lg overflow-hidden max-h-[80vh] min-h-[80vh]">
          <SidePannel
            contacts={contacts}
            selectedContact={selectedContact}
            setSelectedContact={setSelectedContact}
          />
          <div className="md:w-2/3 border-l border-gray-200">
            <Chat selectedContact={selectedContact} />
          </div>
        </div>
      </div>
    </div>

  )

}
