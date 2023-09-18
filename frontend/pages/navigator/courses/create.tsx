import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";
import { toast } from "react-toastify";
import * as z from "zod";
import capitalize from "lodash/toUpper";

import { CourseCardProps } from "@/components/Course/CourseCard";
import { Button, Dialog } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { InputField, SelectField } from "@/components/Form";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { SlateField } from "@/components/Form/SlateField";
import { LightBackground } from "@/components/Layout/LightBackground";
import { ParentTooltip, ParentArrowTooltip } from "@/components/Onboard";
import { DifficultyOptions } from "@/types/CourseDifficulty";
import {
  CourseAssetType,
  useCategoriesQuery,
  useCreateCourseMutation,
  useUploadCourseAssetMutation,
  useUpdateUserOnboardedMutation,
  Category,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { extractHostname, getTenant, Props } from "@/utils/tenant";
import { useStore } from "utils/hooks/zustand";

const schema = z.object({
  title: z.string().nonempty(),
  description: z.string(),
  duration: z.number().optional(),
  difficulty: z.enum(["ADVANCED", "BEGINNER", "INTERMEDIATE"]),
  category: z.string(),
  thumbnail: z.optional(z.any()),
});

const Create = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [teacher, setTeacher] = React.useState<any>();
  const [preview, setPreview] = React.useState<string>();
  const [create, response] = useCreateCourseMutation();
  const [uploadAsset] = useUploadCourseAssetMutation();
  const { data } = useCategoriesQuery();
  const [categoryOptions, setCategoryOptions] = React.useState<any>([]);
  const setUser = useStore((state) => state.setMe);
  const tourOpen = useStore((state) => state.onboarding);
  const setTourOpen = useStore((state) => state.setOnboarding);
  const [steps, setSteps] = React.useState<Step[]>([]);
  const [tourStep, setTourStep] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    register,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const title = watch("title");
  // const description = watch("description");
  const difficulty = watch("difficulty");
  const category = watch("category");

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  const createCourse = async (data: any): Promise<void> => {
    try {
      const payload = {
        description: data.description,
        level: data.difficulty,
        title: data.title,
        category: {
          connect: {
            name: data.category,
          },
        },
      };

      if (data.thumbnail && typeof data.thumbnail === "object") {
        const thumbnail = await uploadAsset({
          variables: {
            courseAssetType: CourseAssetType.Thumbnail,
            file: data.thumbnail,
          },
        });
        Object.assign(payload, {
          thumbnail: thumbnail.data?.uploadCourseAsset.id,
        });
      }

      await create({
        variables: {
          data: payload,
        },
      });
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Failed to create course"
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

  React.useEffect(() => {
    const id = response.data?.createCourse.id;
    if (response && id) {
      router.push(`/navigator/courses/${id}/details`);
    }
  }, [response, router]);

  React.useEffect(() => {
    if (user && user.teacher) {
      setTeacher(user.teacher);
    }
  }, [user, setTeacher]);

  React.useEffect(() => {
    if (data) {
      const temp = Array.from(data.categories);
      setCategoryOptions(
        temp
          .filter(
            (category) =>
              memoTenant.courseCategories.includes("ALL") ||
              memoTenant.courseCategories.includes(capitalize(category.name)),
          )
          .sort((a: any, b: any) => a.name.localeCompare(b.name))
          .map((category) => {
            return {
              label:
                memoTenant.courseCategoriesReplacment?.[
                  capitalize(category.name) as "ART" | "TECH"
                ]?.name ?? category.name,
              value: category.name,
            };
          }),
      );
    }
  }, [data]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (tourOpen) {
      setSteps([
        {
          //0
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>Upload a thumbnail image for your course here.</p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    setTourStep(1);
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "right",
          target: ".navigator_tour_6",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //1
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>Fill in the course name. *required</p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    setTourStep(2);
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "right",
          target: ".navigator_tour_7",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //2
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Select the dificulty level and category of the course.
                  *required
                </p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    setTourStep(3);
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "right",
          target: ".navigator_tour_8",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //3
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>Write a short description of the course.</p>
                <p>
                  Eg. What is this course about? What will students learn from
                  the course?
                </p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    setTourStep(4);
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "right",
          target: ".navigator_tour_9",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //4
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>This is the preview of your course on the course catelog.</p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
                <button
                  onClick={(): void => {
                    setTourStep(5);
                  }}
                  className="flex items-center font-bold"
                >
                  <p>Continue</p>
                  <HiChevronRight size={16} />
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "bottom-start",
          target: ".navigator_tour_10",
          disableBeacon: true,
          spotlightClicks: true,
        },
        {
          //4
          content: (
            <div className="w-64 lg:w-80">
              <div className="space-y-4 font-semibold">
                <p>
                  Click here once all the information are filled in. You can
                  always edit the details later.
                </p>
              </div>
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={updateOnboardStatus}
                  className="flex items-center font-bold text-[#66FFEE] active:none"
                >
                  <p>Skip Tutorial</p>
                </button>
              </div>
            </div>
          ),
          styles: {
            options: {
              arrowColor: "#00C7B1",
              overlayColor: "rgba(0,0, 0, 0.0)",
            },
          },
          tooltipComponent: ParentArrowTooltip,
          placement: "right",
          target: ".navigator_tour_11",
          disableBeacon: true,
          spotlightClicks: true,
        },
      ]);
    }
  }, []);

  // ============FUNCTIONS
  const closeTour = (): void => {
    setTourOpen(false);
    setIsOpen(false);
  };

  const handleJoyrideCallback = (data: CallBackProps): void => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourOpen(false);
    }
  };

  const updateOnboardStatus = async (): Promise<void> => {
    closeTour();
    setUser({ ...user, onboarded: true });
    try {
      await updateUserOnboarded({
        variables: {
          data: {
            onboarded: {
              set: true,
            },
          },
        },
      });
      router.push("/navigator/home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <AppLayout hostname={hostname}>
    <LightBackground>
      <Head>
        <title>{memoTenant.name}</title>
      </Head>
      <div className="relative z-10 flex items-center min-h-screen">
        <Section size="2xl">
          <Link href="/navigator/my-courses">
            <a className="flex items-center col-span-2 px-6 group mb-11 lg:px-8 w-max">
              <Button
                className="mr-2 aspect-square group-hover:bg-gray-400 group-hover:border-b-gray-500 group-active:bg-gray-600"
                size="sm"
                variant="secondary"
              >
                <HiChevronLeft size={16} />
              </Button>
              <p className="uppercase ">My Courses</p>
            </a>
          </Link>
          <div className="grid grid-cols-1 px-6 lg:space-x-24 lg:grid-cols-2 lg:px-8">
            <div className="flex flex-col justify-center">
              <p className="pb-6 text-3xl font-bold lg:text-4xl">
                Course Details
              </p>
              <form>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Thumbnail Image (Recommended 354px x 200px)
                  </label>
                  <DropzoneField
                    setValue={setValue}
                    fieldName="thumbnail"
                    size="full"
                    variant="dark"
                    setPreview={setPreview}
                    className="navigator_tour_6"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Course Name
                  </label>
                  <InputField
                    required
                    error={errors.title}
                    type="text"
                    placeholder="Course Name"
                    className="navigator_tour_7"
                    registration={{ ...register("title") }}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Difficulty
                  </label>
                  <SelectField
                    options={DifficultyOptions}
                    control={control}
                    setValue={setValue}
                    fieldName="difficulty"
                    className="navigator_tour_8"
                    defaultValue={null}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Category
                  </label>
                  <SelectField
                    options={categoryOptions}
                    control={control}
                    setValue={setValue}
                    fieldName="category"
                    isSearchable
                    defaultValue={null}
                    errors={errors}
                  />
                </div>
                <div className="flex flex-col relative">
                  <label htmlFor="text" className="">
                    Description
                  </label>
                  <SlateField
                    id="description"
                    setValue={setValue}
                    data={""}
                    className="navigator_tour_9"
                  />
                </div>
                <div className="py-6">
                  <Button
                    variant="green"
                    className="w-full navigator_tour_11"
                    type="submit"
                    onClick={handleSubmit(createCourse)}
                  >
                    Continue
                  </Button>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-center">
              <CourseCardProps
                hostname={hostname}
                name={title || "Title"}
                difficulty={difficulty || "BEGINNER"}
                category={
                  data?.categories.find(
                    (categoryData) => categoryData.name === category,
                  ) as Category
                }
                thumbnail={preview ?? memoTenant.logo.png}
                teacher={teacher}
                className="max-w-xs h-min w-full navigator_tour_10"
              />
            </div>
          </div>
        </Section>
      </div>
      <Joyride
        callback={handleJoyrideCallback}
        continuous
        hideBackButton
        hideCloseButton
        run={tourOpen}
        scrollToFirstStep
        showProgress
        showSkipButton
        steps={steps}
        stepIndex={tourStep}
        disableCloseOnEsc
        disableOverlayClose
        disableOverlay
        tooltipComponent={ParentTooltip}
        styles={{
          options: {
            width: "auto",
            zIndex: 10000,
          },
          spotlight: {
            borderRadius: 20,
          },
        }}
      />
      <Dialog
        isOpen={isOpen}
        onClose={(): void => {
          setIsOpen(false);
          setTourOpen(true);
        }}
        className=""
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xl font-extrabold text-red-600 lg:text-2xl">
            Warning!
          </p>
          <p className="my-6 text-base text-center text-gray-600 lg:text-lg">
            Are you sure you want to end the tour?
          </p>
          <div className="flex flex-row items-center space-x-8">
            <Button
              variant="brand1"
              onClick={(): void => {
                setIsOpen(false);
                setTourOpen(true);
              }}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={updateOnboardStatus}>
              Confirm
            </Button>
          </div>
        </div>
      </Dialog>
    </LightBackground>
    // </AppLayout>
  );
};

export default withAuthenticated(withApollo(Create));

export const getServerSideProps = extractHostname;
