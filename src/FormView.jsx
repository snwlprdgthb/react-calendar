import React from "react";

const FormView = ({
  closeModal,
  y,
  value,
  x,
  onSubmit,
  onChangeTitle,
  onChangeBody
}) => {
  console.log("VUEWWWWW");
  return (
    <div
      className="myForm"
      style={{
        top: `${y + 50}px`,
        left: `${x - 100}px`
      }}
    >
      <div className="close" onClick={closeModal}>
        <div>X</div>
      </div>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <input
          placeholder={value ? value.title : ""}
          onChange={e => onChangeTitle(e)}
          type="text"
        />

        <input
          placeholder={value ? value.body : ""}
          onChange={e => onChangeBody(e)}
          type="text"
        />
        <div className="buttons">
          <button
            style={{ color: "red" }}
            onClick={closeModal}
            className="button"
          >
            Cancel
          </button>
          <button className="button" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormView;
