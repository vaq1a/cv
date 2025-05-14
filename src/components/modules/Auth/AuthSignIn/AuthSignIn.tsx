"use client";

import { type FC } from "react";
import classNames from "@/helpers/classNames";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useTranslations } from "next-intl";

interface AuthSignInProps {
  className?: string;
}

const AuthSignIn: FC<AuthSignInProps> = ({ className }) => {
  const t = useTranslations();

  const { form, handleAuthSubmit, sendPasswordHandler } = useAuth();

  return (
    <div className={classNames(className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleAuthSubmit)}
          className="space-y-3"
        >
          <FormField
            control={form.control}
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder={t("login.username")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder={t("login.password")}
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">{t("login.title")}</Button>
        </form>
      </Form>
      <Button onClick={sendPasswordHandler} className="mt-3">
        {t("login.sendPassword")}
      </Button>
    </div>
  );
};

export default AuthSignIn;
