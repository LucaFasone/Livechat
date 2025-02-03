import { ShieldCheck } from "lucide-react"
import Logo from "./Logo"
import { Label } from "./ui/label"

function WelcomeMessage() {
    return (
        <div className="flex flex-col items-center justify-center pb-10 relative h-full w-full">
            <Logo size={128} />
            <span className="my-2 text-xl">Welcome on Flash Chat</span>
            <span className="text-gray-500 text-lg">Select a chat to start messaging</span>
            <div className="absolute bottom-[40px] mb-4 ">
                <Label className="text-base text-gray-500 flex justify-center items-center"><ShieldCheck className="mx-2" />Messages are encrypted using peer-to-peer encryption</Label>
            </div>
        </div>
    )
}

export default WelcomeMessage