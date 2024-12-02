import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "name is required"),
    address: z.string().min(1, "address is required"),
})

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
    currentUser: User,
    onSave: (userProfileData: UserFormData) => void;
    isLoading: boolean;
    title?: string;
    buttonText?: string;
}

const UserProfileForm =({onSave, isLoading, currentUser, title = "User Profile", buttonText = "Submit"}:Props) => {
    const form = useForm<UserFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: currentUser,
    });

    useEffect(()=>{
        form.reset(currentUser);
    }, [currentUser, form])

    return (
        <Form {...form}>
             <form onSubmit={form.handleSubmit(onSave)} 
                className="space-y-4 bg-gray-50 rounded-lg md:p-10">
                    <div>
                        <h2 className="text=2xl font-bold">{title}</h2>
                        <FormDescription>View and update your profile information</FormDescription>
                    </div>
                    <FormField control={form.control} name="email" render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="name" render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>

                    <FormField control={form.control} name="address" render={({field})=>(
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white"/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}/>
                {isLoading? (
                    <LoadingButton/>
                ): (
                    <Button type="submit" className="bg-gray-900 hover:bg-orange-500">
                        {buttonText}
                    </Button>
                )}

             </form>
        </Form>
    )
  
}


export default UserProfileForm
