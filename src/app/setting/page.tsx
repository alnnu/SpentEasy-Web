'use client'
import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import {FiDownload, FiEdit3, FiTrash2} from "react-icons/fi";


const Page = () => {
    const sesstion = useSession()
    const user = sesstion.data?.user
    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 md:-mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
                    <CardTitle className="text-xl line-clamp-1">Your Settings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="md:flex pb-5 border-b gap-x-5 justify-between mb-10">
                        <div className="w-1/2">
                            <div className="text-2xl mb-2">Name</div>
                            <div
                                className="p-3 border rounded-2xl drop-shadow-sm flex justify-between ">
                                <p className="text-xl  my-auto">
                                    {user?.name}
                                </p>
                                <Button variant="ghost" className="h-fit border-none text-center justify-center">
                                    <FiEdit3 className="size-6"/>
                                </Button>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="text-2xl mb-2">Last name</div>
                            <div
                                className="p-3 border rounded-2xl drop-shadow-sm flex justify-between ">
                                <p className="text-xl  my-auto">
                                    {user?.name}
                                </p>
                                <Button variant="ghost" className="h-fit border-none text-center justify-center">
                                    <FiEdit3 className="size-6"/>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="pb-5 border-b mb-10">
                        <div className="text-2xl mb-2">Eamil</div>
                        <div
                            className="p-3 border rounded-2xl drop-shadow-sm flex justify-between ">
                            <p className="text-xl  my-auto">
                                {user?.email}
                            </p>
                            <Button variant="ghost" className="h-fit border-none text-center justify-center">
                                <FiEdit3 className="size-6"/>
                            </Button>
                        </div>

                    </div>
                    <div className="pb-5 border-b mb-10">
                        <div className="text-2xl mb-2">Password</div>
                        <div
                            className="p-3 border rounded-2xl drop-shadow-sm flex justify-between ">
                            <p className="text-xl  my-auto">
                                *******************
                            </p>
                            <Button variant="ghost" className="h-fit border-none text-center justify-center">
                                <FiEdit3 className="size-6"/>
                            </Button>
                        </div>
                    </div>
                    <div className="pb-5 ">
                        <div className="text-2xl mb-4">Actions</div>
                        <div className="md:flex pb-5 border-b flex gap-x-5 justify-between mb-10">
                            <Button variant="default" className="border-none w-full rounded-2xl h-16 text-xl">
                                <FiDownload className="size-6 mr-2" />
                                Make a Backup
                            </Button>

                            <Button variant="destructive" className="border-none w-full rounded-2xl h-16 text-xl">
                                <FiTrash2 className="size-6 mr-2" />
                                Delete Account
                            </Button>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
};

export default Page;