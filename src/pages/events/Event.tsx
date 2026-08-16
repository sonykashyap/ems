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
import {CalendarCheck2, Clock3} from 'lucide-react';
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
            formData.append("eventDate", String(date?.toLocaleDateString()));
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
    },[]);

    useEffect(()=>{
        console.log("EEEEEE is ", events);
    },[events]);

    return(
        <>
            <div className="min-h-screen bg-gradient-to-br from-[#f7f5ff] via-white to-[#fff4fd] p-4 md:p-8 rounded-[32px] border border-violet-100/60 shadow-[0_10px_60px_rgba(139,92,246,0.08)]">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-10">

        <div>

            {/* Small Badge */}
            <div className="
                inline-flex items-center gap-2

                rounded-full

                border border-violet-200

                bg-white/80

                px-4 py-2

                text-xs font-semibold
                tracking-wide

                text-violet-700

                shadow-sm
                backdrop-blur-xl
            ">
                <CalendarCheck2 size={14} />
                EMS EVENT MANAGEMENT
            </div>

            <h1 className="
                mt-4

                text-4xl md:text-5xl
                font-black
                tracking-tight

                bg-gradient-to-r
                from-violet-700
                via-purple-600
                to-fuchsia-500

                bg-clip-text
                text-transparent
            ">
                Events
            </h1>

            <p className="
                text-slate-500
                mt-3
                text-sm md:text-base
                leading-relaxed
            ">
                Manage and explore all upcoming EMS events
            </p>

        </div>

        <Tooltip>

            <TooltipTrigger asChild>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    className="
                        h-12

                        rounded-2xl

                        bg-gradient-to-r
                        from-violet-600
                        via-purple-500
                        to-fuchsia-500

                        px-6

                        text-white
                        font-semibold

                        shadow-[0_12px_30px_rgba(139,92,246,0.25)]

                        transition-all duration-300

                        hover:scale-[1.03]
                        hover:shadow-[0_18px_40px_rgba(139,92,246,0.35)]
                    "
                >

                    <CalendarCheck2 className="mr-2" size={18} />
                    Add Event

                </Button>

            </TooltipTrigger>

            <TooltipContent>
                Add Event
            </TooltipContent>

        </Tooltip>

    </div>

    {/* Modal */}
    {
        isModalOpen &&
        <ModalDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>

            <Form {...form}>

                <DialogContent className="
                    max-w-full
                    md:max-w-[650px]

                    rounded-[32px]

                    border border-violet-100

                    bg-white/95

                    shadow-[0_25px_80px_rgba(0,0,0,0.12)]

                    backdrop-blur-2xl

                    overflow-hidden
                ">

                    {/* Top Banner */}
                    <div className="
                        h-32

                        bg-gradient-to-r
                        from-violet-600
                        via-purple-500
                        to-fuchsia-500

                        absolute top-0 left-0 right-0
                    ">

                        {/* Decorative Blur */}
                        <div className="
                            absolute -top-10 right-10

                            h-40 w-40

                            rounded-full

                            bg-white/20

                            blur-3xl
                        "></div>

                    </div>

                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="relative z-10"
                    >

                        <DialogHeader className="pt-14 pb-8">

                            <div className="
                                w-20 h-20

                                rounded-[28px]

                                bg-white/20

                                border border-white/20

                                shadow-2xl

                                backdrop-blur-xl

                                flex items-center justify-center

                                mx-auto mb-5
                            ">

                                <CalendarCheck2
                                    className="text-white"
                                    size={36}
                                />

                            </div>

                            <DialogTitle className="
                                text-center

                                text-3xl
                                font-black

                                tracking-tight

                                text-slate-800
                            ">
                                Create Event
                            </DialogTitle>

                            <DialogDescription className="
                                text-center
                                text-slate-500
                                text-sm
                            ">
                                Fill all details to publish your event
                            </DialogDescription>

                        </DialogHeader>

                        {/* Form Fields */}
                        <div className="grid grid-cols-1 gap-6 px-1">

                            {/* Title */}
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field, fieldState }) => (
                                    <FormItem data-invalid={fieldState.invalid}>

                                        <FormLabel className="
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        ">
                                            Event Title
                                        </FormLabel>

                                        <FormControl>

                                            <Input
                                                {...field}
                                                placeholder="Enter event title"
                                                className="
                                                    h-13

                                                    rounded-2xl

                                                    border border-violet-100

                                                    bg-violet-50/40

                                                    px-4

                                                    shadow-sm

                                                    transition-all duration-300

                                                    focus-visible:ring-4
                                                    focus-visible:ring-violet-100
                                                    focus-visible:border-violet-400
                                                "
                                            />

                                        </FormControl>

                                        <FormMessage />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}

                                    </FormItem>
                                )}
                            />

                            {/* Description */}
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>

                                        <FormLabel className="
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        ">
                                            Description
                                        </FormLabel>

                                        <FormControl>

                                            <textarea
                                                {...field}
                                                rows={4}
                                                placeholder="Write event details..."
                                                className="
                                                    w-full

                                                    rounded-2xl

                                                    border border-violet-100

                                                    bg-violet-50/40

                                                    p-4

                                                    text-sm

                                                    shadow-sm

                                                    transition-all duration-300

                                                    focus:outline-none
                                                    focus:ring-4
                                                    focus:ring-violet-100
                                                    focus:border-violet-400

                                                    resize-none
                                                "
                                            />

                                        </FormControl>

                                        <FormMessage />

                                    </FormItem>
                                )}
                            />

                            {/* Image + Date */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* Image */}
                                <FormField
                                    control={form.control}
                                    name="imageURL"
                                    render={({ field }) => (
                                        <FormItem>

                                            <FormLabel className="
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                            ">
                                                Event Banner
                                            </FormLabel>

                                            <FormControl>

                                                <Input
                                                    type="file"
                                                    {...field}
                                                    className="
                                                        h-12

                                                        rounded-2xl

                                                        border border-violet-100

                                                        bg-violet-50/40

                                                        file:mr-4
                                                        file:px-4
                                                        file:py-2

                                                        file:rounded-xl
                                                        file:border-0

                                                        file:bg-gradient-to-r
                                                        file:from-violet-100
                                                        file:to-fuchsia-100

                                                        file:text-violet-700
                                                        file:font-medium
                                                    "
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

                                {/* Date */}
                                <Field className="gap-2">

                                    <FieldLabel
                                        htmlFor="date-picker-simple"
                                        className="
                                            text-sm
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        Event Date
                                    </FieldLabel>

                                    <Popover>

                                        <PopoverTrigger asChild>

                                            <Button
                                                variant="outline"
                                                id="date-picker-simple"
                                                className="
                                                    h-12
                                                    w-full

                                                    justify-start

                                                    rounded-2xl

                                                    border border-violet-100

                                                    bg-violet-50/40

                                                    font-normal

                                                    hover:bg-violet-100/50
                                                    hover:text-violet-700

                                                    transition-all duration-300
                                                "
                                            >

                                                {date
                                                    ? format(date, "dd MMMM yyyy")
                                                    : <span className="text-slate-400">Pick a date</span>
                                                }

                                            </Button>

                                        </PopoverTrigger>

                                        <PopoverContent
                                            className="
                                                w-auto
                                                p-0

                                                rounded-3xl

                                                border border-violet-100

                                                shadow-2xl
                                            "
                                            align="start"
                                        >

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

                        {/* Footer */}
                        <DialogFooter className="
                            mt-10

                            flex flex-col-reverse
                            md:flex-row

                            gap-3
                        ">

                            <DialogClose asChild>

                                <Button
                                    variant="outline"
                                    type="button"
                                    onClick={resetFormValue}
                                    className="
                                        rounded-2xl
                                        h-11

                                        border border-violet-200

                                        bg-white

                                        px-6

                                        text-violet-700
                                        font-medium

                                        transition-all duration-300

                                        hover:bg-gradient-to-r
                                        hover:from-violet-500
                                        hover:to-fuchsia-500

                                        hover:text-white

                                        hover:border-transparent

                                        hover:shadow-lg
                                    "
                                >
                                    Cancel
                                </Button>

                            </DialogClose>

                            <Button
                                type="submit"
                                className="
                                    rounded-2xl
                                    h-11

                                    bg-gradient-to-r
                                    from-violet-600
                                    via-purple-500
                                    to-fuchsia-500

                                    px-6

                                    text-white
                                    font-semibold

                                    shadow-lg
                                    shadow-violet-500/20

                                    transition-all duration-300

                                    hover:scale-[1.02]
                                    hover:shadow-2xl
                                "
                            >
                                Create Event
                            </Button>

                        </DialogFooter>

                    </form>

                </DialogContent>

            </Form>

        </ModalDialog>
    }

    {/* Event Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

    {
        events && events.map((event) => {

            return (

                <Card
                    key={event._id}
                    className="
                        group

                        overflow-hidden

                        rounded-[32px]

                        border border-white/40

                        bg-white/80

                        backdrop-blur-xl

                        shadow-[0_15px_45px_rgba(0,0,0,0.06)]

                        transition-all duration-500

                        hover:-translate-y-2
                        hover:shadow-[0_25px_70px_rgba(139,92,246,0.18)]
                    "
                >

                    {/* Image */}
                    <div className="relative overflow-hidden p-4 pb-0">

                        <div className="relative overflow-hidden rounded-[28px]">

                            <img
                                src={`${import.meta.env.VITE_BACKEND_HOST}/` + event.imageURL}
                                loading="lazy"
                                alt={event.title}
                                className="
                                    h-72
                                    w-full
                                    object-cover

                                    transition-transform duration-700

                                    group-hover:scale-110
                                "
                            />

                            {/* Overlay */}
                            <div className="
                                absolute inset-0

                                bg-gradient-to-t
                                from-black/70
                                via-black/10
                                to-transparent
                            "></div>

                            {/* Date Badge */}
                            <div className="
                                absolute top-5 left-5

                                rounded-2xl

                                border border-white/20

                                bg-white/15

                                px-4 py-2

                                text-white

                                backdrop-blur-xl

                                shadow-lg
                            ">

                                <div className="flex items-center gap-2">

                                    <CalendarCheck2 size={14} />

                                    <span className="text-xs font-semibold tracking-wide">
                                        {event.event_date}
                                    </span>

                                </div>

                            </div>

                            {/* Floating Tag */}
                            <div className="
                                absolute bottom-5 left-5

                                inline-flex items-center gap-2

                                rounded-full

                                bg-gradient-to-r
                                from-violet-600
                                to-fuchsia-500

                                px-4 py-2

                                text-xs
                                font-semibold
                                text-white

                                shadow-xl
                            ">

                                <Clock3 size={13} />
                                Upcoming Event

                            </div>

                        </div>

                    </div>

                    {/* Content */}
                    <CardContent className="px-6 pt-6 pb-4">

                        <h2 className="
                            line-clamp-1

                            text-2xl
                            font-bold

                            text-slate-800

                            transition-colors duration-300

                            group-hover:text-violet-700
                        ">
                            {event.title}
                        </h2>

                        <p className="
                            mt-3

                            line-clamp-3

                            text-sm
                            leading-relaxed

                            text-slate-500
                        ">
                            {event.description}
                        </p>

                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="
                        flex items-center justify-between

                        px-6 pb-6 pt-0
                    ">

                        {/* Left Side */}
                        <div className="flex items-center gap-3">

                            <div className="
                                flex h-10 w-10 items-center justify-center

                                rounded-2xl

                                bg-gradient-to-r
                                from-violet-100
                                to-fuchsia-100

                                text-violet-700
                            ">

                                <CalendarCheck2 size={18} />

                            </div>

                            <div>

                                <p className="
                                    text-sm
                                    font-semibold
                                    text-slate-700
                                ">
                                    EMS Event
                                </p>

                                <p className="
                                    text-xs
                                    text-slate-400
                                ">
                                    Upcoming Schedule
                                </p>

                            </div>

                        </div>

                        {/* Button */}
                        <Button
                            variant="ghost"
                            className="
                                rounded-2xl

                                bg-violet-50

                                px-5

                                text-violet-700
                                font-medium

                                transition-all duration-300

                                hover:bg-gradient-to-r
                                hover:from-violet-600
                                hover:to-fuchsia-500

                                hover:text-white

                                hover:shadow-lg
                            "
                        >
                            View
                        </Button>

                    </CardFooter>

                </Card>

            )
        })
    }

</div>

</div>
        </>
    )
}

export default Event;