import { FC, ReactNode } from "react";
import styles from "./UserForm.module.scss";

interface UserFormProps {
  name: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isValid?: boolean;
  isDirty?: boolean;
  isLoading?: boolean;
  title?: string;
  children?: ReactNode
}

const UserForm: FC<UserFormProps> = (props) => {
  return (
    <form
      className={styles.UserForm}
      name={props.name}
      noValidate
      onSubmit={props.onSubmit}
    >
      {props.children}

    </form>
  );
};

export default UserForm;
