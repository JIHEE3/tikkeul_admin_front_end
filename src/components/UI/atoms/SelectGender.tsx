import * as React from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

export default function SelectGender() {
  const [gender, setGender] = React.useState("N");

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>성별</InputLabel>
      <Select value={gender} onChange={handleChange} label="성별">
        <MenuItem value="N">비공개</MenuItem>
        <MenuItem value="M">남성</MenuItem>
        <MenuItem value="F">여성</MenuItem>
      </Select>
    </FormControl>
  );
}
