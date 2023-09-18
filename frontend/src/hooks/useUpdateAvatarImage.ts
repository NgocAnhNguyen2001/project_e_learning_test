import _ from "lodash";
import mergeImages from "merge-images";

import { NewUserAvatarDto } from "schema/generated/graphql";

export const useUpdateAvatarImage = async (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  currentAvatar: NewUserAvatarDto,
  uploadAvatar: (avatar: any) => void,
): Promise<any> => {
  const dataURLtoFile = (dataurl: string): File => {
    const arr = dataurl.split(",");
    const match = arr[0].match(/:(.*?);/);
    const mime = match ? match[1] : "image/png";
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], "avatar.png", { type: mime });
  };

  const getLayers = (): any[] => {
    const layers = [
      { src: currentAvatar.shadow?.imgUrl, x: 0, y: 0 },
      !currentAvatar.hairBack
        ? undefined
        : {
            src: currentAvatar.hairBack?.imgUrl,
            x: 0,
            y: 0,
          },
      {
        src: currentAvatar.body?.imgUrl,
        x: 0,
        y: 0,
      },
      {
        src: currentAvatar.head?.imgUrl,
        x: 0,
        y: 0,
      },
      !currentAvatar.horns
        ? undefined
        : {
            src: currentAvatar.horns?.imgUrl,
            x: 0,
            y: 0,
          },
      !currentAvatar.ears
        ? undefined
        : {
            src: currentAvatar.ears?.imgUrl,
            x: 0,
            y: 0,
          },
      !currentAvatar.hairBangs
        ? undefined
        : {
            src: currentAvatar.hairBangs?.imgUrl,
            x: 0,
            y: 0,
          },
      {
        src: currentAvatar.eyes?.imgUrl,
        x: 0,
        y: 0,
      },
      {
        src: currentAvatar.mouth?.imgUrl,
        x: 0,
        y: 0,
      },
      !currentAvatar.cheeks
        ? undefined
        : {
            src: currentAvatar.cheeks?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.shoes?.label === "none"
        ? undefined
        : {
            src: currentAvatar.shoes?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.shirt?.label === "none"
        ? undefined
        : {
            src: currentAvatar.bottom?.isOuterMost
              ? currentAvatar.shirt?.imgUrl
              : currentAvatar.bottom?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.bottom?.label === "none"
        ? undefined
        : {
            src: currentAvatar.bottom?.isOuterMost
              ? currentAvatar.bottom?.imgUrl
              : currentAvatar.shirt?.imgUrl,
            x: 0,
            y: 0,
          },
      !currentAvatar.jacket
        ? undefined
        : {
            src: currentAvatar.jacket?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.topAccessory?.label === "none"
        ? undefined
        : {
            src: currentAvatar.topAccessory?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.headAccessory?.label === "none"
        ? undefined
        : {
            src: currentAvatar.headAccessory?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.faceAccessory?.label === "none"
        ? undefined
        : {
            src: currentAvatar.faceAccessory?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.eyesAccessory?.label === "none"
        ? undefined
        : {
            src: currentAvatar.eyesAccessory?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.itemAccessory?.label === "none"
        ? undefined
        : {
            src: currentAvatar.itemAccessory?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.pet?.label === "none"
        ? undefined
        : {
            src: currentAvatar.pet?.imgUrl,
            x: 0,
            y: 0,
          },
      currentAvatar.nose?.label === "none"
        ? undefined
        : {
            src: currentAvatar.nose?.imgUrl,
            x: 0,
            y: 0,
            opacity: 0.25,
          },
    ];
    return layers.filter(
      (item: any) => item !== undefined && _.isString(item.src),
    );
  };

  const layers = await Promise.all(
    getLayers().map(async (l) => {
      const blob = await fetch(l.src)
        .then((res) => res.blob())
        .catch((err) => (console.error(err), l));
      if (!blob) return null;
      return { ...l, src: URL.createObjectURL(blob as Blob) };
    }),
  ).then((layers) => layers.filter((l) => l !== null));

  mergeImages(layers as any).then(async (b64: string) => {
    const file = dataURLtoFile(b64);
    await uploadAvatar({
      variables: {
        file,
      },
    });
  });
  // .catch(() => {
  //   toast(
  //     <Feedback
  //       title="There's an error!"
  //       subtitle="Unable to save avatar"
  //       type="error"
  //       disableFeedback={true}
  //     />,
  //     {
  //       progress: undefined,
  //       toastId: 1,
  //       autoClose: 3000,
  //     },
  //   );
  // });
};
