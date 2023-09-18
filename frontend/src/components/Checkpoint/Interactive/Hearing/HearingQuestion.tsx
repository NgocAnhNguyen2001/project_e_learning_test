import * as React from "react";
import { HiOutlineVolumeUp } from "react-icons/hi";

import { Button } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { deserialize } from "@/utils/slate";
import { QuestionBlock, QuestionSelection } from "schema/generated/graphql";

interface IHearingQuestion {
  block: QuestionBlock;
  selectedAnswers: QuestionSelection[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<QuestionSelection[]>>;
}

export const HearingQuestion = ({
  block,
  selectedAnswers,
  setSelectedAnswers,
}: IHearingQuestion): React.ReactElement => {
  const [audio, setAudio] = React.useState<HTMLAudioElement>();

  React.useEffect(() => {
    if (block.asset) {
      const audio = new Audio(block.asset.url);
      audio.id = "hearing-audio";
      setAudio(audio);
    }
  }, [block]);

  const play = (): void => {
    if (audio) {
      const audioElement = document.getElementById(
        "hearing-audio",
      ) as HTMLAudioElement;

      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  };

  const selectAnswer = (selection: QuestionSelection): void => {
    const exists = selectedAnswers.find((ans) => ans.id === selection.id);
    if (exists) {
      setSelectedAnswers([]);
    } else {
      setSelectedAnswers([selection]);
    }
  };
  return (
    <>
      <h1 className="text-3xl font-extrabold lg:text-4xl">{block.title}</h1>
      {audio && <div dangerouslySetInnerHTML={{ __html: audio.outerHTML }} />}
      <p className="my-6 text-base font-bold opacity-80 lg:text-lg">
        Select one answer only
      </p>
      <div className="flex flex-row items-center justify-center w-full">
        <Button onClick={play} variant="brand1" className="my-6 w-max">
          <HiOutlineVolumeUp size={48} />
        </Button>
      </div>
      {block.description && (
        <div className="flex flex-col my-6">
          {deserialize(block.description)}
        </div>
      )}
      <div className="grid gap-4 pb-32 lg:gap-6 md:grid-cols-2">
        {block.selections &&
          block.selections.map((selection, index) => (
            <Button
              className="flex flex-row items-center w-full px-4 py-4 my-2 font-extrabold cursor-pointer lg:px-6"
              variant={
                selectedAnswers.find((ans) => ans.id === selection.id)
                  ? "answer-selected"
                  : "answer"
              }
              justify="start"
              uppercase={false}
              onClick={(): void => selectAnswer(selection)}
              key={selection.id}
            >
              <div className="flex flex-row items-center">
                <Card className="px-4 py-2 mr-4" rounded="xl">
                  {index + 1}
                </Card>
                {selection.text}
              </div>
            </Button>
          ))}
      </div>
    </>
  );
};

export default HearingQuestion;
