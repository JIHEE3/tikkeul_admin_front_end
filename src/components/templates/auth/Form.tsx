import React from "react";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { deepPurple, blue } from "@mui/material/colors";

const Background = styled("div")`
  height: 100vh;
  overflow: auto;
  background: linear-gradient(90deg, ${deepPurple[800]} 9%, ${blue[500]} 93%);
  display: flex;
`;

const RootContainer = styled(Container)`
  background-color: #fff;
  padding: 60px 50px 90px;
  margin-bottom: 50px;
  border-radius: 10px;
  boxshadow: 0 20px 40px 0 rgba(0, 0, 0, 0.15);
  margin: auto;
`;

const TitleTypography = styled(Typography)`
  font-weight: 400;
`;

const StyledForm = styled("form")`
  display: flex;
  flex-direction: column;
  "& > *": {
    margin-top: 15px;
  }
`;

type FormProps = {
  title: string;
  children?: React.ReactNode;
};

export default function Form({ title, children }: FormProps) {
  return (
    <Background>
      <RootContainer maxWidth="sm">
        <TitleTypography
          variant="h2"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          {title}
        </TitleTypography>
        <StyledForm autoComplete="off">{children}</StyledForm>
      </RootContainer>
    </Background>
  );
}
