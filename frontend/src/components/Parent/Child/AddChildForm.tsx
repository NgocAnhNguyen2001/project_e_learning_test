import React from "react";

import Section from "@/components/Elements/Section";
import { CreateChildInput } from "schema/generated/graphql";

import ChildForm from "./ChildForm";


interface IAddChildFormProps {
  onSubmit: (data: CreateChildInput) => void;
}

const AddChildForm = (props: IAddChildFormProps): React.ReactElement => {
  return (
    <Section size="lg">
      <ChildForm type="add" onSubmit={props.onSubmit} />
    </Section>
  );
};

export default AddChildForm;
