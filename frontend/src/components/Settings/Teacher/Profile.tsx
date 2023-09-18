import { Transition, Menu } from "@headlessui/react";
import { useRouter } from "next/router";
import React, {Fragment} from "react";
import {
  Control,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { HiX } from "react-icons/hi";
import { toast } from "react-toastify";

import { Button } from "@/components/Elements";
import { Divider } from "@/components/Elements/Divider";
import { Feedback } from "@/components/Feedback";
import { InputField } from "@/components/Form";
import {
  useMeLazyQuery,
  useUpdateTeacherMutation,
  useUpdateUserOnboardedMutation
} from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";

import { Card } from "../../Elements/Card";
import SettingsForm from "../SettingsForm";

import ProfileBannerUpload from "./ProfileBannerUpload";
import ProfilePhotoUpload from "./ProfilePhotoUpload";


interface IProp {
  errors: {
    [x: string]: any;
  };
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  control: Control<FieldValues, object>;
  setValue: UseFormSetValue<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

const ProfileSettings = ({
  errors,
  register,
  handleSubmit,
  setValue,
  watch,
}: IProp): React.ReactElement => {
  const watchExperiences = watch("experiences");
  const watchEducation = watch("education");
  const watchCertificates = watch("certificates");
  const setUser = useStore((state) => state.setMe);
  const router = useRouter();
  const user = useStore((state) => state.user);
  const setOnboarding = useStore((state) => state.setOnboarding);
  const setOnboardStep = useStore((state) => state.setOnboardStep);
  const [updateUserOnboarded] = useUpdateUserOnboardedMutation();
  const [getMe] = useMeLazyQuery();

  // handle input change
  const handleExperience = (e: any, index: number): void => {
    const { name, value } = e.target;
    const list: any[] = [...watchExperiences];
    list[index][name] = ["title", "employer", "description"].includes(name)
      ? value
      : +value;
    setValue("experiences", list);
  };

  // handle click event of the Add button
  const handleAddExperience = (): void => {
    setValue("experiences", [
      ...watchExperiences,
      { title: "", employer: "", startEndDate: "", description: "" },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveExperience = (index: number): void => {
    const list = [...watchExperiences];
    list.splice(index, 1);
    setValue("experiences", list);
  };

  // handle input change
  const handleEducation = (e: any, index: number): void => {
    const { name, value } = e.target;
    const list: any[] = [...watchEducation];
    list[index][name] = ["degree", "school", "description"].includes(name)
      ? value
      : +value;
    setValue("education", list);
  };

  // handle click event of the Add button
  const handleAddEducation = (): void => {
    setValue("education", [
      ...watchEducation,
      { degree: "", school: "", startEndDate: "", description: "" },
    ]);
  };

  const restartTutorial = async (): Promise<void> => {
    setUser({ ...user, onboarded: false });
    setOnboardStep(0);
    setOnboarding(true);
    try {
      await updateUserOnboarded({
        variables: {
          data: {
            onboarded: {
              set: false,
            },
          },
        },
      }).then(() => {
        router.push("/navigator/home");
      });
    } catch (error) {
      console.log(error);
    }
  };

  // handle click event of the Remove button
  const handleRemoveEducation = (index: number): void => {
    const list = [...watchEducation];
    list.splice(index, 1);
    setValue("education", list);
  };

  // handle input change
  const handleCertificates = (e: any, index: number): void => {
    const { name, value } = e.target;
    const list: any[] = [...watchCertificates];
    list[index][name] = ["title", "issuer", "description"].includes(name)
      ? value
      : +value;
    setValue("certificates", list);
  };

  // handle click event of the Add button
  const handleAddCertificates = (): void => {
    setValue("certificates", [
      ...watchCertificates,
      { title: "", issuer: "", date: "", description: "" },
    ]);
  };

  // handle click event of the Remove button
  const handleRemoveCertificates = (index: number): void => {
    const list = [...watchCertificates];
    list.splice(index, 1);
    setValue("certificates", list);
  };

  const [updateTeacher] = useUpdateTeacherMutation();

  const toMonthName = (monthNumber: number): string => {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  };

  const userSubmit = async (data: any): Promise<void> => {
    const payload = { ...data };
    if (payload.experiences.length)
      payload.experiences = payload.experiences.map((experience: any) => {
        const { title, description, employer } = experience;
        const newExperience = {
          description,
          title,
          employer,
          startEndDate: `${toMonthName(experience.startMonth)} ${
            experience.startYear
          }-${toMonthName(experience.endMonth)} ${experience.endYear}`,
        };
        return newExperience;
      });

    if (payload.education.length)
      payload.education = payload.education.map((edu: any) => {
        const { degree, description, school } = edu;
        const newEducation = {
          description,
          degree,
          school,
          startEndDate: `${toMonthName(edu.startMonth)} ${
            edu.startYear
          }-${toMonthName(edu.endMonth)} ${edu.endYear}`,
        };
        return newEducation;
      });

    if (payload.certificates.length)
      payload.certificates = payload.certificates.map((certificate: any) => {
        const { title, description, issuer } = certificate;
        const newCertificate = {
          description,
          title,
          issuer,
          date: `${toMonthName(certificate.month)} ${certificate.year}`,
        };
        return newCertificate;
      });

    try {
      await updateTeacher({
        variables: {
          data: {
            jobTitle: {
              set: data.jobTitle,
            },
            introduction: {
              set: data.introduction,
            },
            firstName: data.firstName,
            lastName: data.lastName,
            gender: {
              set: data.gender,
            },
            nationality: {
              set: data.nationality,
            },
            phoneNumber: {
              set: data.phoneNumber,
            },
            experiences: data.experiences,
            education: data.education,
            certificates: data.certificates,
          },
        },
      });
      getMe().then((res) => {
        setUser(res.data?.me);
      });
      toast(
        <Feedback
          title="Profile updated successfully!"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <SettingsForm submitCallback={handleSubmit(userSubmit)}>
      {/* Account Details */}
      <p className="col-span-2 text-xl font-bold lg:text-2xl">
        Account Details
      </p>
      <div className="col-span-2">
        <label htmlFor="title" className="">
          Profile Banner
        </label>
        <div className="progressbar"></div>
        <ProfileBannerUpload />
      </div>
      <div className="col-span-2">
        <label htmlFor="title" className="">
          Profile Photo
        </label>
        <div className="progressbar"></div>
        <ProfilePhotoUpload />
      </div>
      <div className="col-span-2">
        <label htmlFor="title" className="">
          First Name
        </label>
        <InputField
          name="firstName"
          type="text"
          registration={{ ...register("firstName") }}
          placeholder="Enter First Name"
          error={errors.firstName}
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="title" className="">
          Last Name
        </label>
        <InputField
          name="lastName"
          type="text"
          registration={{ ...register("lastName") }}
          placeholder="Enter Last Name"
          error={errors.lastName}
        />
      </div>

      {/* Professional Details */}
      <p className="col-span-2 text-xl font-bold lg:text-2xl">
        Professional Details
      </p>
      <div className="col-span-2">
        <label htmlFor="title" className="">
          Professional Title
        </label>
        <InputField
          name="jobTitle"
          type="text"
          registration={{ ...register("jobTitle") }}
          placeholder="Enter Professional Title"
          error={errors.jobtitle}
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="title" className="">
          Professional Summary
        </label>
        <InputField
          name="introduction"
          type="text"
          registration={{ ...register("introduction") }}
          placeholder="Enter Professional Summary"
          error={errors.introduction}
        />
      </div>

      {/* Work Experiences */}
      <p className="col-span-2 text-xl font-bold lg:text-2xl">
        Work Experiences
      </p>
      {watchExperiences &&
        watchExperiences.map((x: any, i: number) => {
          return (
            <div key={i} className="col-span-2 text-black box">
              <Card className="p-6 mt-2 bg-opacity-20">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="none"
                    className="text-red-500"
                    onClick={(): void => handleRemoveExperience(i)}
                  >
                    <HiX size={24} />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="title" className="">
                      Job Title
                    </label>
                    <InputField
                      name="title"
                      placeholder="Enter Job Title"
                      value={x.title}
                      onChange={(e): void => handleExperience(e, i)}
                      error={errors.experiences?.[i]?.title ?? null}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="employer" className="">
                      Employer
                    </label>
                    <InputField
                      name="employer"
                      placeholder="Enter Employer"
                      value={x.employer}
                      onChange={(e): void => handleExperience(e, i)}
                      error={errors.experiences?.[i]?.employer ?? null}
                    />
                  </div>

                  <div className="col col-span-2 mt-1">
                    <div className="flex justify-start ">
                      <div className="col-span-1 w-4/5 mr-2">
                        <label htmlFor="startMonth" className="">
                          Start Month
                        </label>
                        <InputField
                          name="startMonth"
                          placeholder="MM"
                          type="number"
                          max={12}
                          value={x.startMonth}
                          onChange={(e): void => handleExperience(e, i)}
                          error={errors.experiences?.[i]?.startMonth ?? null}
                        />
                      </div>
                      <div className="col-span-1 w-4/5">
                        <label htmlFor="startYear" className="">
                          Start Year
                        </label>
                        <InputField
                          name="startYear"
                          placeholder="YYYY"
                          type="number"
                          value={x.startYear}
                          onChange={(e): void => handleExperience(e, i)}
                          error={errors.experiences?.[i]?.startYear ?? null}
                          wrapperClassName=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col col-span-2 mt-1">
                    <div className="flex justify-start ">
                      <div className="col-span-1 w-4/5 mr-2">
                        <label htmlFor="endMonth" className="">
                          End Month
                        </label>
                        <InputField
                          name="endMonth"
                          placeholder="MM"
                          type="number"
                          max={12}
                          value={x.endMonth}
                          onChange={(e): void => handleExperience(e, i)}
                          error={errors.experiences?.[i]?.endMonth ?? null}
                          wrapperClassName=""
                        />
                      </div>
                      <div className="col-span-1 w-4/5">
                        <label htmlFor="endYear" className="">
                          End Year
                        </label>
                        <InputField
                          name="endYear"
                          placeholder="YYYY"
                          type="number"
                          value={x.endYear}
                          onChange={(e): void => handleExperience(e, i)}
                          error={errors.experiences?.[i]?.endYear ?? null}
                          wrapperClassName=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 mt-1">
                    <label htmlFor="description" className="">
                      Description
                    </label>
                    <InputField
                      name="description"
                      placeholder="Enter Description"
                      value={x.description}
                      onChange={(e): void => handleExperience(e, i)}
                      error={errors.experiences?.[i]?.description ?? null}
                    />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      <Button
        variant="brand1"
        size="md"
        className="w-full col-span-2 lg:col-span-1"
        onClick={handleAddExperience}
      >
        + Add Experience
      </Button>
      <div className="col-span-2 mt-8">
        <Divider />
      </div>

      {/* Educations */}
      <p className="col-span-2 mt-8 text-xl font-bold lg:text-2xl">Education</p>
      {watchEducation &&
        watchEducation.map((x: any, i: number) => {
          return (
            <div key={i} className="col-span-2 text-black box">
              <Card className="p-6 mt-2 bg-opacity-20">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="none"
                    className="text-red-500"
                    onClick={(): void => handleRemoveEducation(i)}
                  >
                    <HiX size={24} />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="degree" className="">
                      Degree
                    </label>
                    <InputField
                      name="degree"
                      placeholder="Enter Degree"
                      value={x.degree}
                      onChange={(e): void => handleEducation(e, i)}
                      error={errors.education?.[i]?.degree ?? null}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="school" className="">
                      School
                    </label>
                    <InputField
                      name="school"
                      placeholder="Enter School"
                      value={x.school}
                      onChange={(e): void => handleEducation(e, i)}
                      error={errors.education?.[i]?.school ?? null}
                    />
                  </div>

                  <div className="col col-span-2 mt-1">
                    <div className="flex justify-start ">
                      <div className="col-span-1 w-4/5 mr-2">
                        <label htmlFor="startMonth" className="">
                          Start Month
                        </label>
                        <InputField
                          name="startMonth"
                          placeholder="MM"
                          type="number"
                          max={12}
                          value={x.startMonth}
                          onChange={(e): void => handleEducation(e, i)}
                          error={errors.education?.[i]?.startMonth ?? null}
                        />
                      </div>
                      <div className="col-span-1 w-4/5">
                        <label htmlFor="startYear" className="">
                          Start Year
                        </label>
                        <InputField
                          name="startYear"
                          placeholder="YYYY"
                          type="number"
                          value={x.startYear}
                          onChange={(e): void => handleEducation(e, i)}
                          error={errors.education?.[i]?.startYear ?? null}
                          wrapperClassName=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col col-span-2 mt-1">
                    <div className="flex justify-start ">
                      <div className="col-span-1 w-4/5 mr-2">
                        <label htmlFor="endMonth" className="">
                          End Month
                        </label>
                        <InputField
                          name="endMonth"
                          placeholder="MM"
                          type="number"
                          max={12}
                          value={x.endMonth}
                          onChange={(e): void => handleEducation(e, i)}
                          error={errors.education?.[i]?.endMonth ?? null}
                          wrapperClassName=""
                        />
                      </div>
                      <div className="col-span-1 w-4/5">
                        <label htmlFor="endYear" className="">
                          End Year
                        </label>
                        <InputField
                          name="endYear"
                          placeholder="YYYY"
                          type="number"
                          value={x.endYear}
                          onChange={(e): void => handleEducation(e, i)}
                          error={errors.education?.[i]?.endYear ?? null}
                          wrapperClassName=""
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="description" className="">
                      Description
                    </label>
                    <InputField
                      name="description"
                      placeholder="Enter Description"
                      value={x.description}
                      onChange={(e): void => handleEducation(e, i)}
                      error={errors.education?.[i]?.description ?? null}
                    />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      <Button
        variant="brand1"
        size="md"
        className="w-full col-span-2 lg:col-span-1"
        onClick={handleAddEducation}
      >
        + Add Education
      </Button>
      <div className="col-span-2 mt-8">
        <Divider />
      </div>

      {/* Certificates */}
      <p className="col-span-2 mt-8 text-xl font-bold lg:text-2xl">
        Certificates
      </p>
      {watchCertificates &&
        watchCertificates.map((x: any, i: number) => {
          return (
            <div key={i} className="col-span-2 text-black box">
              <Card className="p-6 mt-2 bg-opacity-20">
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="none"
                    className="text-red-500"
                    onClick={(): void => handleRemoveCertificates(i)}
                  >
                    <HiX size={24} />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="title" className="">
                      Title
                    </label>
                    <InputField
                      name="title"
                      placeholder="Enter Title"
                      value={x.title}
                      onChange={(e): void => handleCertificates(e, i)}
                      error={errors.certificates?.[i]?.title ?? null}
                    />
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <label htmlFor="issuer" className="">
                      Issuer
                    </label>
                    <InputField
                      name="issuer"
                      placeholder="Enter Issuer"
                      value={x.issuer}
                      onChange={(e): void => handleCertificates(e, i)}
                      error={errors.certificates?.[i]?.issuer ?? null}
                    />
                  </div>
                  <div className="col col-span-2 mt-1">
                    <div className="flex justify-start ">
                      <div className="col-span-1 w-4/5 mr-2">
                        <label htmlFor="month" className="">
                          Month
                        </label>
                        <InputField
                          name="month"
                          placeholder="MM"
                          type="number"
                          max={12}
                          value={x.month}
                          onChange={(e): void => handleCertificates(e, i)}
                          error={errors.certificates?.[i]?.month ?? null}
                          wrapperClassName=""
                        />
                      </div>
                      <div className="col-span-1 w-4/5">
                        <label htmlFor="year" className="">
                          Year
                        </label>
                        <InputField
                          name="year"
                          placeholder="YYYY"
                          type="number"
                          value={x.year}
                          onChange={(e): void => handleCertificates(e, i)}
                          error={errors.certificates?.[i]?.year ?? null}
                          wrapperClassName=""
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="description" className="">
                      Description
                    </label>
                    <InputField
                      name="description"
                      placeholder="Enter Description"
                      value={x.description}
                      onChange={(e): void => handleCertificates(e, i)}
                      error={errors.certificates?.[i]?.description ?? null}
                    />
                  </div>
                </div>
              </Card>
            </div>
          );
        })}
      <Button
        variant="brand1"
        size="md"
        className="w-full col-span-2 lg:col-span-1"
        onClick={handleAddCertificates}
      >
        + Add Certificate
      </Button>
      <div className="col-span-2 mt-8">
        <Divider />
      </div>
      <Menu as="div" className="relative z-20">
        {({ open }): React.ReactElement => (
          <>
            <Menu.Button>
              <button
                type="button"
                className="uppercase font-semibold mt-1 text-[#00C7B1] navigator_tour_85 absolute right-0"
              >
                Restart Tutorial
              </button>
            </Menu.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-20 absolute top-0 right-0 mt-16 bg-white rounded-xl p-4 text-center border w-60">
                <p className="text-gray-700 font-extrabold ">Are you sure?</p>
                <div className="flex gap-x-3 mt-4 justify-center text-center">
                  <Menu.Item>
                    {(): React.ReactElement => (
                      <Button size="xs" className="text-xs" variant="gray">
                        Cancel
                      </Button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {(): React.ReactElement => (
                      <Button
                        size="xs"
                        className="text-xs"
                        variant="brand1"
                        onClick={restartTutorial}
                      >
                        Confirm
                      </Button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </SettingsForm>
  );
};

export default ProfileSettings;
