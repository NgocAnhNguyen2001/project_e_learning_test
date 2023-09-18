import React from "react";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import { ChallengeBlock } from "../Checkpoint/ChallengeBlock";
import { FindManyChallengesQuery } from "schema/generated/graphql";
import autoAnimate from "@formkit/auto-animate";

type Props = {
  journalTab: "WORKS" | "FAVOURITES";
  challenges: FindManyChallengesQuery | undefined;
  checkAlreadyLiked: (id: string) => boolean;
  setJournalTab: (value: "WORKS" | "FAVOURITES") => void;
  setDisplayTab: (value: "MAIN" | "FRIENDS" | "JOURNAL" | "COURSES") => void;
};

export const JournalSection: React.FC<Props> = (props) => {
  const {
    journalTab,
    challenges,
    checkAlreadyLiked,
    setJournalTab,
    setDisplayTab,
  } = props;

  const [showMore, setShowMore] = React.useState(false);
  const journalRef = React.useRef(null);

  React.useEffect(() => {
    journalRef.current && autoAnimate(journalRef.current);
  }, [journalRef]);

  // const getPagination = () => {
  //   const arr: React.ReactElement[] = [];
  //   for (let i = 0; i < (challenges?.findChallenges?.length ?? 0) - 1; ++i) {
  //     arr.push(
  //       <div
  //         className={`${
  //           journalIndex == i ? "bg-[#B632D5]" : "bg-[#FFFFFF]/60"
  //         } h-2 w-full rounded cursor-pointer`}
  //         onClick={(): void => setJournalIndex(i)}
  //       />,
  //     );
  //   }

  //   return <div className="flex flex-row gap-x-3 w-full">{arr}</div>;
  // };

  return (
    <div className="w-full p-4 ">
      <div
        className="flex flex-row mb-10 cursor-pointer"
        onClick={(): void => {
          setJournalTab("WORKS");
          setShowMore(false);
          setDisplayTab("MAIN");
        }}
      >
        <HiChevronLeft className="w-8 h-8 text-white" />
        <p className="text-white text-3xl font-bold">My Journal</p>
      </div>
      <div className="mb-10">
        <div className="flex flex-row w-full text-center">
          <div
            className={`border-b-2 ${
              journalTab != "WORKS" ? "border-white/60" : "border-white"
            } w-full`}
          >
            <p
              className={`${
                journalTab != "WORKS" ? "text-white/60" : "text-white"
              } text-2xl font-bold cursor-pointer`}
              onClick={(): void => {
                setJournalTab("WORKS");
                setShowMore(false);
              }}
            >
              MY WORKS
            </p>
          </div>
          <div
            className={`border-b-2 ${
              journalTab != "FAVOURITES" ? "border-white/60" : "border-white"
            } w-full`}
            onClick={(): void => {
              setJournalTab("FAVOURITES");
              setShowMore(false);
            }}
          >
            <p
              className={`${
                journalTab != "FAVOURITES" ? "text-white/60" : "text-white"
              } text-2xl font-bold cursor-pointer`}
            >
              MY FAVOURITES
            </p>
          </div>
        </div>
      </div>
      {(challenges?.findChallenges?.length ?? 0) > 0 ? (
        <div className="flex flex-row gap-x-2 justify-center items-center mb-10">
          {/* <div>
            <Button
              variant="brand1"
              size="xs"
              disabled={journalIndex == 0}
              onClick={() => {
                if (journalIndex != 0) setJournalIndex(journalIndex - 1);
              }}
            >
              <HiChevronLeft className="w-8 h-8 text-white mr-2" />
            </Button>
          </div> */}
          <div className="space-y-8 w-full">
            <div
              className={`grid items-center justify-center grid-cols-2 gap-x-4 gap-y-6 rounded-lg`}
              ref={journalRef}
            >
              {challenges?.findChallenges?.map((challenge, index) => {
                if (
                  challenge.asset.fileType != "VIDEO" &&
                  (index < 2 || showMore)
                )
                  return (
                    <div key={challenge.assetId}>
                      <ChallengeBlock
                        index={index}
                        submission={challenge}
                        checkAlreadyLiked={checkAlreadyLiked}
                        likes={challenge._count.likes}
                      />
                    </div>
                  );
              })}
            </div>
            {!showMore && (challenges?.findChallenges.length ?? 0) > 2 && (
              <div
                className="flex flex-row items-center justify-center cursor-pointer"
                onClick={(): void => {
                  setShowMore(true);
                }}
              >
                <p className="text-white font-semibold">SHOW MORE</p>
                <HiChevronDown className="w-10 h-10 text-white cursor-pointer" />
              </div>
            )}
            {/* <div>{getPagination()}</div> */}
          </div>
          {/* <Button
            variant="brand1"
            size="xs"
            disabled={
              challenges?.findChallenges &&
              challenges?.findChallenges.length > 0 &&
              journalIndex == challenges?.findChallenges?.length - 2
            }
            onClick={() => {
              if (
                challenges?.findChallenges &&
                journalIndex != challenges?.findChallenges?.length - 1
              )
                setJournalIndex(journalIndex + 1);
            }}
          >
            <HiChevronRight className="w-8 h-8 text-white ml-2" />
          </Button> */}
        </div>
      ) : (
        <div className="flex justify-center items-center h-12">
          <p className="text-2xl font-semibold text-white">
            No journals {journalTab == "WORKS" ? "posted" : "liked"}
          </p>
        </div>
      )}
    </div>
  );
};
