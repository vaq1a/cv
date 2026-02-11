import { useRouter } from "next/navigation";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "@/trpc/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";
import {
  MIN_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  LOGIN_MIN_MESSAGE,
  PASSWORD_MIN_MESSAGE,
} from "@/constant/validation";
import { ADMIN_PATH } from "@/constant/routes";

const formSchema = z.object({
  login: z.string().min(MIN_LOGIN_LENGTH, {
    message: LOGIN_MIN_MESSAGE,
  }),
  password: z.string().min(MIN_PASSWORD_LENGTH, {
    message: PASSWORD_MIN_MESSAGE,
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
        router.push(ADMIN_PATH);
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
