import React from "react";
import { useForm } from "react-hook-form";
import ReactPlayer from "react-player/file";
import { Subtitles } from "schema/generated/graphql";

import { SelectField } from "../Form";

interface IProps {
  url: string;
  selectProps?: any;
  playerProps?: any;
  subtitles: Subtitles[] | undefined;
}

interface Item {
  name: string;
  url: string;
  available: boolean;
}

export const VideoPlayer = ({
  url,
  selectProps,
  playerProps,
  subtitles,
}: IProps): React.ReactElement => {
  const { watch, control, setValue, getValues } = useForm();
  const [urls, setUrls] = React.useState<Item[]>([]);
  const [currentUrl, setCurrentUrl] = React.useState<Item | undefined>();
  const [playedSeconds, setPlayerSeconds] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const videoRef = React.useRef<any>();
  const updateUrl = async (url: string): Promise<void> => {
    let ext: any = url.split(".");
    ext = ext[ext.length - 1];
    const urls = await Promise.all(
      [
        [
          "480p",
          url
            .replace(/(\/)(?=[^/]*$)/, "$&sd-")
            .split(".")
            .slice(0, -1)
            .concat(ext.toLowerCase())
            .join("."),
        ],
        [
          "480p",
          url
            .replace(/(\/)(?=[^/]*$)/, "$&sd-")
            .split(".")
            .slice(0, -1)
            .concat(ext.toUpperCase())
            .join("."),
        ],
        [
          "720p",
          url
            .replace(/(\/)(?=[^/]*$)/, "$&hd-")
            .split(".")
            .slice(0, -1)
            .concat(ext.toLowerCase())
            .join("."),
        ],
        [
          "720p",
          url
            .replace(/(\/)(?=[^/]*$)/, "$&hd-")
            .split(".")
            .slice(0, -1)
            .concat(ext.toUpperCase())
            .join("."),
        ],
        [
          "1080p",
          url.split(".").slice(0, -1).concat(ext.toLowerCase()).join("."),
        ],
        [
          "1080p",
          url.split(".").slice(0, -1).concat(ext.toUpperCase()).join("."),
        ],
      ].map(async ([name, url]) => {
        return {
          name,
          url,
          available: await fetch(
            `/api/checkIfExists?url=${encodeURIComponent(url)}`,
            { method: "HEAD" },
          )
            .then((res) => (res.ok ? true : false))
            .catch(() => false),
        };
      }),
    );
    setUrls(urls);
    const valids = urls.filter(({ available }) => available);
    setCurrentUrl(valids.length === 3 ? valids[1] : valids[0]);
  };
  React.useEffect(() => {
    updateUrl(url);
  }, [url]);
  React.useEffect(() => {
    const url = urls.find((item) => item.url === getValues("url"));
    setCurrentUrl(url);
  }, [watch("url")]);

  const getDropDown = (): React.ReactElement => {
    const filteredUrls = urls.filter(({ available }) => available);
    return (
      <SelectField
        style={{ color: "black" }}
        fieldName="url"
        setValue={setValue}
        control={control}
        errors={{}}
        defaultValue={currentUrl?.url}
        options={filteredUrls.map(({ name, url }) => ({
          label: filteredUrls.length == 1 ? "Original" : name,
          value: url,
        }))}
        {...selectProps}
      />
    );
  };

  return (
    <>
      <div className="w-full py-2 overflow-hidden rounded-2xl">
        <ReactPlayer
          ref={videoRef}
          url={currentUrl?.url}
          playing={playing}
          onPlay={(): any => setPlaying(true)}
          onPause={(): any => setPlaying(false)}
          onSeek={(at): any => setPlayerSeconds(at)}
          onProgress={(e): any => setPlayerSeconds(e.playedSeconds)}
          onReady={(): any => {
            if (Math.abs(videoRef.current.getCurrentTime() - playedSeconds) < 1)
              return;
            videoRef.current.seekTo(playedSeconds);
          }}
          controls
          config={
            subtitles && {
              file: {
                attributes: {
                  crossOrigin: "true",
                },
                tracks: subtitles.map((subtitle, index) => {
                  return {
                    kind: "subtitles",
                    src: subtitle.url,
                    srcLang: subtitle.language,
                    default: index == 0,
                  };
                }),
              },
            }
          }
          {...playerProps}
        />
      </div>
      <div className="flex flex-col w-auto ml-auto mr-0">
        {currentUrl?.url && getDropDown()}
      </div>
    </>
  );
};
