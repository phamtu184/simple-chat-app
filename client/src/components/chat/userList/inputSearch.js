import React, { useContext } from "react";
import styled from "styled-components";
import SearchIcon from "../../../image/search-solid.svg";
import { ChatContext } from "../context";

const InputContainer = styled.div`
  position: relative;
  img {
    position: absolute;
    bottom: 18%;
    left: 8%;
    width: 20px;
    height: 20px;
  }
`;
export default function InputSearch() {
  const { handleChangeSearch, inputSearch, searchUsers } = useContext(
    ChatContext
  );
  return (
    <div className="p-2 ">
      <InputContainer>
        <img src={SearchIcon} alt="SearchIcon" />
        <input
          className="my-2 p-2 w-11/12 mx-auto rounded-full transition-all 
          duration-500  block text-sm bg-gray-200 border border-transparent 
          focus:bg-white focus:shadow-outline focus:border-gray-300 focus:outline-none md:pl-10 pl-6"
          placeholder="Tìm kiếm"
          onChange={handleChangeSearch}
          value={inputSearch}
          onBlur={searchUsers}
        />
      </InputContainer>
    </div>
  );
}
