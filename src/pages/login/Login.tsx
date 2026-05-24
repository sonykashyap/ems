import React, { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {toast} from 'sonner';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router';
import axiosInstance from "@/axios/axiosInstance";
import {Eye, EyeOff} from 'lucide-react';
import ENDPOINTS from '@/config/api.js';
import { useAppDispatch } from '@/hooks';
import { accessToken } from '@/reducers/authReduer';

type FormState = {
  email: string;
  error?: string;
  password?: string;
  passwordError?: string;
};



const Login = () =>{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [state, submitForm, isPending] = useActionState<FormState, FormData>(
    submitEmail,
    { email: '', error: undefined, password : '', passwordError: undefined }
  );
  
  async function submitEmail(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email.includes('@')) {
    return { ...prevState, error: 'Invalid email address' };
  }
  if (!password || password.length < 8) {

    return { ...prevState, passwordError: 'Password should atleast 8 characters long' };
  }

  // Login API request
  try{
    const response = await axiosInstance.post(ENDPOINTS.ENDPOINTS.auth.login(), {email: email, password: password});

    if(response.status == 200){
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      // if(response.data.user.role === "admin"){
        // navigate("/admin");
      // }else{
        const lastURL = localStorage.getItem("lasturl");
        navigate(lastURL || "/");
        localStorage.removeItem("lasturl");
      // }
    }
    // await new Promise((resolve) => setTimeout(resolve, 1000));
  }catch(error : any){
    if(error.message === "Network Error"){
      return toast(`Cannot connect to the server. Please try again later.`, {
        classNames: {
          toast: "!bg-red-200",
          title: "font-bold !text-red-600",
        },
      });
    }
    if(error.response?.status == 404){
      toast(`${error.response.data.message}`, {
        classNames: {
          toast: "!bg-red-200",
          title: "font-bold !text-red-600",
        },
      });
    }else if(error.response?.status == 400){
      toast(`${error.response.data.message}`, {
        classNames: {
          toast: "!bg-red-200",
          title: "font-bold !text-red-600",
        },
      });
    }
  }
  return { email, error: undefined, password };
}

const loginWithGoogle = () => {
  console.log("Login with Google called");
}

  return(
    <>
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-100 flex items-center justify-center px-4">
  <Card className="w-full max-w-md border-0 shadow-2xl rounded-3xl overflow-hidden">
    
    <form action={submitForm}>
      
      {/* Header */}
      <CardHeader className="space-y-2 pb-6 pt-8 text-center relative">
        
        <div className="absolute right-6 top-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/signup')}
            className="text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-full"
          >
            Sign Up
          </Button>
        </div>

        {/* Logo */}
        <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-xl">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            EMS
          </h1>
        </div>

        <div className="space-y-1">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Welcome Back
          </CardTitle>

          <p className="text-sm text-gray-500">
            Login to continue to your account
          </p>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-5 px-8">

        {/* Email */}
        <div className="space-y-2">
          <Input
            id="email"
            type="text"
            name="email"
            placeholder="Enter your email"
            className="h-12 rounded-xl border-gray-200 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500 shadow-sm"
          />

          {state.error && (
            <p className="text-sm text-red-500">
              {state.error}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">

          <div className="flex items-center justify-end">
            <a
              href="forgot-password"
              className="text-sm text-violet-600 hover:text-violet-700 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          <div className="relative">
            <Input
              tabIndex={0}
              placeholder="Enter your password"
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="h-12 rounded-xl border-gray-200 pr-12 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500 shadow-sm"
            />

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-600 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye size={18} />
              ) : (
                <EyeOff size={18} />
              )}
            </button>
          </div>

          {state.passwordError && (
            <p className="text-sm text-red-500">
              {state.passwordError}
            </p>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-4 px-8 pb-8 pt-6">

        <Button
          type="submit"
          disabled={isPending}
          className="
            w-full
            h-12

            rounded-2xl

            bg-gradient-to-r
            from-violet-600
            via-purple-500
            to-fuchsia-500

            text-white
            font-semibold

            shadow-[0_12px_30px_rgba(139,92,246,0.25)]

            transition-all duration-300

            hover:from-violet-700
            hover:via-purple-600
            hover:to-fuchsia-600

            hover:shadow-[0_18px_40px_rgba(139,92,246,0.35)]

            hover:scale-[1.02]

            disabled:opacity-70
            disabled:cursor-not-allowed
            disabled:hover:scale-100
          "
        >
  {isPending ? "Logging In..." : "Login"}
        </Button>

        <div className="relative w-full">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>

          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <Button
          type="button"
          onClick={loginWithGoogle}
          variant="outline"
          className="w-full h-12 rounded-xl border-gray-200 hover:bg-gray-50 font-medium"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="20"
            height="20"
            className="mr-2"
          >
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.2 0 10-2 13.5-5.3l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6 7.1l6.2 5.2C39.2 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
            />
          </svg>

          Login with Google
        </Button>

      </CardFooter>
    </form>
  </Card>
</div>
    </>
  )
}

export default Login;