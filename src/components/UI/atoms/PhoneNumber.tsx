import { useState } from "react";
import TextField from "@mui/material/TextField";

type PhoneNumberProps = {
  name?: string;
  label?: string;
  error?: boolean;
  helperText?: string;
  onChange?: Function;
};
export default function PhoneNumber({
  name,
  label,
  error,
  helperText,
  onChange = (f: any) => f,
}: PhoneNumberProps) {
  const [value, setValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    if (e.target.value.length < 14) {
      const newValue = e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(-{1,2})$/g, "");
      setValue(newValue);
      onChange(e);
    }
  };

  ///////name 넘겨받아서 넣어주고 form 체크 하는거 age 예시보고 해주기
  return (
    <TextField
      name={name}
      label={label}
      variant="standard"
      value={value}
      error={error}
      helperText={helperText}
      onChange={handleChange}
    />
  );
}
