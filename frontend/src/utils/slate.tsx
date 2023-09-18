/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from "react";

import InlineAnswerDropzone from "@/components/Checkpoint/Interactive/DragAndDrop/InlineAnswerDropzone";

export const deserialize = (string: string): any => {
  let data;
  try {
    data = JSON.parse(string);
    // console.log(data);
  } catch (err) {
    data = [
      {
        type: "paragraph",
        children: [{ text: string }],
      },
    ];
  }

  const html =
    data &&
    data.length > 0 &&
    data.map((child: any, index: number) => {
      const content = child.children;
      if (child.type === "paragraph") {
        return (
          <span key={index}>
            {content.map((el: any, subIndex: number) => {
              let current = el.text;
              if (el.italic) {
                current = <i key={`${index}-${subIndex}`}>{current}</i>;
              }
              if (el.bold) {
                current = <b key={`${index}-${subIndex}`}>{current}</b>;
              }
              if (el.underline) {
                current = (
                  <span className="underline" key={`${index}-${subIndex}`}>
                    {current}
                  </span>
                );
              }
              return current;
            })}
          </span>
        );
      } else if (child.type === "code") {
        return <code key={index}>{content.map((el: any) => el.text)}</code>;
      } else {
        return <p key={index}>{content.map((el: any) => el.text)}</p>;
      }
    });
  return html;
};

export const deserializeDNDQuestion = (
  string: string,
  selectedAnswers: any,
  setSelectedAnswers: any,
): any => {
  let data;
  try {
    data = JSON.parse(string);
  } catch (err) {
    data = [
      {
        type: "paragraph",
        children: [{ text: string }],
      },
    ];
  }

  let answers = 0;

  const html =
    data &&
    data.length > 0 &&
    data.map((child: any, index: number) => {
      const content = child.children;
      if (child.type === "paragraph") {
        return (
          <div
            key={index}
            className="flex flex-row items-end w-full h-max mb-6 flex-wrap space-x-2 break-words"
          >
            {content.map((el: any, subIndex: number) => {
              let current = el.text;
              if (el.italic) {
                current = <i key={`${index}-${subIndex}`}>{current}</i>;
              }
              if (el.bold) {
                current = <b key={`${index}-${subIndex}`}>{current}</b>;
              }
              if (el.underline) {
                current = (
                  <span className="underline" key={`${index}-${subIndex}`}>
                    {current}
                  </span>
                );
              }
              if (el.answer) {
                current = (
                  <InlineAnswerDropzone
                    selectedAnswers={selectedAnswers}
                    setSelectedAnswers={setSelectedAnswers}
                    index={answers++}
                  />
                );
              }
              return (
                <p
                  key={`${index}-${subIndex}`}
                  className="max-w-full break-words break_all"
                >
                  {current}
                </p>
              );
            })}
          </div>
        );
      } else if (child.type === "code") {
        return <code key={index}>{content.map((el: any) => el.text)}</code>;
      } else {
        return <p key={index}>{content.map((el: any) => el.text)}</p>;
      }
    });
  return html;
};
