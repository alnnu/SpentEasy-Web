"use client";
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react";
import Link from "next/link"
import { useRouter } from "next/navigation";

const SingIn = () => {
    const session = useSession()
    const router = useRouter()

    const handlerLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        try{
            const data = {
                email: formData.get("email"),
                password: formData.get("password"),
            }

            const res = await signIn("credentials", {
                ...data,
                redirect: false
            })
            
            if (!res?.error) {
                console.log(res + "lll")
               // router.push("/home");
            }else{
                console.log(res)
            }
            console.log(data)
        }catch(e) {
            console.log(e)
        }
    }

    console.log(session.status)
    return (
        <div className='h-screen bg-slate-200 lg:flex flex-col align-middle items-center justify-center px-4'>
        <div className='text-center space-y-4 pt-16'> 
            <h1 className='font-bold text-3xl'>Hello<br/>Welcome Back!</h1>
        </div>
        <div className='border bg-white mt-16 rounded-xl p-5 shadow-xl'> 
            <div className="text-center mb-5 mt-4">Log in with you data</div>
            <div className="">
                            <form 
                                onSubmit={(event) => {
                                    handlerLogin(event)
                                }}
                                className="w-96"
                            >
                                <div className="justify-center mt-2">
                                    <div className="pb-2 flex flex-col space-y-2">
                                        <input
                                            className="p-2 rounded-xl border w-full "
                                            id="email"
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            required
                                        />
                                        
                                        <input
                                            className="p-2 rounded-xl border w-full"
                                            id="password"
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            required
                                        />
                                    </div>
                                    <div>
                                    <Link href="/signup" className="text-sm">New here? <span className="underline">Sign up</span></Link>
                                    </div>
                                
                                    <div className="py-2 flex justify-center">
                                        <Button
                                            className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full mt-7"
                                            type="submit"
                                        >
                                            Registrar
                                        </Button>
                                            
                                    </div>
                                </div>
                            </form>

                            {/* <SignUpErrorToasts count={errors?.length} errors={errors}/>  */}
                        </div>
        </div>
        </div>
    )
}

export default SingIn