import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { FiTrash2 } from "react-icons/fi";
import account from "@/service/account";

import { toast } from "sonner";

function AccountForm({ id }: { id: string | undefined }) {
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
    if (!id) {
      await account.create(values).then((res) => {
        if(res.status = 201) {
          toast.success("Account created")
        }else if(res.status = 400){
          toast.error(res.data.error.msg)
        }
      });
    }
  };
  return (
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
                <Input placeholder="e.g Cash, Bank, Credit Card" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          {id ? "Update Account" : "Create Account"}
        </Button>
        {id ? (
          <Button type="button" variant="outline" className="w-full">
            <FiTrash2 className="mr-2" />
            Delete Account
          </Button>
        ) : (
          <></>
        )}
      </form>
    </Form>
  );
}

export default AccountForm;
