import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { Message, Contact, Room } from '../lib/types'
import { Send, UserCircle, Users } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger, TabsContent} from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  
  const [contacts] = useState<Contact[]>([
    { id: "1", name: "Alice", lastMessage: "Ciao!", unread: 2 },
    { id: "2", name: "Bob", lastMessage: "Come stai?", unread: 0 },     
    { id: "3", name: "Charlie", lastMessage: "Ci vediamo più tardi", unread: 1 },
  ])

  const [rooms] = useState<Room[]>([
    { id: "1", name: "Generale", participants: 10, lastMessage: "Benvenuti!", unread: 5 },
    { id: "2", name: "Supporto", participants: 3, lastMessage: "Qualcuno ha bisogno di aiuto?", unread: 0 },
  ])

  const [messages] = useState<Message[]>([
    { id: "1", sender: "Alice", content: "Ciao a tutti!", timestamp: "10:00" },
    { id: "2", sender: "Bob", content: "Ehi Alice, come va?", timestamp: "10:02" },
    { id: "3", sender: "Charlie", content: "Salve ragazzi!", timestamp: "10:05" },
  ])

  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [inputMessage, setInputMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      console.log("Messaggio inviato:", inputMessage)
      setInputMessage("")
    }
  }

  const handleConnect = () => {
    setIsConnected(true)
  }

  return (
    <div className="flex h-screen bg-background relative">
      <div className="w-64 border-r">
        <Tabs defaultValue="contacts">
          <TabsList className="w-full">
            <TabsTrigger value="contacts" className="w-full">
              <UserCircle className="mr-2 h-4 w-4" />
              Contatti
            </TabsTrigger>
            <TabsTrigger value="rooms" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Stanze
            </TabsTrigger>
          </TabsList>
          <TabsContent value="contacts">
            <ScrollArea className="h-[calc(100vh-40px)]">
              {contacts.map((contact) => (
                <Button
                  key={contact.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSelectedChat(contact.id)}
                >
                  <div className="flex items-center">
                    <UserCircle className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-semibold">{contact.name}</div>
                      <div className="text-xs text-muted-foreground">{contact.lastMessage}</div>
                    </div>
                    {contact.unread > 0 && (
                      <div className="ml-auto bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                        {contact.unread}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="rooms">
            <ScrollArea className="h-[calc(100vh-40px)]">
              {rooms.map((room) => (
                <Button
                  key={room.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSelectedChat(room.id)}
                >
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    <div className="text-left">
                      <div className="font-semibold">{room.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {room.participants} partecipanti
                      </div>
                    </div>
                    {room.unread > 0 && (
                      <div className="ml-auto bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                        {room.unread}
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          {messages.map((message) => (
            <div key={message.id} className="mb-4">
              <div className="font-semibold">{message.sender}</div>
              <div className="bg-muted p-2 rounded-md">{message.content}</div>
              <div className="text-xs text-muted-foreground mt-1">{message.timestamp}</div>
            </div>
          ))}
        </ScrollArea>
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              placeholder="Scrivi un messaggio..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      {!isConnected && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Connettiti</h2>
            <Input
              placeholder="Nome utente"
              className="mb-4"
              onChange={(e) => console.log(e.target.value)}
            />
            <Button onClick={handleConnect} size="lg">
              Connetti
            </Button>
          </div>
        </div>
      )}
    </div>
  )
} 
