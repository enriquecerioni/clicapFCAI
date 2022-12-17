import React, { useContext } from "react";
import "./deliveryTask.css";

export const MembersChips = ({ membersToSend, setMembersToSend }) => {
  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      var value = membersToSend.value.trim();
      if (value && isValid(value)) {
        setMembersToSend({
          items: [...membersToSend.items, membersToSend.value],
          value: "",
        });
      }
    }
  };

  const handleChange = (e) => {
    setMembersToSend({
      items: [...membersToSend.items],
      value: e.target.value,
      error: null,
    });
  };

  const handleDelete = (item) => {
    setMembersToSend({
      items: membersToSend.items.filter((i) => i !== item),
      value: "",
      error: null,
    });
  };

  const handlePaste = (evt) => {
    evt.preventDefault();

    var paste = evt.clipboardData.getData("text");
    var emails = paste.match(/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/g);

    if (emails) {
      var toBeAdded = emails.filter((email) => !isInList(email));
      setMembersToSend({
        items: [...membersToSend.items, ...toBeAdded],
      });
    }
  };
  const isInList = (email) => {
    return membersToSend.items.includes(email);
  };

  const isEmail = (email) => {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  };

  const isValid = (email) => {
    let error = null;

    if (isInList(email)) {
      error = `Autor repetido`;
    }

    /*    if (!isEmail(email)) {
      error = `Error al escribir el autor - Error de formato`;
    } */

    if (error) {
      setMembersToSend({
        items: [...membersToSend.items],
        value: email,
        error,
      });
      return false;
    }

    return true;
  };

  return (
    <>
      {membersToSend.items.map((item, i) => (
        <div className="tag-item" key={i}>
          {item}
          <button
            type="button"
            className="button"
            onClick={() => handleDelete(item)}
          >
            &times;
          </button>
        </div>
      ))}

      <input
        /*                 className={"input " + (membersToSend.error && " has-error")} */
        className={`input ${membersToSend.error ? "has-error" : ""}`}
        value={membersToSend.value}
        placeholder={"Ivan Castro, Enrique Cerioni"}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleChange(e)}
        onPaste={handlePaste}
      />

      {membersToSend.error && <p className="error">{membersToSend.error}</p>}
    </>
  );
};
