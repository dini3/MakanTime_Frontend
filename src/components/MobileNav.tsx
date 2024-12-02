import { CircleUserRound, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";



const MobileNav = () => {
    const {loginWithRedirect, isAuthenticated, user} = useAuth0();

    return (
        <Sheet>            
            <SheetTrigger>
                <Menu className="text-orange-500 rounded-sm"/>
            </SheetTrigger>
            <SheetContent className="space-y-3">
                <SheetTitle>
                    {isAuthenticated?(<span className="flex items-center font-bold gap-2">
                        <CircleUserRound className="text-black hover:text-orange-500"></CircleUserRound>
                        {user?.email}
                    </span>)
                    : (<p>Its MakanTime!</p>)}
                </SheetTitle>
                <Separator/>
                <SheetDescription className="flex flex-col gap-4">
                    {isAuthenticated?<MobileNavLinks/>:(
                                            <Button className="flex-1" onClick={async () => await loginWithRedirect()}>Log In</Button>
                    )}
                </SheetDescription>
            </SheetContent>

        </Sheet>
    );
};

export default MobileNav;
