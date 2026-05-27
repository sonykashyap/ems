import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {z} from "zod";
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
import { useDispatch } from 'react-redux';
import { getAllRoles } from '@/reducers/roleReducer';
import { useAppSelector } from '@/hooks';


type modalDialog = {
    isModalOpen: boolean,
    setIsModalOpen: Dispatch<SetStateAction<boolean>>,
    addNewUser: Dispatch<SetStateAction<Object>>,
    isEdit: boolean,
    setIsEdit: Dispatch<SetStateAction<boolean>>,
    editUserhandler: Dispatch<SetStateAction<Object>>,
    userEditData: {}
}

const formSchema = z.object({
    name: z.string(),
    email: z.email(),
    role: z.string(),
    reporting_to: z.string(),
    userId: z.string().nullable().optional()
});
const AddUserModal = ({
    isModalOpen, 
    setIsModalOpen, 
    addNewUser, 
    isEdit, 
    userEditData, 
    setIsEdit, 
    editUserhandler}: modalDialog) => {
    const dispatch = useDispatch();
    const roles = useAppSelector(state=> state.roleReducer.roles);

    const handleModalOpen = () => {
        setIsModalOpen(false);
        setIsEdit(false);
        
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: !isEdit ? "" : userEditData.name,
            email: !isEdit ? "" : userEditData?.email,
            role: !isEdit ? "" : userEditData.roleId._id,
            reporting_to: !isEdit? "" : userEditData.reporting_to,
            userId: !isEdit ? null : userEditData._id,
        },
    });

    
    const onSubmit =  (values: z.infer<typeof formSchema>) => {
        console.log("Values from form: ", values);
        !isEdit ? addNewUser(values) : editUserhandler(values);
    }

    useEffect(()=>{
        dispatch(getAllRoles());
    },[]);

    return(
        <>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>

                <Form {...form}>

                    <DialogContent className="
                        overflow-hidden

                        border-0
                        rounded-[32px]

                        bg-white

                        p-0

                        shadow-[0_30px_80px_rgba(0,0,0,0.12)]

                        md:max-w-2xl
                    ">

                        {/* Top Gradient Banner */}
                        <div className="
                            relative

                            h-28

                            bg-gradient-to-r
                            from-violet-600
                            via-purple-500
                            to-fuchsia-500
                        ">

                            {/* Decorative Blur */}
                            <div className="
                                absolute -top-10 right-10

                                h-40 w-40

                                rounded-full

                                bg-white/20

                                blur-3xl
                            "></div>

                            {/* Icon */}
                            <div className="
                                absolute left-8 top-1/2

                                flex h-20 w-20
                                -translate-y-1/2

                                items-center justify-center

                                rounded-3xl

                                border border-white/20

                                bg-white/15

                                backdrop-blur-xl

                                shadow-xl
                            ">

                                <span className="text-4xl text-white">
                                    👨‍💼
                                </span>

                            </div>

                        </div>

                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="px-8 pb-8 pt-16"
                        >

                            {/* Header */}
                            <DialogHeader className="mb-8 text-left">

                                <DialogTitle className="
                                    text-3xl
                                    font-bold
                                    tracking-tight
                                    text-slate-900
                                ">

                                    {isEdit ? "Update Employee" : "Add New Employee"}

                                </DialogTitle>

                                <DialogDescription className="
                                    mt-2
                                    text-sm
                                    text-slate-500
                                ">

                                    Manage employee information and assign roles professionally.

                                </DialogDescription>

                            </DialogHeader>

                            {/* Form Fields */}
                            <div className="space-y-6">

                                {/* Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (

                                        <FormItem>

                                            <FormLabel className="
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                            ">
                                                Full Name
                                            </FormLabel>

                                            <FormControl>

                                                <Input
                                                    {...field}
                                                    placeholder="Enter employee name"
                                                    className="
                                                        h-12

                                                        rounded-2xl

                                                        border-slate-200

                                                        bg-slate-50/70

                                                        px-4

                                                        text-sm

                                                        shadow-sm

                                                        transition-all duration-300

                                                        focus:border-violet-400
                                                        focus:ring-4
                                                        focus:ring-violet-100
                                                    "
                                                />

                                            </FormControl>

                                            <FormMessage />

                                        </FormItem>

                                    )}
                                />

                                {/* Email - Full Width */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    disabled={isEdit ? true : false}
                                    render={({ field }) => (

                                        <FormItem>

                                            <FormLabel className="
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                            ">
                                                Email Address
                                            </FormLabel>

                                            <FormControl>

                                                <Input
                                                    {...field}
                                                    placeholder="Enter email address"
                                                    className="
                                                        h-12

                                                        rounded-2xl

                                                        border-slate-200

                                                        bg-slate-50/70

                                                        px-4

                                                        text-sm

                                                        shadow-sm

                                                        transition-all duration-300

                                                        focus:border-violet-400
                                                        focus:ring-4
                                                        focus:ring-violet-100

                                                        disabled:cursor-not-allowed
                                                        disabled:bg-slate-100
                                                    "
                                                />

                                            </FormControl>

                                            <FormMessage />

                                        </FormItem>

                                    )}
                                />

                                {/* Role + Manager */}
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-5">

                                    {/* Role */}
                                    <FormField
                                        control={form.control}
                                        name="role"
                                        render={({ field }) => (

                                            <FormItem>

                                                <FormLabel className="
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                ">
                                                    Assign Role
                                                </FormLabel>

                                                <FormControl>

                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >

                                                        <SelectTrigger
                                                            className="
                                                                w-full

                                                                h-12

                                                                rounded-2xl

                                                                border-slate-200

                                                                bg-slate-50/70

                                                                px-4

                                                                text-sm

                                                                shadow-sm

                                                                transition-all duration-300

                                                                focus:ring-4
                                                                focus:ring-violet-100
                                                            "
                                                        >

                                                            <SelectValue placeholder="Select Role" />

                                                        </SelectTrigger>

                                                        <SelectContent className="
                                                            rounded-2xl
                                                            border-slate-200
                                                            shadow-2xl
                                                        ">

                                                            <SelectGroup>

                                                                {
                                                                    roles && roles.map(role => {

                                                                        return (
                                                                            <SelectItem
                                                                                key={role?._id}
                                                                                value={role._id}
                                                                                className="
                                                                                    rounded-xl
                                                                                    cursor-pointer
                                                                                "
                                                                            >
                                                                                {role?.name}
                                                                            </SelectItem>
                                                                        )
                                                                    })
                                                                }

                                                            </SelectGroup>

                                                        </SelectContent>

                                                    </Select>

                                                </FormControl>

                                                <FormMessage />

                                            </FormItem>

                                        )}
                                    />

                                    {/* Manager */}
                                    <FormField
                                        control={form.control}
                                        name="reporting_to"
                                        render={({ field }) => (

                                            <FormItem>

                                                <FormLabel className="
                                                    text-sm
                                                    font-semibold
                                                    text-slate-700
                                                ">
                                                    Reporting Manager
                                                </FormLabel>

                                                <FormControl>

                                                    <Select
                                                        onValueChange={field.onChange}
                                                        value={field.value}
                                                    >

                                                        <SelectTrigger
                                                            className="
                                                                w-full

                                                                h-12

                                                                rounded-2xl

                                                                border-slate-200

                                                                bg-slate-50/70

                                                                px-4

                                                                text-sm

                                                                shadow-sm

                                                                transition-all duration-300

                                                                focus:ring-4
                                                                focus:ring-violet-100
                                                            "
                                                        >

                                                            <SelectValue placeholder="Select Manager" />

                                                        </SelectTrigger>

                                                        <SelectContent className="
                                                            rounded-2xl
                                                            border-slate-200
                                                            shadow-2xl
                                                        ">

                                                            <SelectGroup>

                                                                <SelectItem
                                                                    value="rahul-sharma"
                                                                    className="rounded-xl cursor-pointer"
                                                                >
                                                                    Rahul Sharma
                                                                </SelectItem>

                                                                <SelectItem
                                                                    value="amit-verma"
                                                                    className="rounded-xl cursor-pointer"
                                                                >
                                                                    Amit Verma
                                                                </SelectItem>

                                                                <SelectItem
                                                                    value="neha-kapoor"
                                                                    className="rounded-xl cursor-pointer"
                                                                >
                                                                    Neha Kapoor
                                                                </SelectItem>

                                                                <SelectItem
                                                                    value="priya-singh"
                                                                    className="rounded-xl cursor-pointer"
                                                                >
                                                                    Priya Singh
                                                                </SelectItem>

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

                            {/* Footer */}
                            <DialogFooter className="
                                mt-10
                                flex-col-reverse gap-3
                                sm:flex-row
                                sm:justify-end
                            ">

                                {/* Cancel */}
                                <DialogClose asChild>

                                    <Button
                                        variant="outline"
                                        type="button"
                                        onClick={handleModalOpen}
                                        className="
                                            h-12

                                            rounded-2xl

                                            border border-violet-200

                                            bg-white/80

                                            px-6

                                            font-medium
                                            text-violet-700

                                            shadow-sm

                                            backdrop-blur-xl

                                            transition-all duration-300

                                            hover:bg-gradient-to-r
                                            hover:from-violet-500
                                            hover:to-fuchsia-500

                                            hover:text-white

                                            hover:border-transparent

                                            hover:shadow-xl
                                            hover:shadow-violet-500/20

                                            hover:scale-[1.02]

                                            focus-visible:ring-2
                                            focus-visible:ring-violet-200
                                        "
                                    >

                                        Cancel

                                    </Button>

                                </DialogClose>

                                {/* Submit */}
                                <Button
                                    type="submit"
                                    className="
                                        h-12

                                        rounded-2xl

                                        bg-gradient-to-r
                                        from-violet-600
                                        via-purple-500
                                        to-fuchsia-500

                                        px-7

                                        text-white

                                        shadow-lg
                                        shadow-violet-500/20

                                        transition-all duration-300

                                        hover:scale-[1.02]
                                        hover:shadow-2xl
                                        hover:shadow-violet-500/30
                                    "
                                >

                                    {isEdit ? "Update Employee" : "Add Employee"}

                                </Button>

                            </DialogFooter>

                        </form>

                    </DialogContent>

                </Form>

            </Dialog>
        </>
    )
}

export default AddUserModal;