import { getValue } from '@testing-library/user-event/dist/utils';
import './styles.css';
import { useEffect, useState } from 'react';
import { type } from '@testing-library/user-event/dist/type';

export default function RandomColor() {

    const [color, setColor] = useState('#000000');
    const [typeColor, setTypeColor] = useState('hex');
    // const [colorInfo, setColorInfo] = useState({type: 'hex', value: '#000000'})

    useEffect(()=> {
        if(typeColor === 'hex') handleRandomHexColor()
        else handleRandomRgbColor()
    }, [typeColor]);

    function randomColorUtility(length) {
        return Math.floor(Math.random() * length);
    }
    
    function handleRandomHexColor() {
        let hexColor = '#';
        let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

        for(let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)];
            
        }
        setColor(hexColor)
        // setColorInfo({type: 'hex', value: hexColor})
    }

        
    function handleRandomRgbColor() {
        const r = randomColorUtility(256)
        const g = randomColorUtility(256)
        const b = randomColorUtility(256)
        setColor(`rgb(${r}, ${g}, ${b})`)
         // setColorInfo({type: 'rgb', value: `rgb(${r}, ${g}, ${b})`})
    
    }
    return <div className="container" style={{
        background: color,
    }}>
        <button onClick={()=>setTypeColor('hex')}>Get Hex Color</button>
        <button onClick={()=>setTypeColor('rgb')}>Get RGB Color</button>
        <button onClick={typeColor === 'hex' ? handleRandomHexColor : handleRandomRgbColor }>Create Random Color</button>
        <div style={{
            color: '#ffffff',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>
            <h3>
                {typeColor === 'rgb' ? 'RGB' : 'HEX'}
            </h3>
            <h4>{color}</h4>
        </div>
    </div>
};