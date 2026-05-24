import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "@/hooks";
import userReducer, { clearToast, forgotPassword } from "@/reducers/userReducer";
import {toast} from 'sonner';
import { RootState } from "@/store";
import { Mail } from "lucide-react";
import { Link } from "react-router";

const ForgotPassword = () => {
    const dispatch = useAppDispatch();
    const toastState = useAppSelector((state:RootState)=> state.userReducer.toast);
    const resetSchema = z.object({
        email: z.string().email("invalid email. Please enter a proper email")
    });

    const {register, handleSubmit, formState : {errors}} = useForm({
        resolver: zodResolver(resetSchema)
    });

    const onSubmit = async (data) => {
        try{
            const result = await dispatch(forgotPassword(data)).unwrap();
            console.log("Successs is ", result);
            // toast(`Email sent successfully`, {
            //         classNames: {
            //           toast: "!bg-green-200",
            //           title: "font-bold !text-green-600",
            //         }
            //       });
        }catch(error){
            console.log("error:", error);
        }
    };

    const [email, setEmail] = useState<string>("");

    const resetHandler = () => {
        console.log("Handle reset functionality", email);
    }

      useEffect(() => {
        if (!toastState.message) return;
      
        toast(toastState.message, {
          classNames: {
            toast:
              toastState.type === "success"
              ? "!bg-green-200"
              : "!bg-red-200",
            title:
              toastState.type === "success"
              ? "!text-green-600 font-bold"
              : "!text-red-600 font-bold",
          },
        });
        dispatch(clearToast());
      }, [toastState]);

    return(
        <>
            <div className="
    min-h-screen

    flex items-center justify-center

    bg-gradient-to-br
    from-[#f7f5ff]
    via-white
    to-[#fff2fc]

    px-4
">

    {/* Background Blur */}
    <div className="
        absolute top-0 right-0

        h-[350px] w-[350px]

        rounded-full

        bg-violet-300/20

        blur-3xl
    "></div>

    <div className="
        absolute bottom-0 left-0

        h-[300px] w-[300px]

        rounded-full

        bg-fuchsia-300/20

        blur-3xl
    "></div>

    {/* Card */}
    <div className="
        relative z-10

        w-full
        max-w-md

        overflow-hidden

        rounded-[32px]

        border border-violet-100

        bg-white/85

        p-8

        shadow-[0_20px_60px_rgba(139,92,246,0.12)]

        backdrop-blur-2xl
    ">

        {/* Top Gradient */}
        <div className="
            absolute top-0 left-0 right-0

            h-2

            bg-gradient-to-r
            from-violet-600
            via-purple-500
            to-fuchsia-500
        "></div>

        {/* Icon */}
        <div className="
            mx-auto

            flex h-20 w-20 items-center justify-center

            rounded-[28px]

            bg-gradient-to-r
            from-violet-600
            to-fuchsia-500

            shadow-[0_12px_35px_rgba(139,92,246,0.3)]
        ">

            <Mail className="text-white" size={34} />

        </div>

        {/* Heading */}
        <div className="text-center mt-6">

            <h1 className="
                text-3xl
                font-black

                tracking-tight

                bg-gradient-to-r
                from-violet-700
                to-fuchsia-500

                bg-clip-text
                text-transparent
            ">
                Forgot Password?
            </h1>

            <p className="
                mt-3

                text-sm
                leading-relaxed

                text-slate-500
            ">
                Enter your registered email address and we’ll send you a password reset link.
            </p>

        </div>

        {/* Form */}
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-8 space-y-5"
        >

            <div>

                <label className="
                    mb-2
                    block

                    text-sm
                    font-semibold

                    text-slate-700
                ">
                    Email Address
                </label>

                <Input
                    className={`
                        h-12

                        rounded-2xl

                        border

                        bg-violet-50/40

                        px-4

                        shadow-sm

                        transition-all duration-300

                        focus-visible:ring-4
                        focus-visible:ring-violet-100
                        focus-visible:border-violet-400

                        ${errors.email
                            ? 'border-red-400 focus-visible:ring-red-100'
                            : 'border-violet-100'
                        }
                    `}
                    onChange={(e) => setEmail(e.target.value)}
                    {...register("email")}
                    placeholder="Enter your email"
                />

                {
                    errors.email &&
                    <p className="
                        mt-2

                        text-sm
                        font-medium

                        text-red-500
                    ">
                        {errors.email.message}
                    </p>
                }

            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="
                    h-12
                    w-full

                    rounded-2xl

                    bg-gradient-to-r
                    from-violet-600
                    via-purple-500
                    to-fuchsia-500

                    text-sm
                    font-semibold
                    text-white

                    shadow-[0_12px_30px_rgba(139,92,246,0.25)]

                    transition-all duration-300

                    hover:scale-[1.02]
                    hover:shadow-[0_18px_40px_rgba(139,92,246,0.35)]
                "
            >
                Reset Password
            </button>

        </form>

        {/* Footer */}
        <div className="
            mt-6

            text-center

            text-sm
            text-slate-500
        ">

            Remember your password?

            <Link
                to="/login"
                className="
                    ml-2
                    font-semibold
                    text-violet-600
                    transition-colors duration-300
                    hover:text-fuchsia-500
                "
            >
                Login
            </Link>

        </div>

    </div>

</div>
        </>
    )
}

export default ForgotPassword;