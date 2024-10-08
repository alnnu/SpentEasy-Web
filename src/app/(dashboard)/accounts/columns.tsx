"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import account from "@/service/account";


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
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { FiEdit3, FiTrash2 } from "react-icons/fi";
import ConfirnModal from "@/components/modal/confirnModal";
import { useRouter } from "next/navigation";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns: ColumnDef<AccountData>[] = [
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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          create day
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
      const schema = z.object({
        name: z.string().min(2, {
          message: "Username must be at least 2 characters.",
        }),
      });

      const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
          name: "",
        },
      });

      const handlerSubmit = async (values: z.infer<typeof schema>) => {
        await account.update(values, row.original.id).then(() => {
          window.location.reload()
        })
      };
      const OnDelete = async (row: any) => {
        const rows: AccountType[] = [row.original]
        console.log("sd")
        await account.delete(rows).then(() => {
          window.location.reload()
        })
      }
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
                <SheetTitle>edit Accout</SheetTitle>
                <SheetDescription>
                  Edit {row.original.name} account to track your transaction.
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
                    Save
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