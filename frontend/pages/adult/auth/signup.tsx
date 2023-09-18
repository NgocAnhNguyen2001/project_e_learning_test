import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FieldError, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useIntervalWhen } from "rooks";
import * as z from "zod";

import { Button } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import { AppLayout } from "@/components/Layout";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  Role,
  SignupInput,
  useSignupMutation,
  useResendVerifyEmailMutation,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { withApollo } from "utils/hooks/withApollo";
import { useStore } from "utils/hooks/zustand";
import Image from "next/image";
import { BsCaretRightFill } from "react-icons/bs";
import Head from "next/head";

const schema = z
  .object({
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // path of error
  });

const waitDuration = 60;

type SignUpFlowType = {
  text: string;
  imgPath: string;
};

const signUpFlow: SignUpFlowType[] = [
  {
    text: "Create Adult Account",
    imgPath: "signup.svg",
  },
  {
    text: "Sign-in Adult Account",
    imgPath: "lock.svg",
  },
  {
    text: "Create Student's Account",
    imgPath: "userplus.svg",
  },
];

const signUpPoints: SignUpFlowType[] = [
  {
    text: "STEAM courses with supplementary Life skills, Arts, English, Coding, Design and more",
    imgPath: "star.svg",
  },
  {
    text: "Courses created and hosted by experienced IB-educators & experts",
    imgPath: "mortarboard.svg",
  },
  {
    text: "Aligned with international curriculum standards",
    imgPath: "web.svg",
  },
  {
    text: "Suitable for ages 6 - 12",
    imgPath: "user.svg",
  },
  {
    text: "Project-based learning and creative design thinking",
    imgPath: "lightbulb.svg",
  },
  {
    text: "Encourages empathy, positive mindset and practical skillset",
    imgPath: "sparkle.svg",
  },
];

const ParentLogin = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();

  const user = useStore((state) => state.user);
  const setLoading = useStore((state) => state.setLoading);

  const [resendTimer, setResendTimer] = useState(waitDuration);
  const [displayVerify, setDisplayVerify] = useState(
    !!router.query.email ?? false,
  );

  const [signup, response] = useSignupMutation();
  const [resendEmail, resentEmail] = useResendVerifyEmailMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // ============EFFECTS
  React.useEffect(() => {
    setLoading(response.loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response.loading]);

  // Push back to home if they are already logged in
  React.useEffect(() => {
    if (router.query.email) {
      setValue("email", router.query.email);
    }
    if (user && user.role === Role.Parent) {
      router.push("/adult/home");
    }
  }, []);

  useIntervalWhen(
    () => {
      setResendTimer(resendTimer - 1);
    },
    1000,
    displayVerify && resendTimer !== 0,
    false,
  );

  useResultCallback(
    response,
    () => {
      setDisplayVerify(true);
      setResendTimer(waitDuration);
    },
    (e) => {
      toast(
        <Feedback
          title="There's an error!"
          subtitle={
            e.graphQLErrors[0].message.includes("ConflictException")
              ? "Email already in use"
              : "Something went wrong"
          }
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    },
  );

  useResultCallback(
    resentEmail,
    () => {
      setResendTimer(waitDuration);
      toast(
        <Feedback
          title="Successfully resent verify email"
          subtitle=""
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    },
    () => {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Something went wrong"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    },
  );

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const onSubmit = async (data: SignupInput): Promise<void> => {
    await signup({
      variables: {
        data: {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          role: Role.Parent,
        },
      },
    }).catch((err) => err);
  };

  // ============VIEWS
  return (
    <AppLayout noFooter hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative min-h-screen bg-fixed bg-bottom bg-no-repeat bg-cover bg-landing-gradient">
        <div className="absolute top-0 left-0 z-0 w-full h-full bg-opacity-80" />
        <div className="relative z-10 flex items-center min-h-screen py-12 lg:py-24">
          <div className="container px-6 mx-auto lg:px-8">
            {/* <div className="flex">
            <Link href="/">
              <a className="flex items-center group">
                <Button
                  className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                  size="sm"
                  variant="secondary"
                >
                  <HiChevronLeft size={16} />
                </Button>
                <p className="text-white uppercase">Back</p>
              </a>
            </Link>
          </div> */}
            {displayVerify ? (
              <>
                <p className="pb-4 text-3xl font-bold text-center text-white lg:text-4xl">
                  Verification Link Sent
                </p>
                <div className="text-white text-2xl text-center pb-4">
                  <p>
                    We{`'`}ve sent an account verification link to your email
                    address.
                  </p>
                  <p>
                    Place click on the link given in the email to verify your
                    account.
                  </p>
                </div>
                <p className="text-white text-2xl text-center pb-4">
                  If you didn{`'`}t receive an email,{" "}
                  {resendTimer ? (
                    <>please wait {resendTimer} seconds</>
                  ) : (
                    <button
                      className="hover:text-gray-400 duration-300"
                      onClick={(): void => {
                        resendEmail({
                          variables: {
                            email: getValues("email"),
                          },
                        }).catch((err) => err);
                      }}
                    >
                      click here
                    </button>
                  )}{" "}
                  to resend the verification email.
                </p>
                <p className="text-white text-2xl text-center pb-4"></p>
              </>
            ) : (
              <div className="grid grid-cols-1 lg:space-x-24 lg:grid-cols-2">
                <div className="flex justify-center hidden lg:block ">
                  <div className="flex flex-col justify-center text-left text-2xl text-center text-white bg-[#2D0745]/70 rounded-2xl lg:py-10 py-5">
                    <div className="text-left ml-7">
                      <p className="font-semibold text-7lg">
                        How Does {memoTenant} Work?
                      </p>
                    </div>
                    <div className="flex w-10/12 mx-auto my-5">
                      {signUpFlow.map((flow, index) => {
                        return (
                          <div
                            key={`${index}-signup`}
                            className="flex justify-center items-center"
                          >
                            <div className="">
                              <div className="">
                                <Image
                                  src={`/images/signup/${flow.imgPath}`}
                                  alt=""
                                  layout="fixed"
                                  width={"80%"}
                                  height={"80%"}
                                  objectFit="contain"
                                />
                              </div>
                              <p className="text-lg">{flow.text}</p>
                            </div>
                            <div>
                              {index !== signUpFlow.length - 1 && (
                                <BsCaretRightFill className="ml-5" />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-11/12 mx-auto my-5">
                      <hr></hr>
                    </div>
                    <div className="ml-7">
                      <p className="text-left font-semibold text-7lg">
                        Join our community of Novaliver
                      </p>
                    </div>
                    <div className="hidden mx-auto mt-4 space-y-4 text-base text-left lg:w-5/6 lg:block">
                      {signUpPoints.map((point, index) => {
                        return (
                          <div
                            key={`${index}-signupPoints`}
                            className="flex align-center"
                          >
                            <div className="min-w-[3rem]">
                              <img
                                alt={point.text}
                                src={`/images/signup/${point.imgPath}`}
                                className="mt-1 mx-auto"
                              />
                            </div>
                            <p className="ml-2">{point.text}</p>
                          </div>
                        );
                      })}
                    </div>
                    {/* <img
                  src="/images/auth/fourth-avatars.png"
                  alt=""
                  className="hidden w-1/2 mx-auto lg:block"
                /> */}
                  </div>
                </div>
                <div className="">
                  <p className="pb-4 text-3xl font-bold text-center text-white lg:text-4xl">
                    Create an Adult Account
                  </p>

                  <form onSubmit={handleSubmit(onSubmit as any)}>
                    <div className="grid lg:space-x-4 lg:grid-cols-2">
                      <div className="flex flex-col mt-4">
                        <label htmlFor="firstName" className="text-white">
                          First Name
                        </label>
                        <InputField
                          required
                          type="text"
                          registration={{ ...register("firstName") }}
                          error={errors.firstName as FieldError}
                          className="bg-white/25 focus:border-white text-white"
                        />
                      </div>
                      <div className="flex flex-col mt-4">
                        <label htmlFor="lastName" className="text-white">
                          Last Name
                        </label>
                        <InputField
                          required
                          type="text"
                          registration={{ ...register("lastName") }}
                          error={errors?.lastName as FieldError}
                          className="bg-white/25 focus:border-white text-white"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col mt-4">
                      <label htmlFor="email" className="text-white">
                        Email
                      </label>
                      <InputField
                        required
                        type="email"
                        registration={{ ...register("email") }}
                        error={errors?.email as FieldError}
                        className="bg-white/25 focus:border-white text-white"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label htmlFor="password" className="text-white">
                        Password
                      </label>
                      <InputField
                        required
                        type="password"
                        registration={{ ...register("password") }}
                        error={errors?.password as FieldError}
                        className="bg-white/25 focus:border-white text-white"
                      />
                    </div>
                    <div className="flex flex-col mt-4">
                      <label htmlFor="confirmPassword" className="text-white">
                        Confirm Password
                      </label>
                      <InputField
                        required
                        type="password"
                        registration={{ ...register("confirmPassword") }}
                        error={errors?.confirmPassword as FieldError}
                        className="bg-white/25 focus:border-white text-white"
                      />
                    </div>
                    <div className="py-6 flex flex-row justify-between">
                      <div className="text-left">
                        <p className="text-[#611651] text-lg font-[550]">
                          Already have an account?{" "}
                        </p>
                        <Link href="/auth/login?type=adult">
                          <p className="text-white text-xl font-semibold cursor-pointer underline">
                            Login here
                          </p>
                        </Link>
                      </div>
                      <Button type="submit" variant="green" className="w-6/12">
                        Continue
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withApollo(ParentLogin);

export const getServerSideProps = extractHostname;
