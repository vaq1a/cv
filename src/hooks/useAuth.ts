import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";

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
      if (data?.success) {
        router.push("/admin");
      }
    },
    onError: (error) => {
      logger.error("Login failed", error);
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
    onSuccess: () => {
      logger.info("Send password successful");
    },
    onError: (error) => {
      logger.error("Send password failed", error);
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
