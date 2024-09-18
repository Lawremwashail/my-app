import { useState } from "react"
import QRCode from "react-qr-code"

export default function QrCodeGenerator() {
    const [qrcode, setQrCode] = useState('');
    const [input, setInput] = useState('')
    
    function handleQrCode(){
        setQrCode(input);
        setInput("")
    }
    return (
        <div>
            <h3>Qr Code Generator</h3>
            <div>
                <input onChange={(e)=> setInput(e.target.value)} type="text" name="qr-code" value={input} placeholder="Enter Value Here" />
                <button 
                disabled={input && input.trim() ? false : true}
                onClick={handleQrCode}>Generate</button>
            </div>
            <div>
            <QRCode 
            id="qr-code-value"
            value={qrcode}
            size={400}
            bgColor="#fff"
            />
            </div>
            
        </div>
    )
}