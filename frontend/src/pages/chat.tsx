import { useParams } from "react-router-dom";
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
import { Send } from "lucide-react";
import { useGetUserIdByEmailQuery, useSendMessageMutation } from "@/services/api";
import { useState } from "react";

const validation = yup.object({
  message: yup.string(),
});

type FormData = typeof validation.__outputType;

const Chat = () => {
  const {id} = useParams();
  const [messages, setMessages] = useState<string[]>([]);

  if (id === undefined) return null;
  const getUserIdByEmail = useGetUserIdByEmailQuery({email:id});
  const [sendMessageMutation] = useSendMessageMutation();
  const form = useForm<FormData>({
    defaultValues: {
      message: "",
    },
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      if (!data.message) return;

      sendMessageMutation({content:data.message, receiverId:getUserIdByEmail.currentData.getUserIdByEmail});
      // @ts-ignore
      setMessages((prev) => [...prev, data.message]);
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="px-5 h-screen ">
      <div className="h-[90%]">
        <div className="p-2 bg-white mt-2 w-[90%] rounded-lg text-center">{id}</div>
        {messages.map((message, index) =>(
          <div key={index} className="p-1 border w-fit mb-2 rounded-r-lg border-orange-200">
            {message}
          </div>
        ))}
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  className="w-full">
          <div className="flex items-center gap-2 w-full">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormControl>
                    <Input placeholder="Type a message..." type="text" {...field} className="w-full bg-white max-md:text-sm"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-fit">
              <Send/>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Chat;
