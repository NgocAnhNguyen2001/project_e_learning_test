import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import * as React from "react";
import {
  useForm,
  UseFormReturn,
  SubmitHandler,
  UseFormProps,
} from "react-hook-form";
import { ZodType } from "zod";

type FormProps<TFormValues, Schema> = {
  className?: string;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  TFormValues extends Record<string, any> = Record<string, any>,
  Schema extends ZodType<any, any, any> = ZodType<any, any, any>,
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<TFormValues, Schema>): React.ReactElement => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema && zodResolver(schema),
  });
  return (
    <form
      className={clsx("space-y-6", className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
