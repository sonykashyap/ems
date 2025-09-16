import React, { Dispatch, SetStateAction } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { useDispatch } from 'react-redux';
import {toast} from 'sonner';


type modalDialog = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
    addNewUser: Dispatch<SetStateAction<Object>>
}

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    role: z.string(),
});
const AddUserModal = ({isModalOpen, setIsModalOpen, addNewUser}: modalDialog) => {
    const dispatch = useDispatch();
    const handleModalOpen = () => {
        setIsModalOpen(false);
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            role: ""
        },
    });

    
    const onSubmit =  (values: z.infer<typeof formSchema>) => {
        addNewUser(values);
    }

    return(
        <>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <Form {...form}>
                    
                    <DialogContent className="max-w-full md:max-w-[800px]">
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>Add User</DialogTitle>
                            <DialogDescription></DialogDescription>
                        </DialogHeader>
                        <div className="grid grid-cols-1">
                            <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                
                            )}
                        />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mt-2">Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                        
                                    )}
                                />
                            </div>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="role"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="mt-2">Role</FormLabel>
                                            <FormControl>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Role" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                        <SelectItem value="admin">admin</SelectItem>
                                                        <SelectItem value="user">User</SelectItem>
                                                        
                                                        </SelectGroup>
                                                    </SelectContent>
                                                    </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                
                                    )}
                                />
                            </div>
                        </div>
                        
                        <DialogFooter className='mt-4'>
                            <DialogClose asChild>
                                <Button variant="outline" type="button" onClick={handleModalOpen}> Cancel </Button>
                            </DialogClose>
                            <Button type="submit" className="bg-violet-500">Add</Button>
                        </DialogFooter>
                        </form>
                    </DialogContent>
                    
                </Form>
            </Dialog>
        </>
    )
}

export default AddUserModal;