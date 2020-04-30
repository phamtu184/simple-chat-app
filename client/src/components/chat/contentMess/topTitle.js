import React from "react";

export default function TopTitle(props) {
  const { name, time } = props;
  return (
    <div className="flex items-center w-full h-20 shadow">
      <div className="p-2 mr-2 inline-block">
        <div className="rounded-full bg-yellow-600 h-12 w-12 relative">
          <span
            className="absolute uppercase"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            {name.slice(0, 3) || "test"}
          </span>
        </div>
      </div>
      <div className=" truncate inline-block">
        <h2>{name || "test"}</h2>
        <p className="text-sm text-gray-600 -mt-1">{time || "hd 6h"}</p>
      </div>
    </div>
  );
}
