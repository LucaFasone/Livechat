import Logo from "./Logo"
import { Input } from "./ui/input"
import { UserCircle, Users, ArrowLeft } from "lucide-react"

function SidePannel() {
    return (
        <div className="w-full md:w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
            <div className="p-4">
                <Input type="text" placeholder="Cerca chat..." className="w-full" />
            </div>
            <ul className="divide-y divide-gray-200 overflow-y-auto flex-1">
                <li
                    className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer "bg-gray-100"`}>
                    <UserCircle className="h-10 w-10 text-gray-400 mr-3" />
                    <div className="truncate">
                        <h3 className="font-semibold">"Oppy"</h3>
                        <p className="text-sm text-gray-600 ">"Miao"</p>
                    </div>
                </li>
                <li
                    className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer "bg-gray-100"`}>
                    <UserCircle className="h-10 w-10 text-gray-400 mr-3" />
                    <div className="truncate">
                        <h3 className="font-semibold">"Oppy"</h3>
                        <p className="text-sm text-gray-600 ">"Miao"</p>
                    </div>
                </li>
                <li
                    className={`flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer "bg-gray-100"`}>
                    <UserCircle className="h-10 w-10 text-gray-400 mr-3" />
                    <div className="truncate">
                        <h3 className="font-semibold">"Oppy"</h3>
                        <p className="text-sm text-gray-600 ">"Miaoooooooooooooooooooooooooooooooooooooooooooooooooooooooo"</p>
                    </div>
                </li>

            </ul>
        </div>
    )
}

export default SidePannel