import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import Profile from "../../image/profile.svg";
import { LoginContext } from "./context";

export default function LoginForm() {
  const {
    usernameLoginRef,
    passwordLoginRef,
    loginSubmit,
    isLoading,
  } = useContext(LoginContext);
  useEffect(() => {
    usernameLoginRef.current.focus();
  }, []);
  const buttonClass = classNames("btn-login", {
    "bg-blue-500 hover:bg-blue-400": !isLoading,
    "bg-gray-500 cursor-not-allowed": isLoading,
  });
  return (
    <>
      <div>
        <img
          src={Profile}
          id="icon"
          alt="User Icon"
          className="w-40 h-40 mx-auto my-8 rounded-full"
        />
      </div>
      <form onSubmit={loginSubmit}>
        <input
          type="text"
          className="input-login "
          name="username"
          placeholder="Tài khoản"
          autoComplete="off"
          ref={usernameLoginRef}
          maxLength={45}
        />
        <input
          type="password"
          className="input-login"
          name="password"
          placeholder="Mật khẩu"
          autoComplete="off"
          ref={passwordLoginRef}
          maxLength={45}
        />
        <button className={buttonClass}>Đăng nhập</button>
      </form>
    </>
  );
}
