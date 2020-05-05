import React, { useState, createContext, useRef, useEffect } from "react";
import axios from "axios";
import url from "../../config/url";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import GetColor from "../../config/randomColor";

export const LoginContext = createContext();

export function LoginProvider(props) {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const usernameLoginRef = useRef(null);
  const passwordLoginRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCfRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const history = useHistory();
  const tokenAuth = localStorage.getItem("token-auth");
  useEffect(() => {
    if (tokenAuth) {
      axios
        .post(`${url.LOCAL}/api/isLogin`, { tokenAuth })
        .then((res) => {
          //console.log(res.data);
          history.push("/chat");
        })
        .catch((e) => console.log(e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const info = {
      username: usernameRef.current.value.toLowerCase().trim(),
      //.replace(/\s/g, ""),
      password: passwordRef.current.value,
      passwordCf: passwordCfRef.current.value,
    };
    if (!info.username || !info.password || !info.passwordCf) {
      toast.error("Vui lòng điền đầy đủ các trường!");
      setLoading(false);
    } else if (info.password !== info.passwordCf) {
      toast.error("Xác nhận mật khẩu không chính xác!");
      setLoading(false);
    } else if (info.username.length < 3) {
      toast.error("Tên đăng nhập phải ít nhất 3 kí tự!");
      setLoading(false);
    } else if (info.password.length < 3) {
      toast.error("Mật khẩu phải ít nhất 3 kí tự!");
      setLoading(false);
    } else if (info.password.length > 40 || info.username.length > 20) {
      toast.error("Tài khoản hoặc mật khẩu quá dài!");
      setLoading(false);
    } else {
      axios
        .post(`${url.LOCAL}/api/register`, {
          username: info.username,
          password: info.password,
          color: GetColor(),
        })
        .then((res) => {
          setLoading(false);
          toast.dismiss();
          setIsLoginForm(true);
          toast.success("Đăng kí thành công");
          usernameLoginRef.current.value = info.username;
        })
        .catch((e) => {
          if (e.response.data.message) {
            toast.error(e.response.data.message);
            setLoading(false);
          } else {
            toast.error("Lỗi server!");
            setLoading(false);
          }
        });
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const usernameValue = usernameLoginRef.current.value;
    const passwordValue = passwordLoginRef.current.value;
    if (!usernameValue || !passwordValue) {
      toast.error("Vui lòng điền đầy đủ các trường!");
      setLoading(false);
    } else {
      axios
        .post(`${url.LOCAL}/api/login`, {
          username: usernameValue,
          password: passwordValue,
        })
        .then((res) => {
          if (res.status === 200) {
            toast.dismiss();
            localStorage.setItem("token-auth", res.data.token);
            history.push("/chat");
            toast.success("Đăng nhập thành công");
            setLoading(false);
          } else {
            toast.error("Đăng nhập thất bại (lỗi server)");
            setLoading(false);
          }
        })
        .catch((e) => {
          if (e) {
            toast.error(e.response.data.message);
            setLoading(false);
          }
        });
    }
  };
  return (
    <LoginContext.Provider
      value={{
        isLoginForm,
        setIsLoginForm,
        // register
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
