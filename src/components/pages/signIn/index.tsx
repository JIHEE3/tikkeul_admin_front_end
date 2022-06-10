import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Link from "@mui/material/Link";

import Form from "components/templates/auth/Form";

const initError = {
  id: false,
  password: false,
  failed: false,
};

export default function SignIn() {
  const navigate = useNavigate();
  const [model, setModel] = useState({
    id: "",
    password: "",
  });
  const [error, setError] = useState({
    ...initError,
  });

  const handleChange = (
    e: React.ChangeEvent<{ name: string; value: string }>
  ) => {
    const { name, value } = e.target;
    setError({
      ...initError,
      [name]: false,
    });

    if (value.trim() === "") {
      setError({
        ...initError,
        [name]: true,
      });
    }

    setModel({
      ...model,
      [name]: value,
    });
  };

  const handleSignInClick = () => {
    const { id, password } = model;

    if (!model.id || !model.password) {
      setError({
        ...initError,
        id: !model.id,
        password: !model.password,
      });
    }

    // signIn({ id, password }).then((res) => {
    //   const { data } = res;
    //   if (data.result) {
    //     // 로그인 성공 후 로그인한 user 정보 (userName, email, image ...) 를 로컬 스토리지에 저장
    //     localStorage.setItem('user', JSON.stringify(data.userInfo));
    //     // 로그인한 유저정보 redux에 저장
    //     dispatch(setUserInfo(data.userInfo));
    //     // tag 메인 페이지로 이동
    //     history.push(routes.tag);
    //   } else {
    //     setError({ ...initError, failed: true });
    //   }
    // });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSignInClick();
    }
  };

  return (
    <Form title="Sign In" maxWidth="xs">
      <Stack spacing={2}>
        <TextField
          name="id"
          label="ID"
          variant="standard"
          error={error.id}
          helperText={error.id ? "ID를 입력해 주세요" : ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <TextField
          name="password"
          label="Password"
          variant="standard"
          type="password"
          error={error.password}
          helperText={error.password ? "Password를 입력해 주세요" : ""}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <FormControl error={error.failed}>
          <FormHelperText>
            {error.failed ? "ID또는 Password가 일치하지 않습니다." : ""}
          </FormHelperText>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSignInClick}
        >
          Sign In
        </Button>
        <Stack spacing={1} alignItems="center">
          <Link href="/signup">Sign Up</Link>
        </Stack>
      </Stack>
    </Form>
  );
}
