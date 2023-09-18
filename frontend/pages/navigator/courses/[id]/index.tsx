import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { HiChevronLeft } from "react-icons/hi";
import { toast } from "react-toastify";
import * as z from "zod";
import capitalize from "lodash/toUpper";

import { CourseCardProps } from "@/components/Course/CourseCard";
import { Button } from "@/components/Elements";
import Section from "@/components/Elements/Section";
import { Feedback } from "@/components/Feedback";
import { InputField, SelectField } from "@/components/Form";
import { DropzoneField } from "@/components/Form/DropzoneField";
import { SlateField } from "@/components/Form/SlateField";
import { LightBackground } from "@/components/Layout/LightBackground";
import { DifficultyOptions } from "@/types/CourseDifficulty";
import {
  Category,
  CourseAssetType,
  useCategoriesQuery,
  useCourseLazyQuery,
  useUpdateCourseMutation,
  useUploadCourseAssetMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
import { extractHostname, getTenant, Props } from "@/utils/tenant";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  duration: z.number().optional(),
  difficulty: z.enum(["ADVANCED", "BEGINNER", "INTERMEDIATE"]),
  category: z.string(),
  thumbnail: z.optional(z.any()),
});

const Create = ({ hostname }: Props): React.ReactElement => {
  const user = useStore((state) => state.user);
  const [teacher, setTeacher] = React.useState<any>();
  const [isUploadedImage, setIsUploadedImage] = React.useState<boolean>(false);

  const [preview, setPreview] = React.useState<string>();
  const [update, response] = useUpdateCourseMutation();
  const { data } = useCategoriesQuery();
  const [categoryOptions, setCategoryOptions] = React.useState<any>([]);
  const [uploadAsset] = useUploadCourseAssetMutation();
  const [getCourse, courseResponse] = useCourseLazyQuery();
  const router = useRouter();

  const {
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const title = watch("title");
  const description = watch("description");
  const difficulty = watch("difficulty");
  const category = watch("category");

  const updateCourse = async (data: any): Promise<void> => {
    const parsed = JSON.parse(description);
    parsed.forEach((parsedElement: any) => {
      parsedElement.type === undefined && (parsedElement.type = "paragraph");
    });
    const tempDescription = JSON.stringify(parsed);

    try {
      const payload = {
        description: tempDescription,
        level: data.difficulty,
        title: data.title,
        category: {
          connect: {
            name: data.category,
          },
        },
      };

      // If thumbnail modified, change it
      if (data.thumbnail && typeof data.thumbnail === "object") {
        const thumbnail = await uploadAsset({
          variables: {
            courseAssetType: CourseAssetType.Thumbnail,
            file: data.thumbnail,
          },
        });
        Object.assign(payload, {
          thumbnail: {
            connect: {
              id: thumbnail.data?.uploadCourseAsset.id,
            },
          },
        });
      }

      await update({
        variables: {
          data: payload,
          id: router.query.id as string,
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
    const id = response.data?.updateCourse.id;
    if (response && id) {
      router.push(`/navigator/courses/${id}/details`);
    }
  }, [response, router]);

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
    if (!courseResponse.data || !courseResponse.data.course) return;
    if (preview !== courseResponse.data.course.thumbnail?.url)
      setIsUploadedImage(true);
  }, [preview]);

  React.useEffect(() => {
    if (user && user.teacher) {
      setTeacher(user.teacher);
    }
  }, [user, setTeacher]);

  React.useEffect(() => {
    if (courseResponse.data && courseResponse.data.course) {
      const defaults: any = {
        title: courseResponse.data.course.title,
        description: courseResponse.data.course.description,
        duration: courseResponse.data.course.duration,
        difficulty: courseResponse.data.course.level,
        category: courseResponse.data.course.category?.name,
        thumbnail: courseResponse.data.course.thumbnail?.id,
      };
      reset(defaults);
      setPreview(courseResponse.data.course.thumbnail?.url);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseResponse.data]);

  React.useEffect(() => {
    const getCourseData = async (): Promise<void> => {
      await getCourse({
        variables: {
          id: router.query.id as string,
        },
      });
    };

    if (router.query && router.query.id) {
      getCourseData();
    }
  }, [router, getCourse]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname);
  }, [hostname]);

  return (
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
              <form onSubmit={handleSubmit(updateCourse)}>
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
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="text" className="">
                    Course Name
                  </label>
                  <InputField
                    required
                    type="text"
                    placeholder="Course Name"
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
                <div className="relative flex flex-col">
                  <label htmlFor="text" className="">
                    Description
                  </label>
                  {description && (
                    <SlateField
                      id="description"
                      setValue={setValue}
                      data={description}
                    />
                  )}
                </div>
                <div className="py-6">
                  <Button
                    variant="green"
                    className="w-full"
                    type="submit"
                    disabled={
                      !title || !difficulty || !category || !description
                    }
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
                className="w-full max-w-xs h-min"
                isUploadedImage={isUploadedImage}
              />
            </div>
          </div>
        </Section>
      </div>
    </LightBackground>
  );
};

export default withAuthenticated(withApollo(Create));

export const getServerSideProps = extractHostname;
