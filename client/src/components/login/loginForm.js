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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const buttonClass = classNames("btn-login fadeIn animated", {
    "bg-blue-500 hover:bg-blue-400": !isLoading,
    "bg-gray-500 cursor-not-allowed": isLoading,
  });
  return (
    <>
      <div className="fadeIn animated">
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
          className="input-login fadeIn animated "
          name="username"
          placeholder="Tài khoản"
          autoComplete="off"
          ref={usernameLoginRef}
          maxLength={45}
        />
        <input
          type="password"
          className="input-login fadeIn animated"
          name="password"
          placeholder="Mật khẩu"
          autoComplete="off"
          ref={passwordLoginRef}
          maxLength={45}
        />
        <button className={buttonClass} disabled={isLoading}>
          <span className="flex justify-center items-center content-center">
            {isLoading && <div className="lds-dual-ring"></div>}
            Đăng Nhập
          </span>
        </button>
      </form>
    </>
  );
}
