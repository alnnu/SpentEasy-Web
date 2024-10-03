"use client";
import React, { useEffect, useState } from "react";
import { TransactionData, columns } from "./columns";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/dataTable";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiPlus } from "react-icons/fi";
import Transaction from "@/service/transaction";
import Category from "@/service/category";
import Account from "@/service/account";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function transaction() {
  const [data, setdata] = useState<TransactionData[]>([
    {
      id: "",
      account: {
        id: "",
        name: "",
        createdAt: "",
        userEmail: "",
      },
      category: {
        id: "",
        name: "",
        createdAt: "",
        userEmail: "",
      },
      value: 0,
      date: undefined,
      description: "",
      accountId: "",
      isExpense: false,
    },
  ]);

  const [open, setIsOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryData[]>([
    {
      id: "",
      name: "",
      createdAt: "",
      userEmail: "",
    },
  ]);

  const [accounts, setAccounts] = useState<AccountData[]>([
    {
      id: "",
      name: "",
      createdAt: "",
      userEmail: "",
    },
  ]);

  const fetchData = async () => {
    await Transaction.getAll().then((resp) => {
      setdata(resp.data);
    });
  };

  const fetchCategories = async () => {
    await Category.getAll().then((res) => {
      setCategories(res.data);
    });
  };

  const fetchAccounts = async () => {
    await Account.getAll().then((res) => {
      setAccounts(res.data);
    });
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchAccounts();
  }, []);

  const schema = z.object({
    value: z.number().min(0, "Can not be less than 0"),
    accountId: z.string(),
    categoryId: z.string(),
    description: z.string(),
    date: z.date(),
    isExpense: z.boolean(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      value: 0,
      accountId: "",
      categoryId: "",
      description: "",
      date: undefined,
      isExpense: false,
    },
  });

  const handlerSubmit = async (values: z.infer<typeof schema>) => {
    await Transaction.create(values).then((res) => {
      if ((res.status = 201)) {
        toast.success("category created");
        fetchData()
      } else if ((res.status = 400)) {
        toast.error(res.data.error.msg);
      }
    });
  };

  const Delete = async (row: any) => {
    const rows = row.map((r: any) => r.original);
    await Transaction.delete(rows).then(() => {
      toast.success("Transactions deleted");
    });

    fetchData();
  };


  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 md:-mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transaction page
          </CardTitle>
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
            filterKey="description"
            OnDelete={Delete}
          />
        </CardContent>
      </Card>

      <Sheet open={open} onOpenChange={setIsOpen}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>New Transaction</SheetTitle>
            <SheetDescription>Create a new Transaction.</SheetDescription>
          </SheetHeader>
          <Form {...form}>
            <form
              className="space-y-4 pt-4"
              onSubmit={form.handleSubmit(handlerSubmit)}
            >
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="size-4 mr-2" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Select an category"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categories.map((item, i) => (
                            <SelectItem key={i} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={"Select an account"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Accounts</SelectLabel>
                          {accounts.map((item, i) => (
                            <SelectItem key={i} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                name="value"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Value</FormLabel>
                    <FormControl>
                      <Input placeholder="Value" {...field} value={undefined} onChange={event => field.onChange(+event.target.value)} type="number" step="0.01" min="0" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isExpense"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>This transaction is an expense?</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Notes of your payment"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Create Transaction
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default transaction;
