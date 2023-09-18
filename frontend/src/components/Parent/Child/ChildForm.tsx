import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";


import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { InputField } from "@/components/Form";
import { DateField } from "@/components/Form/DateField";
import { NumberPasscode } from "@/components/Form/NumberPasscode";
import { Child } from "@/types/Child";
import { CreateChildInput } from "schema/generated/graphql";

const schema = z.object({
  username: z
    .string({
      errorMap: (issue, ctx) => {
        if (issue.code === z.ZodIssueCode.invalid_type) {
          if (issue.expected === "string") {
            return {
              message:
                "Username must only contain alphanumeric or underscore characters",
            };
          }
        }
        if (issue.code === z.ZodIssueCode.custom) {
          return { message: `less-than-${(issue.params || {}).minimum}` };
        }
        if (issue.code === "invalid_string") {
          return {
            message:
              "Username must only contain alphanumeric or underscore characters",
          };
        }
        return { message: ctx.defaultError };
      },
    })
    .min(4)
    .regex(/^[a-zA-Z0-9_]*$/i),
  email: z.string().email().optional(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.date().optional(),
  loginPattern: z
    .string()
    .length(4, "Child password must be exactly 4 digits!"),
});

interface IChildFormProps {
  onSubmit: (data: CreateChildInput) => void;
  onDelete?: () => void;
  child?: Child;
  type: "add" | "edit";
}

const ChildForm = (props: IChildFormProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (props.child) {
      const defaults: any = {
        username: props.child.username,
        loginPattern: props.child.loginPattern,
        patternLock: props.child.loginPattern
          ? props.child.loginPattern.split("").map((num) => Number(num))
          : [],
        firstName: props.child.user.firstName,
        lastName: props.child.user.lastName,
        birthDate: new Date(props.child.birthDate),
      };
      reset(defaults);
    }
  }, [props, reset]);

  return (
    <Section padding="none">
      <form onSubmit={handleSubmit(props.onSubmit as any)}>
        {props.type === "add" ? (
          <p className="pb-6 text-2xl font-bold lg:text-4xl">
            Add Child Account
          </p>
        ) : (
          <div className="grid justify-between w-full grid-cols-3">
            <p className="col-span-2 pb-6 text-2xl font-bold lg:text-4xl">
              Account Settings
            </p>
            <Button type="submit" variant="brand1" className="w-full" size="sm">
              Save Changes
            </Button>
          </div>
        )}
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col w-full pr-4 mt-8">
            <label htmlFor="firstName" className="">
              First Name
            </label>
            <InputField
              required
              type="text"
              registration={{ ...register("firstName") }}
              error={errors.firstName}
            />
          </div>
          <div className="flex flex-col w-full pl-4 mt-8 tour_4">
            <label htmlFor="lastName" className="">
              Last Name
            </label>
            <InputField
              required
              type="text"
              registration={{ ...register("lastName") }}
              error={errors.lastName}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="birthDate" className="">
            Birthdate
          </label>
          <DateField
            control={control}
            label="birthDate"
            fieldName="birthDate"
            setValue={setValue}
          />
        </div>
        <div className="flex flex-col tour_5">
          <label htmlFor="username" className="">
            Username
          </label>
          <InputField
            required
            type="text"
            registration={{ ...register("username") }}
            error={errors.username}
          />
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="w-full">
            <label
              htmlFor="loginPattern"
              className="items-start justify-start w-full text-left"
            >
              Password
            </label>
            <p className="h-16 text-center">{watch("loginPattern")}</p>
          </div>
          <div className="tour_6">
            <NumberPasscode
              setPasscode={setValue}
              error={errors.loginPattern}
            />
          </div>
        </div>
        <div className="py-6">
          {props.type === "add" ? (
            <Button type="submit" variant="brand1" className="w-full tour_7">
              Create account
            </Button>
          ) : (
            <button
              type="button"
              className="font-extrabold text-red-600 uppercase"
              onClick={(): void => setIsOpen(true)}
            >
              Delete Account
            </button>
          )}
          <Dialog
            isOpen={isOpen}
            onClose={(): void => {
              setIsOpen(false);
            }}
            className=""
          >
            <div className="flex flex-col items-center justify-center w-full">
              <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
                Warning!
              </p>
              <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
                Are you sure you want to delete the account?
              </p>
              <div className="flex flex-row items-center space-x-8">
                <Button
                  variant="brand1"
                  onClick={(): void => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
                <Button variant="danger" onClick={props.onDelete}>
                  Confirm
                </Button>
              </div>
            </div>
          </Dialog>
        </div>
      </form>
    </Section>
  );
};

export default ChildForm;
