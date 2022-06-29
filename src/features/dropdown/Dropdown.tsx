import {DropdownItem, toggleSelection} from './dropdownSlice'
import React, { useState, useEffect } from "react";
import onClickOutside from "react-onclickoutside";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import styles from './Dropdown.module.css'
// let testValues = [
//   { id: 1, value: "test1" },
//   { id: 2, value: "test2" },
//   { id: 3, value: "test3" },
// ];

const mSTP = (state) => ({
  currentDepartment: state
});

const mDTP = () => ({});

// const clickOutsideConfig = {
//   handleClickOutside: () => Dropdown.handleClickOutside,
// };

function Dropdown({
  type,
  title,
  items,
  selected,
  multiSelect = true,
  selectedStates,
  // currentDepartment
}) {

  const dispatch = useAppDispatch()
 
  
  const [open, setOpen] = useState(false);
  const toggle = (open) => setOpen(!open);


  function handleSelection( item : String, type: String) {

    
    console.log('handle selection')


    let toggleItem :  DropdownItem= {
      type: type,
      val: item
    }

    console.log(toggleItem)

    dispatch(toggleSelection(toggleItem))

  }

  function isItemInSelection(item : String) {
    if (selected.some((current : String) => current === item)) {
      console.log("FALSE")
      return true;
    }
    return false;
  }

  return (
    <div className={styles.ddwrapper}>


      <div
        tabIndex={0}
        className={styles.ddheader}
        role="button"
        onClick={() => toggle(open)}
      >

        <div className={styles.ddheader__title}>
          <div className={styles.ddheader__title}>{type}</div>
        </div>
        <div className={styles.ddheader__action}></div>
      </div>
      {open && (
        <ul className={styles.ddlist}>
          {items.map((item : String) => (
            <li className={styles.ddlistitem} key={item}>
              <button type="button" onClick={() => handleSelection(item, type)}>
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
export default(Dropdown);