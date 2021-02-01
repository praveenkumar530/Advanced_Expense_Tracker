import React from "react";

function HeaderComponent({ refToHeader }) {
  return <div ref={refToHeader}>EXPENSE TRACKER</div>;
}

export default HeaderComponent;
