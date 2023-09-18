import clsx from "clsx";
import React from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, UseFormSetValue } from "react-hook-form";

const variants = {
  light: "text-gray-50",
  dark: "text-gray-500",
};

const sizes = {
  sm: "w-max",
  full: "w-full",
};

interface DropzoneFieldProps {
  id?: string | number;
  className?: string;
  fieldName?: string;
  maxFiles?: number;
  maxSize?: number;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  setValue?: UseFormSetValue<FieldValues>;
  onChange?: any;
  existingFile?: string | null;
  setPreview?: React.Dispatch<React.SetStateAction<string | undefined>>;
  accept?: string;
  currentBlocks?: any;
  acceptOneFile?: boolean;
  resetEvent?: {
    filename: string | null;
  };
}

export const DropzoneField = ({
  id,
  className,
  setValue,
  fieldName,
  variant = "light",
  size = "sm",
  maxFiles = 1,
  maxSize = 1000000000, // Default 1GB
  accept = "image/*, application/pdf, video/*",
  setPreview,
  onChange,
  existingFile = null,
  acceptOneFile = false,
  resetEvent,
}: DropzoneFieldProps): React.ReactElement => {
  const [filename, setFilename] = React.useState<string | null>(existingFile);
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    if (!resetEvent) return;
    setFilename(resetEvent.filename);
  }, [resetEvent]);

  const onDrop = React.useCallback(
    (acceptedFiles) => {
      acceptedFiles.map((file: any) => {
        setFilename(file.name);
        if (file && fieldName) {
          if (setValue) {
            setValue(fieldName, file);
          } else if (onChange) {
            onChange(id, file);
          }
        }
        if (setPreview) {
          setPreview(URL.createObjectURL(file));
        }
        setError(null);
      });
    },
    [fieldName, id, onChange, setPreview, setValue],
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    onDrop,
    maxFiles,
    accept: accept,
    maxSize: maxSize,
  });

  React.useEffect(() => {
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === "file-too-large") {
          setError(`File size exceeded 2MB`);
        }

        if (err.code === "file-invalid-type") {
          setError(`File type must be an image or pdf`);
        }
      });
    });
  }, [fileRejections]);

  return (
    <div className={clsx("flex flex-col items-center", className)}>
      {(!acceptOneFile || filename == null) && (
        <div {...getRootProps()} className={sizes[size]}>
          <input {...getInputProps()} />
          <div className="flex flex-col my-2">
            <span
              className={clsx(
                "p-4 text-sky-500 uppercase font-extrabold text-sm lg:text-base border-2 border-gray-400 bg-white cursor-pointer mb-2 flex justify-center items-center disabled:opacity-70 active:translate-y-0.5 active:border-b-transparent transition duration-200 ease-in-out rounded-xl disabled:cursor-not-allowed focus:outline-none border-b-4",
                sizes[size],
              )}
            >
              Upload File
            </span>
          </div>
        </div>
      )}
      <p
        className={clsx(
          `text-${
            !acceptOneFile || filename == null ? "sm" : "xl"
          } font-bold mb-2`,
          variants[variant],
        )}
      >
        {filename ?? "No file selected"}
      </p>
      {(!acceptOneFile || filename == null) && (
        <p
          className={clsx("text-sm lg:text-base font-bold", variants[variant])}
        >
          Maximum size is 1 GB
        </p>
      )}
      <div className="h-1 my-1">
        <div
          role="alert"
          aria-label={error}
          className="text-sm font-semibold text-red-500"
        >
          {error}
        </div>
      </div>
    </div>
  );
};
