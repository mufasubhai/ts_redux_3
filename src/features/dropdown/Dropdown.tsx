
import {DropdownItem} from './dropdownSlice'




import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
// import { connect } from "react-redux";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { connect } from 'react-redux';

// let testValues = [
//   { id: 1, value: "test1" },
//   { id: 2, value: "test2" },
//   { id: 3, value: "test3" },
// ];

const mSTP = (state) => ({
  currentDepartment: state
});

const mDTP = () => ({});

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

function Dropdown({
  type,
  title,
  items,
  selected,
  multiSelect = true,
  selectedStates,
}) {


  let currentDepartment = ["test"]
  
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(title);
  const toggle = (open) => setOpen(open);

  // useEffect(() => {
  //   setSelection([]);
  //   setCurrentTitle(title);
  // }, [reset]);

  useEffect(() => { 

    if (currentDepartment.length === 1) {
      setCurrentTitle(currentDepartment[0])
    } else if (currentDepartment.length === 0) {
      setCurrentTitle('Select Department')
    } else {
      setCurrentTitle('Multiple Departments')
    }
  }, [currentDepartment])

  Dropdown.handleClickOutside = (event) => {
    setOpen(false);
  };

  function handleOnClick(item) {
    if (!selection.some((current) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item]);
        setCurrentTitle(item.value);
      } else if (multiSelect) {
        setSelection([...selection, item]);
      }
    } else {
      let selectionAfterRemoval = selection;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current) => current.id !== item.id
      );
      setSelection([...selectionAfterRemoval]);
      setCurrentTitle(selection[0].value);
    }
  }

  function handleSelection(item) {
    handleOnClick(item);
    toggle(!open);
    if (item.action) {
      item.action(item.value, currentDepartment);
    }

    if (item.action2) {
      item.action2(item.value);
    }

    if (item.action3) {
      if (selectedStates.includes(item.value)) {
        item.action3(selectedStates.filter((el) => el != item.value));
      } else {
        item.action3(selectedStates.concat([item.value]));
      }
    }
  }

  function isItemInSelection(item) {
    if (selection.some((current) => current.id === item.id)) {
      return true;
    }
    return false;
  }

  return (
    <div className="dd-wrapper">


      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle(!open)}
        onClick={() => toggle(!open)}
      >

        <div className="dd-header__title">
          <div className="dd-header__title--bold">{currentTitle}</div>
        </div>
        <div className="dd-header__action"></div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map((item) => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleSelection(item)}>
                <span>{item}</span>
                <span>{isItemInSelection(item) && "✅"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default connect(
  mSTP,
  mDTP
)(onClickOutside(Dropdown, clickOutsideConfig));