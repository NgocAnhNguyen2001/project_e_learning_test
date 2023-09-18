import React from "react";

import Section from "@/components/Elements/Section";
import { Child } from "@/types/Child";
import { CreateChildInput } from "schema/generated/graphql";

import ChildForm from "./ChildForm";


interface IEditChildFormProps {
  onSubmit: (data: CreateChildInput) => void;
  onDelete: () => void;
  child: Child;
}

const EditChildForm = (props: IEditChildFormProps): React.ReactElement => {
  return (
    <Section>
      <ChildForm
        type="edit"
        onSubmit={props.onSubmit}
        onDelete={props.onDelete}
        child={props.child}
      />
    </Section>
  );
};

export default EditChildForm;
