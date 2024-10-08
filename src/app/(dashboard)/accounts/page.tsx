"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import account from "@/service/account";
import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { toast } from "sonner";
import { columns } from "./columns";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/dataTable";
import { FiPlus } from "react-icons/fi";


function Accounts() {

  const [data, setdata] = useState<AccountData[]>([
    {
      id: "",
      name: "",
      createdAt: "",
      userEmail: "",
    },
  ]);

  const [open, setIsOpen] = useState(false);

  const fetchData = async () => {
    await account.getAll().then((resp) => {
      setdata(resp.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const schema = z.object({
    name: z.string()
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const handlerSubmit = async (values: z.infer<typeof schema>) => {
    await account.create(values).then((res) => {
      if ((res.status = 201)) {
        toast.success("Account created");
        fetchData()
      } else if ((res.status = 400)) {
        toast.error(res.data.error.msg);
      }
    });
  };

  const Delete = async (row: any) => {
    const rows = row.map((r: any) => r.original);
    await account.delete(rows).then(() => {
      toast.success("Accounts deleted");
    });

    fetchData()
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 md:-mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <Button
            size="sm"
            className="text-center"
            onClick={() => setIsOpen(true)}
          >
            <FiPlus className="mr-2 size-7" /> add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data}
            filterKey="name"
            OnDelete={Delete}
          />
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Accout</SheetTitle>
            <SheetDescription>
              Create a new account to track your transaction.
            </SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              className="space-y-4 pt-4"
              onSubmit={form.handleSubmit(handlerSubmit)}
            >
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g Cash, Bank, Credit Card"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Accounts;
