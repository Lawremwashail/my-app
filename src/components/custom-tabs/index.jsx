import {useState} from 'react';
// import './styles.css';


export default function Tabs({tabsContent, onChange}) {
    
    const [currentTab, setCurrentTab] = useState(0); 

    function handleClick(getCurrentIndex) {
        setCurrentTab(getCurrentIndex);
        onChange(getCurrentIndex);
    }
    return <div className="wrapper">
        <div className="heading">
            {tabsContent.map((tabItem, index)=> (
                <div 
                onClick={()=> handleClick(index)} 
                key={tabItem.label} 
                className={`tab-item ${currentTab === index ? "active" : ""}`}>
                    <span className="label">{tabItem.label}</span>
                </div>
            ))}

        </div>
        <div className="content">
            {tabsContent[currentTab] && tabsContent[currentTab].content}
        </div>

    </div>
}