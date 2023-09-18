import {
  AnswerQuantityType,
  AnswerType,
  BlockGeneralType,
  QuizType,
} from "schema/generated/graphql";

export type Subtitles = {
  id?: string | number;
  videoId?: string | number;
  language?: string;
  url?: string;
  fileUpload?: File | null;
};

type Asset = {
  id: string;
  name: string;
  url: string;
  Subtitles: Subtitles[];
};

export type Blocks = {
  id: string | number;
  text?: string;
  assetId?: string;
  mediaAssetId?: string;
  order: number;
  blockType?: BlockGeneralType;
  title?: string;
  quizType?: QuizType;
  description?: string;
  selections?: {
    asset?: Asset;
    id: string | number;
    isCorrect: boolean;
    text: string;
    file?: File;
    order?: number;
  }[];
  answerType?: AnswerType;
  answerQuantityType?: AnswerQuantityType;
  pairs?: {
    id: string | number;
    pair: string[];
    assetId?: string;
    isImage: boolean;
    img?: string;
    asset?: Asset;
  }[];
  file?: File;
  subtitles?: Subtitles[];
  mediaBlock?: {
    asset: Asset;
  };
  attachmentBlock?: {
    asset: Asset;
    text?: string;
  };
  questionBlock?: {
    asset?: Asset;
    description?: string;
  };
  questions?: number;
};
