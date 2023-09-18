import React from "react";
import {
  RiFlagLine,
  RiQuestionLine,
  RiStarLine,
  RiSwordLine,
  RiYoutubeLine,
} from "react-icons/ri";

import {
  TopicType,
} from "schema/generated/graphql";

export const formatIcon = (type: TopicType): React.ReactElement => {
  switch (type) {
    case TopicType.Introduction:
      return <RiFlagLine size={32} color="white" />;
    case TopicType.Lesson:
      return <RiYoutubeLine size={32} color="white" />;
    case TopicType.Challenge:
      return <RiSwordLine size={32} color="white" />;
    case TopicType.Quiz:
      return <RiQuestionLine size={32} color="white" />;
    case TopicType.End:
      return <RiStarLine size={32} color="white" />;
  }
  return <></>;
};
