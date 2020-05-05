import React from "react";
import styled, { keyframes } from "styled-components";

const typingKeyframes = keyframes`
0% {
  background-color: rgba(0, 0, 0, 1);
  box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
    24px 0px 0px 0px rgba(0, 0, 0, 0.2);
}
25% {
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 2),
    24px 0px 0px 0px rgba(0, 0, 0, 0.2);
}
75% {
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 12px 0px 0px 0px rgba(0, 0, 0, 0.2),
    24px 0px 0px 0px rgba(0, 0, 0, 1);
}
`;
const TypingLoad = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  -webkit-animation: ${typingKeyframes} 1s linear infinite alternate;
  -moz-animation: ${typingKeyframes} 1s linear infinite alternate;
  animation: ${typingKeyframes} 1s linear infinite alternate;
  margin: 46px auto; /* Not necessary- its only for layouting*/
  position: relative;
  left: -12px;
`;
export default function TypingLoader() {
  return (
    <div className="span w-12 h-6 ml-2 rounded-full bg-gray-200 inline-block flex items-center mt-4">
      <TypingLoad className="ml-2"></TypingLoad>
    </div>
  );
}
