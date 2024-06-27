import { TextInput } from "@mantine/core";
import { FC, ChangeEvent } from "react";

interface LoginFormProps {
  inputVal: string;
  setInputVal: (value: string) => void;
  placeHolder: string;
}

const LoginForm: FC<LoginFormProps> = ({
  inputVal,
  setInputVal,
  placeHolder,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputVal(event.target.value);
  };

  return (
    <TextInput
      placeholder={placeHolder}
      value={inputVal}
      onChange={handleInputChange}
    />
  );
};

export default LoginForm;
