import { FC, ReactNode } from "react";
import "./UserForm.scss";
import ButtonForm from "../../../shared/button/button";

interface UserFormProps {
  name: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  isDirty: boolean;
  title?: string;
  children: ReactNode
}

const UserForm: FC<UserFormProps> = (props) => {
  return (
    <form
      className="UserForm"
      name={props.name}
      noValidate
      onSubmit={props.onSubmit}
    >
      {props.children}

      <ButtonForm
        type="submit"
        disabled={!props.isValid || !props.isDirty}
        title = {props.title || "Submit"}
      />
    </form>
  );
};

export default UserForm;
