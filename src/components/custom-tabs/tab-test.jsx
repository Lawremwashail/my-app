import Tabs from "./index";
import "./styles.css";

function RandomContents() {
    return <div><h2>This is a Tab for some random components</h2></div>
}
export default function TabsTest() {
    const tabs = [
        {
            label: 'Tab 1',
            content: <div>All the contents for tab one are here</div>
        },
        {
            label: 'Tab 2',
            content: <div>All contents for tab two are here</div>

        },
        {
            label: 'Tab 3',
            content: <RandomContents onChange={handleChange}/>
        }

    ] 
    
    function handleChange(currentTab) {
        console.log(currentTab)
    }
    
    return <div>
        <Tabs tabsContent={tabs} onChange={handleChange}/>
    </div>
}