import React from "react";
import styled, { keyframes } from "styled-components";

const loaderKeyframes = keyframes`
0% {
  transform: scale(1);
}
20% {
  transform: scale(1, 2);
}
40% {
  transform: scale(1);
}
`;
const Loader = styled.div`
  overflow: hidden;
  width: 100%;
`;
const GoogleLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  width: 100px;
  height: 100px;
`;
const GoogleLoaderBar = styled.div`
  display: inline-block;
  width: 5px;
  height: 50px;
  border-radius: 5px;
  margin: 2px;
  animation: ${loaderKeyframes} 1s ease-in-out infinite;
  &:nth-child(1) {
    animation-delay: 0;
  }
  &:nth-child(2) {
    animation-delay: 0.1s;
  }
  &:nth-child(3) {
    animation-delay: 0.2s;
  }
  &:nth-child(4) {
    animation-delay: 0.3s;
  }
`;
export default function PartLoader() {
  return (
    <Loader className="h-full relative">
      <GoogleLoader
        className="absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <GoogleLoaderBar className="bg-green-600"></GoogleLoaderBar>
        <GoogleLoaderBar className="bg-green-600"></GoogleLoaderBar>
        <GoogleLoaderBar className="bg-green-600"></GoogleLoaderBar>
        <GoogleLoaderBar className="bg-green-600"></GoogleLoaderBar>
      </GoogleLoader>
    </Loader>
  );
}
