import Link from "next/link";
import * as React from "react";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { toast } from "react-toastify";

import {
  namedOperations,
  useAcceptFriendMutation,
  useDeclineFriendMutation,
} from "schema/generated/graphql";

import { Feedback } from "../Feedback";

interface IFriendRequestProps {
  friend: any;
  className: string;
}

export const FriendRequest = ({
  friend,
  className,
}: IFriendRequestProps): React.ReactElement => {
  const [acceptFriend] = useAcceptFriendMutation();
  const [declineFriend] = useDeclineFriendMutation();

  const acceptFriendRequest = async (): Promise<void> => {
    try {
      await acceptFriend({
        variables: {
          id: friend.id as string,
        },
        refetchQueries: [namedOperations.Query.listFriends],
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Friend request accepted"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to accept friend request"
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

  const declineFriendRequest = async (): Promise<void> => {
    try {
      await declineFriend({
        variables: {
          id: friend.id as string,
        },
        refetchQueries: [namedOperations.Query.listFriends],
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Friend request declined"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e) {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Unable to decline friend request"
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

  return (
    <>
      <div className={`flex flex-row items-center ${className}`}>
        <div className="flex items-center w-1/6 mr-4 overflow-hidden border-2 border-gray-300 rounded-full aspect-square">
          <img
            src={
              friend.avatarImage
                ? friend.avatarImage.url
                : "/images/common/default.png"
            }
            alt="avatar"
          />
        </div>
        <div className="flex flex-row items-center justify-between w-full cursor-pointer">
          <Link passHref href={`/student/profile/${friend.id}`}>
            <div className="flex flex-col">
              <h1 className="mb-2 text-sm font-extrabold lg:text-base">
                {friend.user.firstName}
              </h1>
              <div className="flex flex-row items-center pb-3">
                <img
                  src="/images/profile/pirate-club.svg"
                  alt=""
                  className="mr-3"
                />
                <p className="text-sm opacity-80 lg:text-base">Pirate Club</p>
              </div>
            </div>
          </Link>
          <div className="flex flex-col">
            <div role="none" onClick={acceptFriendRequest} className="mb-2">
              <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold uppercase text-brand1 lg:text-base">
                <HiUserAdd size={24} className="mr-3" />
                Accept
              </button>
            </div>
            <div role="none" onClick={declineFriendRequest}>
              <button className="flex flex-row items-center justify-center font-sans text-sm font-extrabold text-red-500 uppercase lg:text-base">
                <HiUserRemove size={24} className="mr-3" />
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendRequest;
