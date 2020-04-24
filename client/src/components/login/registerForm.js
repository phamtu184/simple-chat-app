import React from "react";
import Profile from "../../image/profile.svg";
export default function RegisterForm() {
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

      <input
        type="text"
        className="my-4 p-4 w-11/12 mx-auto rounded transition-all duration-500  block text-lg bg-gray-300 hover:bg-white hover:border-gray-500 border border-transparent focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 "
        name="username"
        placeholder="Tài khoản"
      />
      <input
        type="text"
        className="my-4 p-4 w-11/12 mx-auto rounded transition-all duration-500 block text-lg bg-gray-300 hover:bg-white hover:border-gray-500 border border-transparent focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 "
        name="password"
        placeholder="Mật khẩu"
      />
      <input
        type="text"
        className="my-4 p-4 w-11/12 mx-auto rounded transition-all duration-500 block text-lg bg-gray-300 hover:bg-white hover:border-gray-500 border border-transparent focus:outline-none focus:bg-white focus:shadow-outline focus:border-gray-300 "
        name="passwordCf"
        placeholder="Xác nhận mật khẩu"
      />
      <button className="w-3/6 transition-all duration-500 px-4 py-2 mb-4 mx-auto bg-blue-500 hover:bg-blue-400 text-white rounded block focus:outline-none focus:shadow-outline">
        Đăng Kí
      </button>
    </>
  );
}
