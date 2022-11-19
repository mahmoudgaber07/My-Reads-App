import React from "react";

export const BookShelfChanger = () => {
  const options = [
    {
      name: "Move To",
      value: "",
      disabled: true,
    },
    {
      name: "Current Reading",
      value: "currentlyReading",
      disabled: false,
    },
    {
      name: "Want To Read",
      value: "wantToRead",
      disabled: false,
    },
    {
      name: "Read",
      value: "read",
      disabled: false,
    },
    {
      name: "Remove",
      value: "none",
      disabled: false,
    },
  ];
  return (
    <>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.name}
        </option>
      ))}
    </>
  );
};
