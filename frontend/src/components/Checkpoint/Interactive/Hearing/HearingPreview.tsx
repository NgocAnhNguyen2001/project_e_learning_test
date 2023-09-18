import * as React from "react";
import { HiOutlineVolumeUp } from "react-icons/hi";


import { Button } from "@/components/Elements";
import { Card } from "@/components/Elements/Card";
import { deserialize } from "@/utils/slate";
import { QuestionBlock } from "schema/generated/graphql";

interface IHearingPreview {
  block: QuestionBlock;
}

export const HearingPreview = ({
  block,
}: IHearingPreview): React.ReactElement => {
  const [audio, setAudio] = React.useState<HTMLAudioElement>();
  const blockFile = (block as any).file;

  const play = (): void => {
    if (audio) {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  React.useEffect(() => {
    if (blockFile) {
      const url = URL.createObjectURL(blockFile);
      const audio = new Audio(url);
      setAudio(audio);
    }
  }, [blockFile]);
  return (
    <>
      <h1 className="text-xl font-extrabold lg:text-2xl">
        {block.title}
      </h1>
      <p className="my-6 text-base font-bold opacity-80 lg:text-lg">
        Select one answer only
      </p>
      <div className="flex flex-row items-center justify-center w-full">
        <Button onClick={play} variant="brand1" className="my-6 w-max">
          <HiOutlineVolumeUp size={48} />
        </Button>
      </div>
      {block.description && (
        <div className="my-6 flex flex-col">{deserialize(block.description)}</div>
      )}
      <div className="flex flex-col">
        {block.selections &&
          block.selections.map((selection, index) => (
            <Button
              className="flex flex-row items-center w-full my-1 font-extrabold cursor-pointer"
              variant="answer"
              justify="start"
              size="sm"
              uppercase={false}
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

export default HearingPreview;
