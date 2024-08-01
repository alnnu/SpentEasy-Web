"use client";
import SignUpErrorToasts from "@/components/toasts/SignupErrorToasts";
import { Button } from "@/components/ui/button";
import auth from "@/service/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SingUp = () => {
  const router = useRouter();

  const [register, setRegister] = useState<User>({
    email: "",
    name: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
  });

  const [errors, setErros] = useState<[SignUpError]>();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setRegister({ ...register, [event.target.name]: value });
  }

  const handlerSingin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    auth
      .create(register)
      .then((resp) => {
        setErros(undefined);
        if (resp.status == 201) {
          router.push("/signin");
        }
      })
      .catch((error) => {
        console.log(error);
        setErros(error.response.data.errors);
      });
  };

  return (
    <div className="h-screen bg-slate-200 flex flex-col align-middle items-center justify-center px-4">
      <div className="text-center space-y-4 pt-16">
        <h1 className="font-bold text-3xl">Create Account</h1>
      </div>
      <div className="border bg-white mt-16 rounded-xl sm:w-[550px] w-full p-5 shadow-xl">
        <div className="text-center pt-4">Pleace fill the filds</div>

        <div>
          <form onSubmit={(event) => handlerSingin(event)}>
            <div className="md:flex gap-4">
              <input
                className="p-2 mt-8 rounded-xl border w-full"
                type="name"
                name="name"
                placeholder="Name"
                required
                onChange={(event) => handleInputChange(event)}
              />
              <input
                className="md:mt-8 mt-2 p-2 rounded-xl border w-full "
                type="lastName"
                name="lastName"
                placeholder="Last Name"
                required
                onChange={(event) => handleInputChange(event)}
              />
            </div>
            <div className="justify-center mt-2">
              <div className="pb-2 flex flex-col space-y-2">
                <input
                  className="p-2 rounded-xl border w-full "
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  onChange={(event) => handleInputChange(event)}
                />

                <input
                  className="p-2 rounded-xl border w-full"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
                />

                <input
                  className="p-2 rounded-xl border w-full"
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  placeholder="password to Confirm"
                  required
                  onChange={(event) => {
                    handleInputChange(event);
                  }}
                />
              </div>
              <div>
                <Link href="/signin" className="text-sm">
                  Aready have? <span className="underline">Sign in</span>
                </Link>
              </div>

              <div className="py-2  flex justify-center">
                <Button
                  className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300 w-full mt-7 "
                  type="submit"
                >
                  Registrar
                </Button>
              </div>
            </div>
          </form>

          <SignUpErrorToasts count={errors?.length} errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default SingUp;
