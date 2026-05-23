import React, { useActionState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { redirect, useNavigate } from 'react-router';
import axiosInstance from '@/axios/axiosInstance';
import {toast} from 'sonner';

type FormState = {
  email: string;
  error?: string | undefined;
  password?: string | undefined;
  name?: string | undefined;
  passwordError?: string | undefined;
  errorName?: string | undefined;

};


const Signup = () =>{
    const navigate = useNavigate();
    const [state, submitForm, isPending] = useActionState<FormState, FormData>(
    submitEmail,
    { email: '', error: undefined, password : '', name: '', passwordError: undefined, errorName: undefined }
  );

  async function submitEmail(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const name = formData.get('name') as string;

  if (!email.includes('@')) {
    return { ...prevState, error: 'Invalid email address' };
  }
  if (!password || password.length < 8) {

    return { ...prevState, passwordError: 'Password less than 8 characters' };
  }

   if (!name) {

    return { ...prevState, errorName: 'Please enter your name' };
  }

  try{
    const response = await axiosInstance.post("/signup",{email, password, name});
    if(response.status === 201){
      // navigate("/")
       toast(`${response.data.message}`, {
        classNames: {
          toast: "!bg-green-200",
          title: "!text-green-600 font-bold",
        },
      });
      console.log("Response is", response);
    }
    return { email, error: undefined, password, name };
  }catch(error: any){
    if(error.response?.status == 409){
      toast(`${error.response.data.message}`, {
        classNames: {
          toast: "!bg-red-200",
          title: "font-bold !text-red-600",
        },
      });
    }
  }
}

  return(
      <>
        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-fuchsia-100 flex items-center justify-center px-4 py-8 overflow-hidden relative">

  {/* Background Blur Effects */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-violet-300/30 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-fuchsia-300/30 rounded-full blur-3xl"></div>

  <Card className="relative z-10 w-full max-w-md border-0 rounded-3xl shadow-[0_20px_80px_rgba(124,58,237,0.15)] backdrop-blur-xl bg-white/90 overflow-hidden">

    <form action={submitForm}>

      {/* Header */}
      <CardHeader className="text-center pt-10 pb-6 space-y-4">

        {/* Logo */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-xl">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            EMS
          </h1>
        </div>

        <div className="space-y-2">
          <CardTitle className="text-4xl font-extrabold bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            Create Account
          </CardTitle>

          <p className="text-sm text-gray-500">
            Join us and start your journey today
          </p>
        </div>

      </CardHeader>

      {/* Form */}
      <CardContent className="space-y-5 px-8">

        {/* Name */}
        <div className="space-y-2">
          <div className="relative">

            <Input
              id="name"
              type="text"
              name="name"
              placeholder="Your Name"
              className="h-12 rounded-2xl border border-gray-200 bg-white/70 pl-4 shadow-sm focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
            />

          </div>

          {state.errorName && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">
              {state.errorName}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">

          <Input
            id="email"
            type="text"
            name="email"
            placeholder="Email Address"
            className="h-12 rounded-2xl border border-gray-200 bg-white/70 shadow-sm focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
          />

          {state.error && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">
              {state.error}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2 relative">

          <Input
            id="password"
            type="password"
            name="password"
            placeholder="Create Password"
            className="h-12 rounded-2xl border border-gray-200 bg-white/70 shadow-sm focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500 transition-all"
          />

          {state.passwordError && (
            <p className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-xl border border-red-100">
              {state.passwordError}
            </p>
          )}

        </div>

      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-4 px-8 pb-10 pt-6">

        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-700 hover:to-fuchsia-600 text-white font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02]"
        >
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>

        <div className="flex items-center gap-2 w-full">
          <div className="h-px bg-gray-200 flex-1"></div>
          <span className="text-xs text-gray-400 uppercase">
            Already have an account?
          </span>
          <div className="h-px bg-gray-200 flex-1"></div>
        </div>

        <Button
          type="button"
          onClick={() => navigate('/login')}
          variant="outline"
          className="w-full h-12 rounded-2xl border-gray-200 hover:bg-violet-50 hover:border-violet-300 text-violet-600 font-semibold transition-all"
        >
          Login Instead
        </Button>

      </CardFooter>
    </form>
  </Card>
</div>      
      </>
  )
}

export default Signup;