import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addToLocalStorageArray } from "@/lib/utils";

const validation = yup.object({
  email: yup.string(),
});

type FormData = typeof validation.__outputType;

const Home = () => {
  const navigate = useNavigate();
  const form = useForm<FormData>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.email)
        return;

      // TODO: check if this user exists in db

      navigate(`/${data.email}`)
      addToLocalStorageArray("users", data.email)
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="px-5 h-screen flex items-center justify-center w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-center">Find your ChatSy</div>
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit">
              Find
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Home;
