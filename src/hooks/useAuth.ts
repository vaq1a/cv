import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  login: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
  password: z.string().min(10, {
    message: "Password must be at least 10 characters.",
  }),
});

export const useAuth = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: {
      login: "",
      password: "",
    },
  });

  const loginMutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data?.token) {
        router.push("/admin");

        return;
      }
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: `${error.message}`,
      });
    },
  });

  const handleAuthSubmit: SubmitHandler<z.infer<typeof formSchema>> = (
    data,
  ) => {
    const { login, password } = data;

    loginMutation.mutate({
      login,
      password,
    });
  };

  const sendPasswordMutation = api.email.sendPassword.useMutation({
    onSuccess: (data) => {
      console.log("Send Password successful", data);
    },
    onError: (error) => {
      console.error("Send Password failed", error);
    },
  });

  const sendPasswordHandler = () => {
    sendPasswordMutation.mutate();
  };

  return {
    form,
    handleAuthSubmit,
    sendPasswordHandler,
  };
};
