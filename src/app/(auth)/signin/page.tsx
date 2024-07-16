import { Button } from "@/components/ui/button"
import { Eclipse } from "lucide-react"
import Link from "next/link"

const SingIn = () => {
  const handleInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
  }
  return (
    <div className='h-screen bg-slate-200 lg:flex flex-col align-middle items-center justify-center px-4'>
      <div className='text-center space-y-4 pt-16'> 
        <h1 className='font-bold text-3xl'>Hello<br/>Welcome Back!</h1>
      </div>
      <div className='border bg-white mt-16 rounded-xl p-5 shadow-xl'> 
        <div className="text-center mb-5 mt-4">Log in with you data</div>
        <div className="">
                        <form
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