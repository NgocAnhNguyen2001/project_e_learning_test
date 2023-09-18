import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
  HiOutlineInformationCircle,
  HiX,
} from "react-icons/hi";

const icons = {
  info: (
    <HiOutlineInformationCircle
      className="w-6 h-6 text-blue-500"
      aria-hidden="true"
    />
  ),
  success: (
    <HiOutlineCheckCircle
      className="w-6 h-6 text-green-500"
      aria-hidden="true"
    />
  ),
  warning: (
    <HiOutlineExclamationCircle
      className="w-6 h-6 text-yellow-500"
      aria-hidden="true"
    />
  ),
  error: (
    <HiOutlineXCircle className="w-6 h-6 text-red-500" aria-hidden="true" />
  ),
};

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps): React.ReactElement => {
  return (
    <div className="flex flex-col items-center w-full space-y-4 sm:items-end">
      <Transition
        show={true}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5">
          <div className="p-4" role="alert" aria-label={title}>
            <div className="flex items-start">
              <div className="flex-shrink-0">{icons[type]}</div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-500">{message}</p>
              </div>
              <div className="flex flex-shrink-0 ml-4">
                <button
                  className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(): void => {
                    onDismiss(id);
                  }}
                >
                  <span className="sr-only">Close</span>
                  <HiX className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};
