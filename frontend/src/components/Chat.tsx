import Contact from "./Contact";
import WelcomeMessage from "./WelcomeMessage";
type ChatProps = {
    selectedContact: Contact | undefined;
}

function Chat({ selectedContact }: ChatProps) {
    return (
        <div className="flex justify-center items-center w-full md:w-2/3 bg-white border-l border-gray-200">
            {selectedContact ? null :<WelcomeMessage/>
            }
        </div>
    )
}

export default Chat