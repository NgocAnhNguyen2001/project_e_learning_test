import * as React from "react";
import { BsCircleFill, BsCircle } from "react-icons/bs";
import { HiBackspace } from "react-icons/hi";

import { FieldWrapper } from "@/components/Form/FieldWrapper";
import { useStore } from "utils/hooks/zustand";

import { Button } from "../Elements";

type NumberPasscodeProps = {
  codeOnclick?: (data: number) => Promise<any>;
  backSpace?: () => Promise<any>;
  passcode?: string;
  buttonColor?: string;
  classnames?: string;
  setPasscode: (type: any, data: any) => void;
  error: any;
  clear?: () => Promise<any>;
};

export const NumberPasscode = ({
  setPasscode,
  error,
  classnames,
  buttonColor,
}: NumberPasscodeProps): React.ReactElement => {
  const [password, setPassword] = React.useState("");

  const user = useStore((state) => state.user);
  // ============EFFECTS
  React.useEffect(() => {
    setPasscode("loginPattern", password);
  }, [password]);

  // ============FUNCTIONS
  const enterPassword = async (data: number): Promise<any> => {
    if (password.length < 4) setPassword(`${password}${data.toString()}`);
  };

  const backSpace = async (): Promise<any> => {
    setPassword(password.slice(0, -1));
  };

  const clear = async (): Promise<any> => {
    setPassword("");
  };

  const getPasswordIcons = (): Array<React.ReactElement> => {
    const icons = [];

    for (let i = 1; i <= 4; ++i) {
      if (password?.length >= i) {
        icons.push(<BsCircleFill color={buttonColor} size={25} />);
      } else {
        icons.push(<BsCircle color={buttonColor} size={25} />);
      }
    }
    return icons;
  };
  const comp = [
    <Button
      key="clear-numpad"
      className={`w-full h-4/5 ${classnames}  ${
        password.length == 0 && "disbaled"
      }`}
      variant="purple"
      size="sm"
      disabled={password.length == 0}
      onClick={(): Promise<void> => clear()}
    >
      Clear
    </Button>,

    <Button
      key="backspace-numpad"
      className={"w-full h-4/5 " + classnames}
      size="sm"
      disabled={password.length == 0}
      variant="purple"
      onClick={(): Promise<void> => backSpace()}
    >
      <HiBackspace />
    </Button>,
    <Button
      key="zero-numpad"
      className={"w-full h-4/5 " + classnames}
      size="sm"
      onClick={(): Promise<void> => enterPassword(0)}
      variant="purple"
    >
      0
    </Button>,
  ];

  return (
    <>
      {user?.role !== "PARENT" && (
        <div className="flex space-x-10 my-2 lg:my-4 pb-4">
          {getPasswordIcons()}
        </div>
      )}
      <FieldWrapper error={error} errorClassName="text-[#270E67]">
        <div className="grid grid-cols-4 gap-x-2 w-[325px]">
          {Array.from(Array(12), (e: any, i: number) => {
            if ((i + 1) % 4 == 0) {
              return comp[Math.floor((i + 1) / 4) - 1];
            }
            return (
              <Button
                key={i + 1}
                className={"w-full h-4/5 " + classnames}
                size="sm"
                variant="purple"
                onClick={(): Promise<void> =>
                  enterPassword(i + 1 - Math.floor((i + 1) / 4))
                }
              >
                {i + 1 - Math.floor((i + 1) / 4)}
              </Button>
            );
          })}
        </div>
      </FieldWrapper>
    </>
  );
};
