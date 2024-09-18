import { useEffect, useState } from 'react';
import './styles.css';

export default function ScrollIndicator({url}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('')
    const [scrollRate, setScrollRate] = useState(0);
    
    async function fetchData(getUrl) {
        
        try {
            setLoading(true);

            const response = await fetch(getUrl);
            const results = await response.json();

            if (results && results.products && results.products.length > 0) {
                setData(results.products)
                setLoading(false);
            }
            console.log(results)
            
        } catch(e) {
            console.log(e)
            setErrorMsg(e.message)
            setLoading(false);            
        }
    }

    function handleScrollRate() {

        //vertical scroll
        const scrolledY = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        

        //horizontal scroll
        const scrolledX = document.documentElement.scrollLeft || document.body.scrollLeft;
        const width = document.documentElement.scrollWidth - document.documentElement.clientWidth;
        
        //combined scroll position
        const combinedScroll = Math.sqrt(Math.pow(scrolledX, 2) + Math.pow(scrolledY, 2));
        const maxScroll = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

        const scrollRate = (combinedScroll / maxScroll) * 100;
        setScrollRate(scrollRate);
    }
    useEffect(()=> {
        (fetchData(url))
    }, [url]);

    useEffect(()=> {
        window.addEventListener('scroll', handleScrollRate);
        return ()=> {
            window.removeEventListener('scroll', () => {});
        };
    },[]);
    console.log(data, scrollRate)

    if (loading){
        return <div>Loading Data...Please Wait</div>
    }
    if (errorMsg) {
        return <div>Error Occurred {errorMsg}</div>
    }

    return <div>
        <div className='top-contaner'>
            <h3>Custom Scroll Data</h3>
            <div className='scroll-progress-container'>
                <div
                    className='current-scroll-bar'
                    // style={{width: `${scrollRate}%`}}
                    style={{ transform: `scaleX(${scrollRate / 100}) scaleY(${scrollRate / 100})` }}
                >

                </div>
            </div>
        </div>
        <div >
            {
                data && data.length ?
                data.map((dataItem) => 
                    <p key={dataItem.id}>{dataItem.title}</p>
                ) 
                : null
            }
        </div>

    </div>
}