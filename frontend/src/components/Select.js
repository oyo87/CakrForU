import React from "react";
import ReactSelect from "react-select";

function Select({ options, width, height, centerPlaceholder }) {
  const formattedOptions = options.map((option) => ({
    value: option,
    label: option,
  }));

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: width || "490px",
    }),
    control: (provided) => ({
      ...provided,
      minHeight: height || "58px",
      borderRadius: "0",
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: "0",
    }),
    option: (provided) => ({
      ...provided,
      textAlign: centerPlaceholder ? "center" : "inherit",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9e9e9e",
      textAlign: centerPlaceholder ? "center" : "inherit",
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: centerPlaceholder ? "center" : "inherit",
    }),
  };

  return (
    <ReactSelect
      styles={customStyles}
      options={formattedOptions}
      placeholder="선택"
    />
  );
}

export default Select;
