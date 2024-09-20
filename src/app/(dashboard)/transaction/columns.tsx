"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import {ArrowUpDown, CalendarIcon} from "lucide-react";

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
import React, {useEffect, useState} from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { FiEdit3, FiTrash2 } from "react-icons/fi";
import ConfirnModal from "@/components/modal/confirnModal";
import { cn } from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import Transaction from "@/service/transaction";
import Category from "@/service/category";
import Account from "@/service/account";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type TransactionData = {
  id: string;
  account: {
    id: string;
    name: string;
    createdAt: string;
    userEmail: string;
  };
  category: {
    id: string;
    name: string;
    createdAt: string;
    userEmail: string;
  };
  value: number;
  date: Date | undefined;
  description: string;
  accountId: string;
  isExpense: boolean
};

export const columns: ColumnDef<TransactionData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          id
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "value",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          value
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',

          });
      return <>
      <div className={cn("px-4 py-2 w-fit h-fit  rounded-full", row.original.isExpense ? "bg-red-600/25": "bg-blue-600/25")}>
        {row.original.isExpense ? "-" + formatter.format(row.original.value/100): formatter.format(row.original.value/100) }      
      </div>
      </>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          description
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "account.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          accout
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "Action",
    cell: ({ row }) => {
      const [open, setIsOpen] = useState(false);
      const [openModal, setIsOpenModal] = useState(false);

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
        await Transaction.update(values, row.original.id).then(() => {
          window.location.reload();
        });
      };
      const OnDelete = async (row: any) => {
        const rows: AccountType[] = [row.original];
        await Transaction.delete(rows).then(() => {
          console.log("sa");
          window.location.reload();
        });
      };
      return (
        <>
          <Button
            size="sm"
            className="text-center"
            onClick={() => setIsOpen(true)}
          >
            <FiEdit3 className="mr-2 size-4" /> edit
          </Button>
          <Sheet open={open} onOpenChange={setIsOpen}>
            <SheetContent className="space-y-4">
              <SheetHeader>
                <SheetTitle>edit your transaction</SheetTitle>
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
                              <Input placeholder="Value" {...field}  onChange={event => field.onChange(+event.target.value)}  type="number" step="0.01" min="0" />
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
                    Edit category
                  </Button>
                  <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setIsOpenModal(true);
                      }}
                  >
                    <FiTrash2 className="size-4 mr-2" />
                    Delete
                  </Button>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
          <ConfirnModal
            open={openModal}
            setIsOpen={setIsOpenModal}
            title="Are you sure?"
            message="You are about to delete this account"
            onConfirn={() => {
              OnDelete(row);
            }}
          />
        </>
      );
    },
  },
];
