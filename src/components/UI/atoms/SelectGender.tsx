import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

type SelectGenderProps = {
  name?: string;
  label?: string;
  onChange?: Function;
};

export default function SelectGender({
  name,
  label,
  onChange = (f: any) => f,
}: SelectGenderProps) {
  const [gender, setGender] = React.useState("N");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
    onChange(event);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select value={gender} name={name} onChange={handleChange}>
        <MenuItem value="N">비공개</MenuItem>
        <MenuItem value="M">남성</MenuItem>
        <MenuItem value="F">여성</MenuItem>
      </Select>
    </FormControl>
  );
}
