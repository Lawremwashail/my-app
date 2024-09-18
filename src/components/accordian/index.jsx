import { useState } from "react";
import data from './data'
import './styles.css'

export default function Accordian() {
    
    const [selected, setSelected] = useState(null);
    const [multiple, setMultiple] = useState([]);
    const [enableMultiSelect, setEnableMultiSelect] = useState(false);
    

    function handleSingleSelection(getCurrentId) {

        setSelected(getCurrentId === selected ? null : getCurrentId)
    }

    function handleMultiSelection(getCurrentId) {
        let cpyMultiple = [...multiple];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId)

        if(findIndexOfCurrentId === -1)
            cpyMultiple.push(getCurrentId);
        else
            cpyMultiple.splice(findIndexOfCurrentId, 1);
        
        setMultiple(cpyMultiple)
    }

    function toggleMultiSelect() {
        if(!enableMultiSelect) {
            if(selected !== null && !multiple.includes(selected)) {
                setMultiple(...multiple, selected)
            }
            setSelected(null);
        }else {
            setMultiple([]);
            setSelected(null);
        }
        setEnableMultiSelect(!enableMultiSelect)
    }
    return <div className="wrapper">
        <button onClick={toggleMultiSelect}>{enableMultiSelect ? 'Disable Multi-Select' : 'Enable Multi-Select'}</button>
        <div className="accordian">
            {
                data && data.length > 0 ?
                data.map((dataItem)=>
                    <div
                        key={dataItem.id} 
                        onClick={enableMultiSelect 
                            ? ()=>handleMultiSelection(dataItem.id) 
                            : ()=>handleSingleSelection(dataItem.id)
                        }
                        className="item"
                    >   <div className="title">
                            <h3>
                                {dataItem.Question}
                            </h3>
                            <span>
                                {
                                    enableMultiSelect ? multiple.includes(dataItem.id) ? '-' : '+'
                                    : selected === dataItem.id ? '-' : '+'                                                              
                                }
                            </span>
                        </div>
                        {
                            selected === dataItem.id || multiple.indexOf(dataItem.id) !== -1 ? 
                            <div className="content">{dataItem.answer}</div>
                            : null
                        }    
                        
                    </div>
                
                ) 
                : 
                <div>No data found</div>
            }

        </div>

    </div>
}