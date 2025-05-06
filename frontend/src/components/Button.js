import React from "react";

function Button({ children, type, onClick }) {
  return (
    <button
      class="button"
      onClick={onClick}
      //If not submit, then return button
      type={type === "submit" ? "submit" : "button"}
    >
      {children}
    </button>
  );
}

function FilterButton({ children }) {
  return <select class="filterbutton">{children}</select>;
}

export { FilterButton };
export default Button;
