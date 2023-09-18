import Link from "next/link";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoCloseOutline, IoRocketOutline } from "react-icons/io5";

interface ReplyFieldProps {
  avatarImage: string;
  parentPostId?: string;
  replyUser?: string;
  replyUserId?: string;
  replyMessage?: string;
  isSubcomment?: boolean;
  placeholder: string;
  registration?: Partial<UseFormRegisterReturn>;
}

const ReplyField = ({
  avatarImage,
  parentPostId,
  replyUser,
  replyUserId,
  replyMessage,
  isSubcomment = false,
  placeholder,
  registration,
}: ReplyFieldProps): React.ReactElement => {
  return (
    <div className="border border-white rounded-lg p-4 space-y-4">
      {isSubcomment && (
        <div className="rounded-lg p-4 bg-[#2D0745]/70 space-y-4">
          <div className="flex space-x-4 items-center">
            <img
              src="/images/clubs/reply.png"
              alt="Message icon"
              className="w-6"
            />
            <p className="text-white text-xs w-full">
              Replying to{" "}
              <Link href={`/student/profile/${replyUserId}`}>
                <span className="underline cursor-pointer">{replyUser}</span>
              </Link>
            </p>
            <Link href={`/student/clubs/${parentPostId}`}>
              <IoCloseOutline
                size={24}
                color="white"
                className="cursor-pointer"
              />
            </Link>
          </div>
          <div>
            <p className="italic text-xs text-white/60 flex flex-row">
              <Link href={`/student/profile/${replyUserId}`}>
                <p className="cursor-pointer">@{replyUser}</p>
              </Link>{" "}
              {`: ${replyMessage}`}
            </p>
          </div>
        </div>
      )}
      <div className="flex items-center">
        <div className="w-8 overflow-hidden rounded-full aspect-square border border-white items-center">
          <img
            src={avatarImage ? avatarImage : "/images/common/default.png"}
            alt="Avatar profile"
            className=""
          />
        </div>
        <input
          className="pl-4 text-sm w-full text-white bg-transparent border-0 placeholder:text-[#D9D9D9] active:border-0 hover:active:focus:bg-transparent"
          placeholder={placeholder}
          type={"text"}
          autoComplete="off"
          {...registration}
        />
        <button type="submit">
          <IoRocketOutline size={28} color="#D9D9D9" />
        </button>
      </div>
    </div>
  );
};

export default ReplyField;
