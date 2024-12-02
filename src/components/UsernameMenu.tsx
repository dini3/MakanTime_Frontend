import { useAuth0 } from "@auth0/auth0-react"

import { CircleUserRound } from "lucide-react"
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";



const UsernameMenu = () => {
const {user, logout} = useAuth0();
    
  return (
    <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center px-3 text-white hover:text-orange-500 gap-2">
            <CircleUserRound className="text-orange-5000" />
            {user?.email}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-900 p-3">
            <DropdownMenuItem>
            <Link to="/manage-restaurant"
            className="font-bold text-orange-500">Manage Restaurant</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Link to="/user-profile"
            className="font-bold text-orange-500">User Profile</Link>
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem>
                <Button onClick={()=>logout()} className="flex flex-1 font-bold bg-orange-500">
                    Log Out
                </Button>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu