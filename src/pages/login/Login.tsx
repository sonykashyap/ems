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
      <div className='container mx-auto h-screen flex justify-center items-center'>
        <Card className="w-full max-w-sm">
          <form action={submitForm}>
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardAction>
                <Button type="button" variant="link" onClick={()=> navigate('/signup')}>Sign Up</Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    {/* <Label htmlFor="email">Email</Label> */}
                    <Input
                      id="email"
                      type="text"
                      name='email'
                      placeholder='Email'
                      className='rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-color-none'
                    />
                    {state.error && <p className='text-red-500'> {state.error} </p> }
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                        {/* <Label htmlFor="password">Password</Label> */}
                        <a
                        href="forgot-password"
                        className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                        >
                        Forgot your password?
                        </a>
                    </div>
                    <div className='relative'>
                      <Input 
                        tabIndex={0} 
                        placeholder='Password' 
                        id="password" 
                        type={showPassword ? 'text' : 'password'} 
                        name='password'
                        className='rounded-none focus:outline-none focus-visible:ring-0 focus-visible:border-color-none'
                      />
                      <span className='text-xs absolute top-2 right-2 hover:cursor-pointer'>
                        {showPassword ? 
                          <Eye onClick={()=> setShowPassword(!showPassword)} /> : 
                          <EyeOff size="16" onClick={()=> setShowPassword(!showPassword)} />
                        }
                      </span>
                    </div>
                  
                    {state.passwordError && <p className='text-red-500'> {state.passwordError} </p>}
                  </div>
              </div>
              {/* {state.email && <p> {state.email} </p>} */}
            </CardContent>
            <CardFooter className="flex-col gap-2 mt-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Logging In..." : "Login"}
                </Button>
                <Button type="button" onClick={loginWithGoogle} variant="outline" className="w-full">
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