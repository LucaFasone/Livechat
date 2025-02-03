import { Button } from "./ui/button"
import { Input } from "./ui/input"

function MessageInput() {
  return (
    <div className="border-t-2 p-5 w-full border-gray-200 flex justify-center items-center">
        <Input className="p-5" placeholder="Write a message..."/>
        <div className="ml-5">
            <Button className="p-5">Invia</Button>
        </div>
    </div>
  )
}

export default MessageInput