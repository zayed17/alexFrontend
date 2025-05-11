import React from "react";

const MainHeading = ({text,className}:{text:string ,className?:string}) => {
  return (
    <h2 className={`font-presto text-[48px] font-light text-[#071C35] ${className}`}>
      {text}
    </h2>
  );
};

export default MainHeading;