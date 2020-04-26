import React, { useContext } from "react";
import styled from "styled-components";
import classNames from "classnames";
import Background from "../../image/purple-night-wallpaper.jpg";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { LoginContext, LoginProvider } from "./context";

const FormBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  animation-delay: 0.25s;
  animation-duration: 1.5s;
`;
const H2Title = styled.h2`
  &:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
  }
  &:hover:after {
    width: 100%;
  }
`;

const DivBody = styled.div`
  background-image: url('${Background}');
  width: 100%;
  height: 100vh;
  position: relative;
`;
function Login() {
  const { isLoginForm, setIsLoginForm } = useContext(LoginContext);
  const signInClass = classNames(
    "inline-block px-4 py-1 cursor-pointer uppercase font-semibold rounded",
    { "bg-gray-300": isLoginForm, "text-gray-500": !isLoginForm }
  );
  const signUpClass = classNames(
    "inline-block px-4 py-1 cursor-pointer uppercase font-semibold rounded",
    { "bg-gray-300": !isLoginForm, "text-gray-500": isLoginForm }
  );
  return (
    <DivBody className="bg-scroll bg-no-repeat bg-center bg-cover">
      <FormBox className="fadeInDown">
        <div
          className="bg-gray-100 rounded-lg p-8 text-center shadow-md p-0"
          style={{ width: "450px" }}
        >
          <div>
            <H2Title
              onClick={() => setIsLoginForm(true)}
              className={signInClass}
            >
              ĐĂNG NHẬP
            </H2Title>
            <H2Title
              onClick={() => setIsLoginForm(false)}
              className={signUpClass}
            >
              ĐĂNG KÍ
            </H2Title>
          </div>
          {isLoginForm ? <LoginForm /> : <RegisterForm />}

          <div className="bg-gray-100 border-gray-500 border-t p-6 w-full"></div>
        </div>
      </FormBox>
    </DivBody>
  );
}

export default function Provider() {
  return (
    <LoginProvider>
      <Login />
    </LoginProvider>
  );
}
