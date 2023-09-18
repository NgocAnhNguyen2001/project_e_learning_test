import { format } from "date-fns";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";

import { Feedback } from "@/components/Feedback";
import { Child } from "@/types/Child";
import {
  useLoginStudentMutation,
  useMeLazyQuery,
} from "schema/generated/graphql";
import { useResultCallback } from "utils/hooks/useResultCallback";
import { useStore } from "utils/hooks/zustand";

import { Button, Dialog } from "../Elements";
// import { PatternDisplay } from "../Form/PatternDisplay";

interface IChildDetailProps {
  child: any;
}

export const ChildDetail = (props: IChildDetailProps): React.ReactElement => {
  const [getMe, meResponse] = useMeLazyQuery();
  const [login, response] = useLoginStudentMutation();
  const setLogin = useStore((state) => state.login);
  const setUser = useStore((state) => state.setMe);
  const setLoading = useStore((state) => state.setLoading);
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();

  const loginAsChild = async (child: Child): Promise<void> => {
    try {
      await login({
        variables: {
          data: {
            username: child.username,
            loginPattern: child.loginPattern,
          },
        },
      });
    } catch (e: any) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Login failed"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  };

  useResultCallback(
    response,
    () => {
      getMe();
    },
    () => {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Login failed"
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
    meResponse,
    (res) => {
      if (response.data?.loginStudent) {
        setUser(res);
        setLogin(response.data?.loginStudent);
        setLoading(false);
        router.push(
          `/auth/login?accessToken=${encodeURIComponent(
            response.data?.loginStudent.accessToken,
          )}`,
        );
      }
    },
    () => {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Login failed"
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

  return (
    <div className="grid grid-cols-3 p-8">
      <div className="col-span-3 lg:col-span-2">
        <div className="flex flex-col lg:flex-row">
          <div className="flex items-center w-32 h-32 mb-6 mr-6 overflow-hidden border-2 border-gray-300 rounded-full aspect-square">
            <img
              src={props.child.avatarImage?.url ?? "/images/common/default.png"}
              alt=""
            />
          </div>
          <div className="flex flex-col">
            <p className="pb-4 text-2xl font-bold">
              {props.child.user.firstName}
            </p>
            <div className="pb-2">
              <p className="opacity-80">Full Name</p>
              <p className="text-lg lg:text-xl">
                {props.child.user.firstName} {props.child.user.lastName}
              </p>
            </div>
            <div className="pb-2">
              <p className="opacity-80">Birthday</p>
              <p className="text-lg lg:text-xl">
                {format(new Date(props.child.birthDate), "d MMM yyyy")}
              </p>
            </div>
            <div className="pb-2">
              <p className="opacity-80">Username</p>
              <p className="text-lg lg:text-xl">{props.child.username}</p>
            </div>
            <div className="pb-2">
              <p className="opacity-80">Password</p>
              <p className="text-lg lg:text-xl">{props.child.loginPattern}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center col-span-3 mt-0 lg:col-span-1 lg:mt-4">
        <Button
          className="w-full mb-2 tour_11"
          variant="brand1"
          size="sm"
          onClick={(): void => setIsOpen(true)}
        >
          Sign In To Account
        </Button>
        <Button
          className="w-full mb-2"
          variant="green"
          size="sm"
          onClick={(): Promise<boolean> =>
            router.push(`${router.asPath}/${props.child.id}`)
          }
        >
          Edit Account
        </Button>
        {/* <Button className="w-full mb-2" size="sm" variant="green">
          Top Up Now
        </Button>
        <p className="text-2xl font-bold text-red-400">999,999 LEFT</p> */}
      </div>
      <Dialog isOpen={isOpen} onClose={(): void => setIsOpen(false)}>
        <div className="px-2 py-4">
          <h1 className="mb-4 text-2xl font-extrabold">
            Sign In To Children Account?
          </h1>

          <p className="my-6 text-lg">
            Signing in to your children will instantly log you out and log you
            back in as your child. Continue?
          </p>

          <div className="flex flex-col lg:flex-row">
            <Button
              variant="brand1"
              className="w-full my-2 lg:mr-2"
              size="sm"
              onClick={(): Promise<void> => loginAsChild(props.child)}
            >
              Continue
            </Button>
            <Button
              variant="primary"
              className="w-full my-2 lg:ml-2"
              size="sm"
              onClick={(): void => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ChildDetail;
