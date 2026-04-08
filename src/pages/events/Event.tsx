import React, { useEffect, useState } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ImgEvent from '@/assets/images/event.jpg';
import { Button } from '@/components/ui/button';
import {CalendarCheck2} from 'lucide-react';
import ModalDialog from '@/components/modal-dialog/ModalDialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import {zodResolver} from '@hookform/resolvers/zod';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { 
    DialogClose, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from "date-fns"
import { Field, FieldLabel } from '@/components/ui/field';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { addEvent, clearToast, listEvents } from '@/reducers/eventReducer';
import { toast } from 'sonner';
import { process } from 'zod/v4/core';


type eventData = {
    _id: string,
    title: string,
    image: string,
    description: string,
    eventDate: string
}

const currentDate = new Date();
const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
}); // e.g., "Sunday, January 11, 2026"

const formSchema = z.object({
    title: z.string(),
    description: z.string(),
    imageURL: z.string(),
    eventDate: z.string()
});


const Event = () => {

    const dispatch = useAppDispatch();
    const toaster = useAppSelector(state=> state.eventReducer.toast);
    const events = useAppSelector(state=> state.eventReducer.events);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [date, setDate] = React.useState<Date>();
    const [file, setFile] = useState<File>();

    useEffect(()=>{
        console.log("Date is ", date?.toLocaleDateString("en-US"));
    },[date]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: "",
            description: "",
            imageURL: "",
            eventDate: "",
        }
    });
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const user = JSON.parse(localStorage.getItem("userData") ?? "");
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("image", file);
            formData.append("eventDate", date?.toLocaleDateString());
            formData.append("userId", user.id);
            console.log("Events form submitted", file);
            dispatch(addEvent(formData));
        //   console.log("Selected date is ", format(date, "dd MMMM yyyy"));
          setIsModalOpen(false);
        }catch(error){
          console.log(error);
        }
    }

    const resetFormValue = () => { // empty form value upon cancel or submission of form
        form.reset({
        role: ""
        });
    }


    useEffect(() => {
    if (!toaster.message) return;
    
    toast(toaster.message, {
        classNames: {
        toast:
            toaster.type === "success"
            ? "!bg-green-200"
            : "!bg-red-200",
        title:
            toaster.type === "success"
            ? "!text-green-600 font-bold"
            : "!text-red-600 font-bold",
        },
    });
    dispatch(clearToast());
    }, [toaster]);

    useEffect(()=>{
        dispatch(listEvents());
        // const obj = {
        //     "a_b_c": 1,
        //     "a_b_d": 2
        // };
        // for(const keys in obj){
        //     console.log("Keys are ", keys);
        //     let key = keys.split("_");
        //     console.log("Key is ", key);

        // }
        // const result = {};
        // for(const key in obj){
        //     const keys = key.split("_");
        //     let current = result;
            
        //     keys.forEach((k,index)=>{
        //         if(index === keys.length -1){
        //             current[k] = obj[key];
        //         }else{
        //             console.log("Inside the else condition");
        //             current[k] = current[k] || {};
        //             current = current[k];
        //         }
                
        //     })
        // }

        // console.log("Result is ", result);
    },[]);

    useEffect(()=>{
        console.log("EEEEEE is ", events);
    },[events]);

    return(
        <>
            <div className='flex justify-between mb-4'>
                <h1 className='text-violet-500 text-2xl'>Events</h1>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button onClick={()=> setIsModalOpen(true)}> <CalendarCheck2 /> Add</Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Add Event
                    </TooltipContent>
                </Tooltip>
            </div>
            {
                isModalOpen &&
                <ModalDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                    <Form {...form}>
                    
                        <DialogContent className="max-w-full md:max-w-[500px]">
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                            <DialogHeader>
                                <DialogTitle>Add Event</DialogTitle>
                                <DialogDescription></DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-1">
                                <div className='mb-3'>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field, fieldState }) => (
                                            <FormItem data-invalid={fieldState.invalid}>
                                                <FormLabel>Title</FormLabel>
                                                <FormControl>
                                                <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </FormItem>
                                            
                                        )}
                                    />
                                </div>
                                <div className="mb-3">
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2'>
                                <div className="mb-3">
                                    <FormField
                                        control={form.control}
                                        name="imageURL"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Event Image</FormLabel>
                                                <FormControl>
                                                <Input 
                                                    type='file' 
                                                    {...field} 
                                                    onChange={(e) => {
                                                        if (e.target.files?.[0]) {
                                                        setFile(e.target.files[0]);
                                                        }
                                                    }}
                                                />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            
                                        )}
                                    />
                                </div>
                                <div>
                                    <Field className="mx-auto w-44 gap-1">
                                        <FieldLabel htmlFor="date-picker-simple">Event On</FieldLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date-picker-simple"
                                                className="justify-start font-normal"
                                            >
                                                {date ? format(date, "dd MMMM yyyy") : <span>Pick a date</span>}
                                            </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                name="eventDate"
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                defaultMonth={date}
                                            />
                                            </PopoverContent>
                                        </Popover>
                                    </Field>

                                </div>
                            </div>
                            
                            <DialogFooter className='mt-4'>
                                <DialogClose asChild>
                                    <Button variant="outline" type="button" onClick={resetFormValue}> Cancel </Button>
                                </DialogClose>
                                <Button type="submit" className="bg-violet-500"> Create Event </Button>
                            </DialogFooter>
                            </form>
                        </DialogContent>
                    </Form>
                </ModalDialog>
            }

            <div className='grid md:grid-cols-3 gap-5'>
                {
                    events && events.map((event)=>{
                        return <Card className='text-center' key={event._id}>
                                <CardHeader>
                                    <CardTitle className='text-lg'>{event.title.toUpperCase()}</CardTitle>
                                </CardHeader>
                            <CardContent>
                                <img src={"http://localhost:8000/"+event.imageURL} loading='lazy' className='rounded-2xl mb-3' alt={event.title} />
                                <p>{event.description}</p>
                            </CardContent>
                            <CardFooter>
                                <p>{event.event_date}</p>
                            </CardFooter>
                        </Card>
                    })
                }
            </div>
        </>
    )
}

export default Event;