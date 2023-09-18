import * as React from "react";

import { Button } from "../Elements";

type FormFooterProps = {
  onCancel?: any;
  onSubmit?: any;
};

export const FormFooter = ({
  onCancel,
  onSubmit,
}: FormFooterProps): React.ReactElement => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 w-screen py-10 px-44 border-t-2 border-t-gray-300 flex flex-row justify-between bg-white z-10">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="green" type="submit" onClick={onSubmit} className="navigator_tour_40">
        Confirm
      </Button>
    </footer>
  );
};
