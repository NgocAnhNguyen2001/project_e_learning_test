import { ApolloError } from "@apollo/client";
import enUS from "date-fns/esm/locale/en-US";
import React from "react";
import { App as SendBirdApp } from "sendbird-uikit";

import { useListFriendsQuery } from "schema/generated/graphql";

const myColorSet = {
  "--sendbird-dark-primary-500": "#1CB0F6",
  "--sendbird-dark-primary-400": "#43BEF8",
  "--sendbird-dark-primary-300": "#6ACBF9",
  "--sendbird-dark-primary-200": "#1CB0F6",
  "--sendbird-dark-primary-100": "#B9E7FC",
  "--sendbird-dark-background-400": "rgba(255,255,255, 0.3)",
  "--sendbird-dark-background-500": "rgba(11, 5, 23, 0.8)",
  "--sendbird-dark-background-600": "none",
  "--sendbird-dark-background-700": "rgba(11, 5, 23, 0.6)",
};

interface ChatUser {
  userId: string;
  profileUrl: string;
  nickname: string;
}

class CustomUserPaginatedQuery {
  users: ChatUser[];
  error?: ApolloError;
  hasNext: boolean;
  constructor(users: ChatUser[], error?: ApolloError) {
    // Required public property to determine if more data is available.
    this.hasNext = false;
    this.users = users;
    this.error = error;
  }

  // Required public property
  next(callback: any): void {
    // Doesnt do anything
    this.hasNext = false;
    callback(this.users, this.error);
  }
}

interface Props {
  theme?: "light" | "dark";
  userId: string;
  nickname: string;
  profileUrl?: string;
}

const SendbirdChat = ({
  nickname,
  userId,
  theme,
  profileUrl,
}: Props): React.ReactElement => {
  const { data: userQuery, error } = useListFriendsQuery();
  const [users, setUsers] = React.useState<ChatUser[]>();

  React.useEffect(() => {
    if (userQuery && userQuery.findAllFriends) {
      // Returns the list of users
      const users: ChatUser[] = userQuery.findAllFriends.map((user: any) => {
        if (user.requestee.id === userId) {
          return {
            userId: user.requester.id,
            profileUrl: user.requester.id,
            nickname: user.requester.username,
          };
        }
        return {
          userId: user.requestee.id,
          profileUrl: user.requestee.id,
          nickname: user.requestee.username,
        };
      });
      setUsers(users);
    }
  }, [userQuery, userId]);

  return users ? (
    <SendBirdApp
      colorSet={myColorSet}
      appId={"40F27C47-9098-4805-8233-DF2D1F766CDB"} // Specify your Sendbird application ID.
      userId={userId} // Specify your user ID.
      nickname={nickname}
      userListQuery={(): CustomUserPaginatedQuery =>
        new CustomUserPaginatedQuery(users, error)
      }
      theme={theme}
      profileUrl={profileUrl}
      dateLocale={enUS}
    />
  ) : (
    <></>
  );
};

export default SendbirdChat;
