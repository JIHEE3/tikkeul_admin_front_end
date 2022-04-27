import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import Form from "components/templates/auth/Form";
import GoMainButton from "components/UI/atoms/GoMainButton";
import AvatarDropzone from "components/UI/atoms/AvatarDropzone";
import SelectGender from "components/UI/atoms/SelectGender";
import PhoneNumber from "components/UI/atoms/PhoneNumber";
import { isExistedId, signUp } from "api/auth";
import {
  idPatternIsOk,
  pwPatternIsOk,
  userNamePatternIsOk,
  birthDatePatternIsOk,
  emailIsOk,
} from "utils/validate";
import IUser from "types/IUser";

export interface IError {
  [name: string]: string;
}

export default function SignUp() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [error, setError] = useState<IError>({
    id: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    email: "",
    phoneNumber: "",
  });

  const model = useRef<IUser>({
    id: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    gender: "",
    phoneNumber: "",
    avatar: null,
  });

  const getModel = () => {
    return model.current;
  };

  const setModel = ({
    name,
    value,
  }: {
    name: string;
    value: string | File;
  }) => {
    model.current = {
      ...getModel(),
      [name]: value,
    };
  };

  const validate = async ({
    name,
    value,
  }: {
    name: string;
    value: string;
  }): Promise<IError> => {
    const newError: IError = {};

    if (name === "id") {
      newError.id = "";
      if (value === "") {
        newError.id = "필수사항입니다.";
      } else {
        if (!idPatternIsOk(value)) {
          newError.id =
            "영어 소문자로 시작하는, 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
        } else {
          //userId 중복 체크
          const res = await isExistedId({ id: value });

          if (res.data.isExist) {
            newError.id = "중복된 아이디 입니다.";
          }
        }
      }
    }

    // 비밀번호, 비밀번호 확인 일치하는지 체크
    if (name === "confirmPassword" || name === "password") {
      const { password, confirmPassword } = getModel();
      newError.password = "";
      if (password === "") {
        newError.password = "필수사항입니다.";
      } else if (!pwPatternIsOk(password)) {
        newError.password =
          "8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합해 주세요.";
      } else {
        const compareVal = name === "password" ? confirmPassword : password;
        newError.confirmPassword = "";
        if (value !== compareVal) {
          newError.confirmPassword = "비밀번호가 일치하지 않습니다.";
        }
      }
    }

    if (name === "firstName" || name === "lastName") {
      newError[name] = "";
      if (value === "") {
        newError[name] = "필수사항입니다.";
      } else if (!userNamePatternIsOk(value)) {
        newError[name] =
          "한글과 영문 대 소문자를 사용하세요. (특수기호, 공백 사용 불가)";
      }
    }

    if (name === "birthDate") {
      newError.birthDate = "";
      if (value === "") {
        newError.birthDate = "필수사항입니다.";
      } else if (!birthDatePatternIsOk(value)) {
        newError.birthDate = "생년월일 8자리를 입력해 주세요.";
      }
    }

    if (name === "email") {
      newError.email = "";
      if (value === "") {
        newError.email = "필수사항입니다.";
      } else if (!emailIsOk(value)) {
        newError.email = "이메일 주소를 다시 확인해주세요.";
      }
    }

    if (name === "phoneNumber") {
      newError.phoneNumber = "";
      if (value === "") {
        newError.phoneNumber = "필수사항입니다.";
      }
    }

    return newError;
  };

  const handleChange = async (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value: inputValue } = e.target;
    const value = inputValue.trim();

    setModel({ name, value });

    const newError = await validate({ name, value });

    setError({
      ...error,
      ...newError,
    });
  };

  /**
   * 회원가입
   */
  const handleSignUpClick = async () => {
    const model = getModel();
    let newError = { ...error };

    for (let name in model) {
      if (model.hasOwnProperty(name)) {
        const value = model[name as keyof IUser] as string;
        newError = {
          ...newError,
          ...(await validate({ name, value })),
        };
      }
    }

    setError({
      ...newError,
    });

    let isOk = true;

    for (let name in newError) {
      if (error.hasOwnProperty(name)) {
        if (!!error[name]) {
          isOk = false;
          break;
        }
      }
    }

    if (isOk) {
      const res = await signUp({ ...model });
      if (res.data.resultCode === 1) {
        // 회원가입 성공 시 로그인 페이지로 이동
        enqueueSnackbar("회원가입 성공!", { variant: "success" });
        if (!!res.data.message) {
          enqueueSnackbar(res.data.message, { variant: "warning" });
        }
        navigate("/signin");
      } else {
        enqueueSnackbar(res.data.message, { variant: "error" });
      }
    }
  };

  // 프로필 사진 변경시 회원가입 model에 프로필 사진 set
  const handleChangeAvatar = (file: File) => {
    setModel({ name: "avatar", value: file });
  };

  return (
    <Form title="Sign Up">
      <AvatarDropzone onChangeAvatar={handleChangeAvatar} />
      <Stack spacing={2}>
        <TextField
          name="id"
          label="ID"
          variant="standard"
          error={!!error.id}
          helperText={error.id}
          onChange={handleChange}
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          variant="standard"
          error={!!error.password}
          helperText={error.password}
          onChange={handleChange}
        />
        <TextField
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          variant="standard"
          error={!!error.confirmPassword}
          helperText={error.confirmPassword}
          onChange={handleChange}
        />
        <TextField
          name="firstName"
          label="성"
          variant="standard"
          error={!!error.firstName}
          helperText={error.firstName}
          onChange={handleChange}
        />
        <TextField
          name="lastName"
          label="이름"
          variant="standard"
          error={!!error.lastName}
          helperText={error.lastName}
          onChange={handleChange}
        />
        <TextField
          name="birthDate"
          label="생년월일"
          variant="standard"
          placeholder="19900101(8자)"
          error={!!error.birthDate}
          helperText={error.birthDate}
          onChange={handleChange}
        />
        <SelectGender name="gender" label="성별" onChange={handleChange} />
        <TextField
          name="email"
          label="이메일"
          variant="standard"
          placeholder="abcd@gmail.com"
          error={!!error.email}
          helperText={error.email}
          onChange={handleChange}
        />
        <PhoneNumber
          name="phoneNumber"
          label="휴대전화"
          error={!!error.phoneNumber}
          helperText={error.phoneNumber}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSignUpClick}
          type="button"
        >
          Sign Up
        </Button>
        <GoMainButton />
      </Stack>
    </Form>
  );
}
