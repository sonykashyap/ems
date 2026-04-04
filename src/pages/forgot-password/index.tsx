import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import { useAppDispatch, useAppSelector } from "@/hooks";
import userReducer, { clearToast, forgotPassword } from "@/reducers/userReducer";
import {toast} from 'sonner';
import { RootState } from "@/store";

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
            <div className="h-screen flex items-center justify-center">
                <div className="w-1/3 h-48 border rounded-xl border-black/10 mt-5 p-3">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <Input 
                                className={`${errors.email && 'border border-red-500'}`}
                                onChange={(e)=> setEmail(e.target.value)} 
                                {...register("email")} 
                                placeholder="Enter your email"
                                />
                            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                        <button
                            type="submit"
                            className="self-end bg-blue-500 text-white rounded-lg py-2 px-3 text-sm mt-3">Reset Password
                        </button>
                        </div>
                        
                    </form>
                </div>
                
            </div>
        </>
    )
}

export default ForgotPassword;