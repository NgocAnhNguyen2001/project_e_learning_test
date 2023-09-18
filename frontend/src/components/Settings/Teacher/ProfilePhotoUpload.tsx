import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { DashboardModal, useUppy } from "@uppy/react";
import React from "react";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import "@uppy/image-editor/dist/style.css";
import { toast } from "react-toastify";

import { Button } from "@/components/Elements";
import { Feedback } from "@/components/Feedback";
import { useUpdateTeacherProfilePictureMutation } from "schema/generated/graphql";
import { useStore } from "utils/hooks/zustand";


const ProfilePhotoUpload = (): React.ReactElement => {
  const [open, setOpen] = React.useState<boolean>(false);
  const user = useStore((user) => user.user);
  const setMe = useStore((user) => user.setMe);
  const [upload, uploadResponse] = useUpdateTeacherProfilePictureMutation();
  const uppy = useUppy(() => {
    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 1000 ** 2 * 20,
      },
    }).use(ImageEditor, {
      cropperOptions: {
        aspectRatio: 1,
        initialAspectRatio: 1,
        croppedCanvasOptions: {},
      },
      actions: {
        flip: true,
        granularRotate: true,
        revert: true,
        rotate: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: true,
        cropWidescreen: false,
        cropWidescreenVertical: false,
      },
    });
    return uppy;
  });

  React.useEffect(() => {
    return (): void => uppy.close();
  }, []);

  React.useEffect(() => {
    if (uploadResponse.data?.uploadTeacherProfile.photo?.url) {
      setOpen(false);
      setMe({
        ...user,
        teacher: {
          ...user?.teacher,
          photo: uploadResponse.data.uploadTeacherProfile.photo,
        },
      });
      toast(
        <Feedback
          title="Success!"
          subtitle="Profile photo saved successfully"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  }, [uploadResponse.data]);

  const uploadImage = async (file: File): Promise<void> => {
    try {
      // let abort: any;
      await upload({
        variables: {
          file,
        },
        // context: {
        //   fetchOptions: {
        //     useUpload: true,
        //     onProgress: (ev: ProgressEvent) => {
        //       console.log(ev.loaded, ev.total, ev.loaded / ev.total);
        //     },
        //     onAbortPossible: (abortHandler: any) => {
        //       abort = abortHandler;
        //     },
        //   },
        // },
      });
      // if (abort) {
      //   abort();
      // }
    } catch (err) {
      console.log(err);
      toast(
        <Feedback
          title="Error!"
          subtitle="Profile photo could not be saved"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
      setOpen(false);
    }
  };

  uppy.on("upload", ({ fileIDs }) => {
    const file: any = uppy.getFile(fileIDs[0]);
    uploadImage(file.data);
  });

  return (
    <>
      <DashboardModal
        uppy={uppy}
        open={open}
        autoOpenFileEditor={true}
        plugins={["ImageEditor"]}
        closeModalOnClickOutside
        onRequestClose={(): void => setOpen(false)}
      />
      <Button onClick={(): void => setOpen(true)} variant="inverse">
        Upload Profile Photo
      </Button>
    </>
  );
};

export default ProfilePhotoUpload;
