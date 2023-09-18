import clsx from "clsx";
import React from "react";
import { FaBold, FaItalic, FaUnderline, FaCode } from "react-icons/fa";
// Import the Slate editor factory.
import {
  createEditor,
  Editor,
  Transforms,
  Text,
  BaseEditor,
  Range,
} from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const CustomEditor = {
  isBoldMarkActive(editor: any): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    }) as any;

    return !!match;
  },

  isItalicMarkActive(editor: any): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
      universal: true,
    }) as any;

    return !!match;
  },

  isUnderlineMarkActive(editor: any): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.underline === true,
      universal: true,
    }) as any;

    return !!match;
  },

  isCodeBlockActive(editor: any): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    }) as any;

    return !!match;
  },

  isAnswerBlockActive(editor: any): boolean {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.answer === true,
      universal: true,
    }) as any;

    return !!match;
  },

  toggleBoldMark(editor: any): void {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(editor, { bold: isActive ? null : true } as any, {
      match: (n) => (Text as any).isText(n),
      split: true,
    });
  },

  toggleItalicMark(editor: any): void {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(editor, { italic: isActive ? null : true } as any, {
      match: (n) => (Text as any).isText(n),
      split: true,
    });
  },

  toggleUnderlineMark(editor: any): void {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(editor, { underline: isActive ? null : true } as any, {
      match: (n) => (Text as any).isText(n),
      split: true,
    });
  },

  insertAnswerBlock(editor: any): void {
    Transforms.insertNodes(editor, {
      answer: true,
      text: "____",
    } as any);
    Transforms.insertNodes(editor, {
      text: " ",
    } as any);
  },

  toggleCodeBlock(editor: any): void {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(editor, { type: isActive ? null : "code" } as any, {
      match: (n) => Editor.isBlock(editor, n),
    });
  },
};

const CodeElement = (props: any): any => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any): any => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = (props: any): any => {
  return (
    <span
      {...props.attributes}
      className={clsx(
        props.leaf.bold ? "font-bold" : "font-normal",
        props.leaf.italic ? "italic" : "not-italic",
        props.leaf.underline ? "underline" : "no-underline",
      )}
    >
      {props.children}
    </span>
  );
};

const SHORTCUTS = {
  ____: "answer-block",
};

type SlateFieldProps = {
  className?: string;
  setValue?: any;
  onChange?: any;
  id: string | number;
  data?: any;
  answerField?: boolean;
};

export const SlateField = ({
  className,
  setValue,
  onChange,
  id,
  data,
  answerField,
}: SlateFieldProps): React.ReactElement => {
  const withShortcuts = (editor: BaseEditor): any => {
    const { insertText } = editor;

    editor.insertText = (text: string): any => {
      const { selection } = editor;

      if (text === " " && selection && Range.isCollapsed(selection)) {
        const { anchor } = selection;
        const block = Editor.above(editor, {
          match: (n) => Editor.isBlock(editor, n),
        });
        const path = block ? block[1] : [];
        const end = Editor.end(editor, path);
        const range = {
          anchor,
          focus: {
            ...end,
            offset: end.offset - 4,
          },
        };
        const beforeText = Editor.string(editor, range);
        const type = (SHORTCUTS as any)[beforeText];
        if (type) {
          Transforms.select(editor, range);
          Transforms.setNodes(editor, { answer: true } as any, {
            match: (n) => (Text as any).isText(n),
            split: true,
          });
          Transforms.move(editor, { distance: 1, unit: "line" });
          Transforms.insertNodes(editor, {
            text: " ",
          } as any);
          return;
        }
      }

      insertText(text);
    };

    return editor;
  };
  const [editor] = React.useState(
    withShortcuts(withReact(createEditor() as any)),
  );
  const initialValue = React.useMemo(() => {
    let parsed;
    try {
      parsed = JSON.parse(data);
    } catch (err) {
      parsed = [
        {
          type: "paragraph",
          children: [{ text: data || "" }],
        },
      ];
    }
    return parsed;
  }, [data]);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = React.useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = React.useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return initialValue ? (
    <Slate
      editor={editor as any}
      value={initialValue}
      onChange={(value): any => {
        const isAstChange = editor.operations.some(
          (op: any) => "set_selection" !== op.type,
        );
        if (isAstChange) {
          const content = JSON.stringify(value);
          if (setValue) {
            setValue(id, content);
          } else if (onChange) {
            onChange(content);
          }
        }
      }}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        rows={4}
        onKeyDown={(event): any => {
          if (!event.ctrlKey) {
            return;
          }
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }
            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
            case "i": {
              event.preventDefault();
              CustomEditor.toggleItalicMark(editor);
              break;
            }
            case "u": {
              event.preventDefault();
              CustomEditor.toggleUnderlineMark(editor);
              break;
            }
            case "-": {
              event.preventDefault();
              CustomEditor.insertAnswerBlock(editor);
              break;
            }
          }
        }}
        className={clsx(
          "block w-full placeholder-gray-400 placeholder-opacity-50 bg-gray-50 border-gray-200 rounded-xl border-2 focus:ring-0 focus:border-black text-black p-2 min-h-[12em]",
          className,
        )}
      />

      <div className="absolute flex flex-row items-center p-2 mt-1 space-x-2 bg-white w-max bottom-2 right-2">
        {answerField && (
          <button
            onMouseDown={(event): void => {
              event.preventDefault();
              CustomEditor.insertAnswerBlock(editor);
            }}
            type="button"
            className="font-bold"
          >
            Answer Block
          </button>
        )}
        <button
          onMouseDown={(event): void => {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
          }}
          type="button"
        >
          <FaItalic />
        </button>
        <button
          onMouseDown={(event): void => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
          type="button"
        >
          <FaBold />
        </button>
        <button
          onMouseDown={(event): void => {
            event.preventDefault();
            CustomEditor.toggleUnderlineMark(editor);
          }}
          type="button"
        >
          <FaUnderline />
        </button>
        <button
          onMouseDown={(event): void => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
          type="button"
        >
          <FaCode />
        </button>
      </div>
    </Slate>
  ) : (
    <></>
  );
};
