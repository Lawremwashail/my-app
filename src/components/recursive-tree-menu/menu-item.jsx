import { useState } from "react";
import MenuList from "./menu-list";
import { FaPlus, FaMinus } from 'react-icons/fa'

export default function MenuItem({item}) {
    
    const [displayCurrentChildren, setDisplayCurrentChildren] = useState({});

    function handleToggleItem(getCurrentLabel) {
        setDisplayCurrentChildren({...displayCurrentChildren, [getCurrentLabel]: !displayCurrentChildren[getCurrentLabel],})
    }
    console.log(displayCurrentChildren);
    return <li>
        <div className="item-container">
            <p>{item.label}</p>
            {
                item && item.children && item.children.length ? <span onClick={()=>handleToggleItem(item.label)}>{displayCurrentChildren[item.label] ? <FaMinus/> : <FaPlus/>}</span> : null
            }

        </div>
        
        {item && item.children && item.children.length > 0 && displayCurrentChildren[item.label]?
        <MenuList list={item.children}/> 
        : null}
    </li>
}