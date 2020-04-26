import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import Profile from "../../image/profile.svg";
import { LoginContext } from "./context";

export default function RegisterForm() {
  const {
    usernameRef,
    passwordRef,
    passwordCfRef,
    isLoading,
    registerSubmit,
  } = useContext(LoginContext);
  useEffect(() => {
    usernameRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const buttonClass = classNames("btn-login fadeIn animated", {
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
          className="w-40 h-40 mx-auto my-8 rounded-full fadeIn animated"
        />
      </div>
      <form onSubmit={registerSubmit}>
        <input
          type="text"
          className="input-login fadeIn animated"
          name="username"
          placeholder="Tài khoản"
          autoComplete="off"
          ref={usernameRef}
          maxLength={45}
        />
        <input
          type="password"
          className="input-login fadeIn animated"
          name="password"
          placeholder="Mật khẩu"
          autoComplete="off"
          ref={passwordRef}
          maxLength={45}
        />
        <input
          type="password"
          className="input-login fadeIn animated"
          name="passwordCf"
          placeholder="Xác nhận mật khẩu"
          autoComplete="off"
          ref={passwordCfRef}
          maxLength={45}
        />
        <button type="submit" className={buttonClass} disabled={isLoading}>
          <span className="flex justify-center items-center content-center">
            {isLoading && <div className="lds-dual-ring"></div>}
            Đăng Kí
          </span>
        </button>
      </form>
    </>
  );
}
