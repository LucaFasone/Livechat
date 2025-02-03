import { useEffect } from "react";
import Contact from "./Contact";
import WelcomeMessage from "./WelcomeMessage";
import MessageInput from "./MessagInput";
type ChatProps = {
    selectedContact: Contact | undefined;
}

function Chat({ selectedContact }: ChatProps) {
    if (!selectedContact) {
        return <WelcomeMessage />
    }
    return (
        <div className="h-full flex flex-col">
        <div className="flex-none">
          <Contact
            contact={selectedContact}
            isActive={true}
            onClick={() => {}}
            variant="chatPage"
          />
        </div>
      
        <div className="flex-grow overflow-scroll ">
          <div className="p-4 flex flex-col gap-2">
            {Array.from({ length: 50}).map((_, i) => (
              <p key={i} className="mb-2">
                Messaggio {i + 1}
              </p>
            ))}
          </div>
        </div>
      
        <div className="flex-none">
          <MessageInput />
        </div>
      </div>
      
    )
}

export default Chat