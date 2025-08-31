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
  error?: string;
  password?: string
};



const Signup = () =>{
    const navigate = useNavigate();
    const [state, submitForm, isPending] = useActionState<FormState, FormData>(
    submitEmail,
    { email: '', error: undefined, password : '' }
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

    return { ...prevState, error: 'Password less than 8 characters' };
  }
  try{
    const response = await axiosInstance.post("/signup",{email, password});
    if(response.status === 201){
      // navigate("/")
      console.log("Response is", response);
    }
    return { email, error: undefined, password };
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
        <div className='container mx-auto h-screen flex justify-center items-center'>
            <Card className="w-full max-w-sm">
                <form action={submitForm}>
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    
                    <CardAction>
                        <Button variant="link" onClick={()=> navigate('/login')}>Login</Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name='email'
                            placeholder="m@example.com"
                        
                        />
                        </div>
                        <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                        </div>
                        <Input id="password" type="password" name='password' />
                        {/* {state.error && <p> {state.error} </p>} */}
                        </div>
                    </div>
                    {/* {state.email && <p> {state.email} </p>} */}
                </CardContent>
                <CardFooter className="flex-col gap-2 mt-4">
                    <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? "Signing In..." : "Signup"}
                    </Button>
                </CardFooter>
                </form>
            </Card>
        </div>          
      </>
  )
}

export default Signup;