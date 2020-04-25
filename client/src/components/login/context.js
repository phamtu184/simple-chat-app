import React, { useState, createContext, useRef } from "react";
import axios from "axios";
import url from "../../config/url";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginForm } from "../../action";
import { useHistory } from "react-router-dom";

export const LoginContext = createContext();

export function LoginProvider(props) {
  const usernameLoginRef = useRef(null);
  const passwordLoginRef = useRef(null);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCfRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const registerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const info = {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      passwordCf: passwordCfRef.current.value,
    };
    if (!info.username || !info.password || !info.passwordCf) {
      toast.error("Vui lòng điền đầy đủ các trường!");
    } else if (info.password !== info.passwordCf) {
      toast.error("Xác nhận mật khẩu không chính xác!");
    } else if (info.username.length < 3) {
      toast.error("Tên đăng nhập phải ít nhất 3 kí tự!");
    } else if (info.password.length < 3) {
      toast.error("Mật khẩu phải ít nhất 3 kí tự!");
    } else {
      axios
        .post(`${url.LOCAL}/api/register`, {
          username: info.username,
          password: info.password,
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(loginForm());
            toast.success("Đăng kí thành công");
            usernameLoginRef.current.value = info.username;
            usernameRef.current.value = "";
          }
        })
        .catch((e) => {
          if (e) {
            toast.error(e.response.data.message);
          }
        });
    }
    setLoading(false);
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    const usernameValue = usernameLoginRef.current.value;
    const passwordValue = passwordLoginRef.current.value;
    if (!usernameValue || !passwordValue) {
      return toast.error("Vui lòng điền đầy đủ các trường!");
    }
    axios
      .post(`${url.LOCAL}/api/login`, {
        username: usernameValue,
        password: passwordValue,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.dismiss();
          history.push("/chat");
          toast.success("Đăng nhập thành công");
        }
        console.log(res.status);
      })
      .catch((e) => {
        if (e) {
          toast.error(e.response.data.message);
        }
      });
  };
  return (
    <LoginContext.Provider
      value={{
        usernameRef,
        passwordRef,
        passwordCfRef,
        isLoading,
        registerSubmit,
        // login
        usernameLoginRef,
        passwordLoginRef,
        loginSubmit,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
}
