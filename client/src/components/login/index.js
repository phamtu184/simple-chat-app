import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import Background from "../../image/purple-night-wallpaper.jpg";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";
import { loginForm, registerForm } from "../../action";

import { useSelector, useDispatch } from "react-redux";
import { LoginProvider } from "./context";

const FormBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
  animation-delay: 0.5s;
  animation-duration: 2s;
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
export default function Login() {
  const isLoginForm = useSelector((state) => state.loginFormReducer);
  const dispatch = useDispatch();
  const signInClass = classNames(
    "inline-block px-4 py-1 cursor-pointer uppercase font-semibold rounded",
    { "bg-gray-300": isLoginForm, "text-gray-500": !isLoginForm }
  );
  const signUpClass = classNames(
    "inline-block px-4 py-1 cursor-pointer uppercase font-semibold rounded",
    { "bg-gray-300": !isLoginForm, "text-gray-500": isLoginForm }
  );
  return (
    <LoginProvider>
      <DivBody className="bg-scroll bg-no-repeat bg-center bg-cover">
        <FormBox className="fadeInDown">
          <div
            className="bg-gray-100 rounded-lg p-8 text-center shadow-md p-0"
            style={{ width: "450px" }}
          >
            <div>
              <H2Title
                onClick={() => dispatch(loginForm())}
                className={signInClass}
              >
                ĐĂNG NHẬP
              </H2Title>
              <H2Title
                onClick={() => dispatch(registerForm())}
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
    </LoginProvider>
  );
}
