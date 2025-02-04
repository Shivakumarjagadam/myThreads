"use client";

import * as z from "zod"; 
import { useForm } from "react-hook-form";
import { useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {Input } from "@/components/ui/input";

import { CommentValidation } from "@/lib/validations/thread";
import path from "path";
// import { createThread } from "@/lib/actions/threads.actions";
import Image from "next/image";
import { addCommentToThread } from "@/lib/actions/threads.actions";



interface Props{
  threadId:string;
  currentUserImg:string;
  currentUserId:string;
}


const Comment=({threadId,currentUserImg,currentUserId}:Props)=>{

  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    
    },
  });


  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    // Handle form submission
    // from backend;

    await addCommentToThread(threadId,values.thread,currentUserId,pathname);


   form.reset(); //reset form after submission
  };




  return (
    <Form {...form}>
      <form
        className='comment-form'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full items-center gap-3'>
              <FormLabel>
                <Image
                src={currentUserImg}
                alt="Profile Pic"
                width={48}
                height={48}
                className="rounded-full object-cover"
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input type="text"
                placeholder="Write a comment"
                className="no-focus text-light-1 outline-none"
                {...field} />
              </FormControl>
         
            </FormItem>
          )}
        />

        <Button type='submit' className='comment-form_btn'>
         Reply ...
        </Button>
      </form>
    </Form>
  );

}

export default Comment;