'use client'
import React, { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FiPlus } from "react-icons/fi";
import NewAccountSheetProvider from "@/components/account/newAccountSheetProvider";
import { DataTable } from "@/components/dataTable";
import { AccountData, columns } from "./columns";
import { toast } from "sonner";
import account from "@/service/account";
import ConfirnModal from "@/components/modal/confirnModal";

function Accounts() {
  const [data, setdata]  = useState<AccountData[]>([{
    id:"",
    name:"",
    createdAt:"",
    userEmail: ""
  }]);

  const [open, setIsOpen] = useState(false)

  const fetchData = async () => {
    await account.getAll().then((resp) => {
      setdata(resp.data)
    });
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handleStateChange = async () => {
    console.log("aaa")
    await account.getAll().then((resp) => {
      setdata(resp.data)
    });
  };

  const Delete = async (row: any) => {
    const rows = row.map((r: any) => r.original)
    await account.delete(rows).then(() => {
      toast.success("Accounts deleted")
    })

    await account.getAll().then((resp) => {
      setdata(resp.data)
    });
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 md:-mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts page</CardTitle>
          <NewAccountSheetProvider OnChangeHandler={handleStateChange}>
            <FiPlus className="mr-2 size-7" /> add new
          </NewAccountSheetProvider>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} filterKey="name"  OnDelete={Delete}/>
        </CardContent>
      </Card>
    </div>
  );
}

export default Accounts;
