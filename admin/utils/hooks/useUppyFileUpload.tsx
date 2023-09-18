import Uppy from "@uppy/core";
import ImageEditor from "@uppy/image-editor";
import { useUppy } from "@uppy/react";
import React, { useState } from "react";
import { useFilePicker } from "use-file-picker";

export const useUppyFileUpload = ({
  upload,
  ratio,
  disableEditing = false,
  acceptVideo = false,
}: {
  upload: (file: any) => void;
  ratio: number;
  disableEditing?: boolean;
  acceptVideo?: boolean;
}): any => {
  const [displayUppy, setDisplayUppy] = useState(false);
  const [openFileSelector, { plainFiles }] = useFilePicker({
    accept: [".png", ".jpg", `${acceptVideo ? ".mp4" : ".png"}`],
    multiple: false,
  });
  const uppy = useUppy(() => {
    const uppy = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        maxFileSize: 1000 ** 2 * 20,
      },
    }).use(ImageEditor, {
      cropperOptions: {
        aspectRatio: ratio,
        initialAspectRatio: ratio,
        croppedCanvasOptions: {},
      },
      actions: {
        flip: true,
        granularRotate: true,
        revert: false, // doesn't keep aspect ratio when after reset
        rotate: true,
        zoomIn: true,
        zoomOut: true,
        cropSquare: false,
        cropWidescreen: false,
        cropWidescreenVertical: false,
      },
    });
    return uppy;
  });
  React.useEffect(() => {
    if (!plainFiles.length) return;
    const file = plainFiles[0];
    uppy.addFile({
      data: file,
      name: file.name,
      type: file.type,
    });
    if (disableEditing) {
      upload(file);
    }
    setDisplayUppy(true);
  }, [plainFiles]);
  const closeUppy = (): void => {
    const state = uppy.getState();
    state!.plugins!.ImageEditor.currentImage = null;
    state!.plugins!["react:Dashboard"].activeOverlayType = undefined;
    state!.plugins!["react:Dashboard"].fileCardFor = undefined;
    state!.plugins!["react:Dashboard"].showFileEditor = false;
    uppy.setState(state);
    uppy.reset();
    setDisplayUppy(false);
  };
  React.useEffect(() => {
    const callback = (info: any): void => {
      const file = uppy.getFile(info.fileIDs[0]) as any;
      file.data.name = file.name;
      upload(file.data);
    };
    uppy.on("upload", callback);
    return (): void => {
      uppy.off("upload", callback);
    };
  }, []);
  return {
    request: openFileSelector,
    cancel: closeUppy,
    displayUppy,
    uppy,
  };
};
