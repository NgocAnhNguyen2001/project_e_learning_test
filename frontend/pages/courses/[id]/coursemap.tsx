import { Disclosure } from "@headlessui/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { HiChevronUp } from "react-icons/hi";
import { Element, scroller } from "react-scroll";

import CheckpointSpaceView from "@/components/Course/Checkpoint/CheckpointSpaceView";
import CourseThumbnail from "@/components/Course/CourseThumbnail/CourseThumbnail";
import { Card } from "@/components/Elements/Card";
import Section from "@/components/Elements/Section";
import { AppLayout } from "@/components/Layout";
import { Role } from "@/types/Auth";
import { ExtendedEnrolledState } from "@/types/ExtendedEnrolledState";
import { sortAscending } from "@/utils/sorting";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import {
  EnrolledState,
  useCoursemapPreviewLazyQuery,
  useEnrolledCourseProgressLazyQuery,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";

const PreviewCoursemap = ({ hostname }: Props): React.ReactElement => {
  // ============HOOKS
  const router = useRouter();
  const user = useStore((state) => state.user);
  const scrollRef = useStore((state) => state.scroll);
  const setScrollRef = useStore((state) => state.setScrollRef);

  const [checkpoints, setCheckpoints] = React.useState<any>([]);
  const [checkpointList, setCheckpointList] = React.useState<any>([]);
  const [course, setCourse] = React.useState<any>();

  const [getCourse, courseResponse] = useEnrolledCourseProgressLazyQuery();
  const [getCoursePreview, coursePreviewResponse] =
    useCoursemapPreviewLazyQuery();
  // ============EFFECTS
  React.useEffect(() => {
    if (
      courseResponse.data &&
      courseResponse.data.course &&
      courseResponse.data.enrolledCourse
    ) {
      setCourse(courseResponse.data.course);
      if (
        courseResponse.data.course.checkpoints &&
        courseResponse.data.enrolledCourse.checkpoints
      ) {
        // Here we merge checkpoints with their statuses
        const temp: any[] = [...courseResponse.data.course.checkpoints];
        for (let i = 0; i < temp.length; i++) {
          temp[i] = hasProgress(temp[i]);
          if (temp[i] && temp[i].subCheckpoints.length > 0) {
            const tempSubcheckpoints: any[] = [...temp[i].subCheckpoints];
            for (let j = 0; j < tempSubcheckpoints.length; j++) {
              tempSubcheckpoints[j] = hasProgress(tempSubcheckpoints[j]);
            }
            temp[i].subCheckpoints = tempSubcheckpoints;
          }
        }
        // After we merge, we need to add some parsing to check if we need to add a 'BLUE' TO_START state
        const hasIncomplete = temp.find(
          (checkpoint) => checkpoint.state === EnrolledState.Incomplete,
        );
        temp.sort(sortAscending);

        // We loop through all the parent checkpoints
        for (let i = 0; i < temp.length; i++) {
          // If there are no checkpoints in progress AND there are checkpoints that are not started,
          // We make it TO_START
          if (!hasIncomplete && temp[i].state === EnrolledState.NotStarted) {
            temp[i].state = ExtendedEnrolledState.ToStart;
            break;
          }

          // Whether or not we set a parent checkpoint to TO_START, we need to check if they have subcheckpoints
          // However, only checkpoints that are COMPLETED will have subcheckpoints highlighted
          // The next subcheckpoint should be highlighted blue as well (if there are no incomplete)
          if (
            temp[i].state === EnrolledState.Complete &&
            i > 0 &&
            temp[i].subCheckpoints
          ) {
            const hasIncomplete = temp[i].subCheckpoints.find(
              (checkpoint: any) =>
                checkpoint.state === EnrolledState.Incomplete,
            );
            if (!hasIncomplete) {
              const tempSubcheckpoints = [
                ...temp[i].subCheckpoints.sort(sortAscending),
              ];
              for (let j = 0; j < tempSubcheckpoints.length; j++) {
                if (tempSubcheckpoints[j].state === EnrolledState.NotStarted) {
                  tempSubcheckpoints[j].state = ExtendedEnrolledState.ToStart;
                  break;
                }
              }
              temp[i].subCheckpoints = tempSubcheckpoints;
            }
          }
        }
        const descending = [...temp];
        setCheckpoints(descending.sort(sortAscending));
        setCheckpointList(temp.sort(sortAscending));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseResponse.data]);

  React.useEffect(() => {
    if (coursePreviewResponse.data && coursePreviewResponse.data.course) {
      setCourse(coursePreviewResponse.data.course);
      if (coursePreviewResponse.data.course.checkpoints) {
        // Here we merge checkpoints with their statuses
        const temp: any[] = [...coursePreviewResponse.data.course.checkpoints];
        for (let i = 0; i < temp.length; i++) {
          temp[i] = {
            ...temp[i],
            state: EnrolledState.Incomplete,
          };
          if (temp[i] && temp[i].subCheckpoints.length > 0) {
            const tempSubcheckpoints: any[] = [...temp[i].subCheckpoints];
            for (let j = 0; j < tempSubcheckpoints.length; j++) {
              tempSubcheckpoints[j] = {
                ...tempSubcheckpoints[j],
                state: EnrolledState.Incomplete,
              };
            }
            temp[i].subCheckpoints = tempSubcheckpoints;
          }
        }

        temp.sort(sortAscending);
        const descending = [...temp];
        setCheckpoints(descending.sort(sortAscending));
        setCheckpointList(temp.sort(sortAscending));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coursePreviewResponse.data]);

  React.useEffect(() => {
    if (router.query && router.query.id) {
      if (user?.role === Role.Student) {
        getCourse({
          variables: {
            id: router.query.id as string,
          },
        });
      } else {
        getCoursePreview({
          variables: {
            id: router.query.id as string,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, getCourse]);

  React.useEffect(() => {
    if (scrollRef && checkpoints && courseResponse) {
      setTimeout(() => {
        scroller.scrollTo(scrollRef, {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuart",
        });
        setScrollRef("");
      }, 200);
    }
  }, [scrollRef, setScrollRef, checkpoints, courseResponse]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);
  // ============FUNCTIONS
  const hasProgress = (checkpoint: any): any => {
    // Checks if this checkpoint exists in the enrolledCheckpoint array
    const enrolledCheckpoint =
      courseResponse.data?.enrolledCourse?.checkpoints?.find(
        (el: any) => el.checkpointId === checkpoint.id,
      );
    if (enrolledCheckpoint) {
      return {
        ...checkpoint,
        state: enrolledCheckpoint.state,
      };
    }
    return {
      ...checkpoint,
      state: EnrolledState.NotStarted,
    };
  };

  // ============VIEWS
  return (
    <AppLayout hostname={hostname} darkLayout>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative z-10 flex min-h-screen">
        <Section size="2xl">
          {/* <a
            className="flex items-center col-span-2 px-6 cursor-pointer group mb-11 lg:px-8 w-max"
            onClick={(): void => {
              router.push(`/student/courses/${router.query.id}`);
            }}
            role="none"
          >
            <Button
              className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
              size="sm"
              variant="secondary"
            >
              <HiChevronLeft size={16} />
            </Button>
            <p className="text-white uppercase">Back to course details</p>
          </a> */}

          {/* Content */}
          {course ? (
            <div className="relative grid grid-cols-12 gap-y-6">
              <div className="flex flex-col col-span-12 pt-12 lg:col-span-9">
                <div className="flex flex-col items-center lg:flex-row">
                  <CourseThumbnail preview={course.thumbnail?.url} />
                  <p className="mt-4 text-2xl font-extrabold text-white lg:text-xl lg:mt-0">
                    {course.title}
                  </p>
                </div>
                <div className="flex items-center h-full px-2 pb-8 overflow-x-auto max-w-screen lg:px-8">
                  <div
                    className="grid m-auto mt-16 lg:mt-28"
                    data-tut="reactour__5"
                  >
                    {checkpoints.map((c: any, index: number, array: any[]) => (
                      <Element name={c.id} key={c.id + "div"}>
                        <div className="grid max-w-screen-lg grid-flow-col w-max">
                          <CheckpointSpaceView
                            {...{
                              key: c.id,
                              text: c.title,
                              data: c,
                              state: c.state,
                              parentConnectedState:
                                index - 1 >= 0
                                  ? array[index].state
                                  : EnrolledState.NotStarted,
                              childConnectedState:
                                c.subCheckpoints && c.subCheckpoints.length > 0
                                  ? c.subCheckpoints.sort(sortAscending)[0]
                                      .state
                                  : EnrolledState.NotStarted,
                            }}
                          />
                          {c.subCheckpoints ? (
                            <>
                              {[...c.subCheckpoints]
                                .sort(sortAscending)
                                .map(
                                  (sub: any, index: number, array: any[]) => (
                                    <Element name={sub.id} key={sub.id + "div"}>
                                      <CheckpointSpaceView
                                        {...{
                                          key: sub.id,
                                          text: sub.title,
                                          data: sub,
                                          subCheckpointsLength:
                                            c._count.subCheckpoints,
                                          state: sub.state,
                                          childConnectedState:
                                            index + 1 < array.length
                                              ? array[index + 1].state
                                              : EnrolledState.NotStarted,
                                        }}
                                      />
                                    </Element>
                                  ),
                                )}
                            </>
                          ) : null}
                        </div>
                      </Element>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid w-full col-span-12 gap-x-6 lg:col-span-3 lg:max-w-sm xl:max-w-md">
                {/* <Card className="flex flex-col items-center justify-center w-full col-span-1 p-6 mb-6 lg:col-span-2">
                  <p className="mb-5 text-xl font-bold text-white lg:text-2xl">
                    Total Course Rewards
                  </p>
                  <Card className="w-full px-4 py-3 mb-5 text-white">
                    <div className="flex flex-row">
                      <img
                        src="/images/course/information/rewards.png"
                        alt=""
                        className="w-12 max-w-3xl mr-4"
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row items-center justify-between w-full">
                          <p className="text-lg font-extrabold lg:text-xl">
                            3,600
                          </p>
                          <p className="text-xs font-bold">+21.5%</p>
                        </div>
                        <Progressbar percent={80} customColor="#C042F1" />
                      </div>
                    </div>
                  </Card>
                  <Card className="w-full px-4 py-3 text-white">
                    <div className="flex flex-row">
                      <img
                        src="/images/common/coin.svg"
                        alt=""
                        className="w-12 max-w-3xl mr-4"
                      />
                      <div className="flex flex-col items-start justify-start w-full">
                        <p className="text-lg font-extrabold lg:text-xl">
                          8,888,888
                        </p>
                        <p className="text-xs font-bold opacity-60">Coin</p>
                      </div>
                    </div>
                  </Card>
                </Card> */}
                <div className="relative w-full h-full col-span-1 lg:col-span-2">
                  <div
                    className="flex max-h-screen pt-4 lg:top-0 lg:sticky"
                    data-tut="reactour__6"
                  >
                    <Card className="z-20 flex flex-col w-full p-6 bg-opacity-50 bg-dark-overlay lg:overflow-y-auto">
                      <Disclosure as="div" defaultOpen>
                        {({ open }): any => (
                          <>
                            <Disclosure.Button
                              className="flex items-start justify-between text-xl font-extrabold text-white lg:text-2xl"
                              as="div"
                            >
                              Checkpoints
                              <HiChevronUp
                                className={`${
                                  open ? "transform rotate-180" : ""
                                } w-8 h-8 text-gray-300`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 mt-6 font-bold text-white border-l-2 border-l-gray-400">
                              <ul className="leading-loose list-none">
                                {checkpointList.map((checkpoint: any) => (
                                  <div
                                    key={checkpoint.id + "div"}
                                    // href={`#${checkpoint.id}`}
                                  >
                                    <ul
                                      // key={checkpoint.id + "div"}
                                      className="mb-2 font-bold"
                                    >
                                      <li
                                        key={checkpoint.id}
                                        className={clsx(
                                          checkpoint.state ===
                                            EnrolledState.NotStarted
                                            ? "opacity-30"
                                            : checkpoint.state ===
                                                EnrolledState.Incomplete ||
                                              checkpoint.state ===
                                                ExtendedEnrolledState.ToStart
                                            ? "text-brand1"
                                            : "text-green-500",
                                          "cursor-pointer",
                                        )}
                                        role="none"
                                        onClick={(): void =>
                                          setScrollRef(checkpoint.id)
                                        }
                                      >
                                        {checkpoint.title}
                                      </li>
                                      {checkpoint.subCheckpoints ? (
                                        <>
                                          {[...checkpoint.subCheckpoints]
                                            .sort(sortAscending)
                                            .map((sub: any) => (
                                              <li
                                                key={sub.id}
                                                className={clsx(
                                                  "border-l-2 border-l-gray-400 px-4 cursor-pointer",
                                                  sub.state ===
                                                    EnrolledState.NotStarted
                                                    ? "opacity-30"
                                                    : sub.state ===
                                                        EnrolledState.Incomplete ||
                                                      sub.state ===
                                                        ExtendedEnrolledState.ToStart
                                                    ? "text-brand1"
                                                    : "text-green-500",
                                                )}
                                                role="none"
                                                onClick={(): void =>
                                                  setScrollRef(sub.id)
                                                }
                                              >
                                                {sub.title}
                                              </li>
                                            ))}
                                        </>
                                      ) : null}
                                    </ul>
                                  </div>
                                ))}
                              </ul>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Section>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(PreviewCoursemap));

export const getServerSideProps = extractHostname;
