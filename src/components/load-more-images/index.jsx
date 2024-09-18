import { useEffect, useState } from "react";
import './styles.css';

export default function LoadMoreImages() {
    
    const [products, setProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState(0);
    const [loading, setLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false)

    async function fetchProducts() {
        try {
            setLoading(true);

            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${currentProducts === 0 ? 0 : currentProducts + 20}`);
            const data = await response.json()


            //if there is data fetched and has products(from the API) and products > 0 then set the products
            if (data && data.products && data.products.length) {
                setProducts(()=> [...products, ...data.products])
                setLoading(false)
            }

            console.log(data)
        } 
        catch(e) {
            console.log(e);
            setLoading(false)
            return <div>Error Occurred</div>
            
        }
    }
    
    useEffect(()=> {
        fetchProducts()
    },[currentProducts])

    useEffect(()=> {
        if(products && products.length === 100)
            setDisableButton(true)
    })
    
    if(loading) {
        return <div>Loading Data...<br/>Please Wait </div>
    }

    return <div className="container-products">
        <div className="products-container">
            {
                products && products.length ?
                products.map(productItem => (
                    <div className="product" key={productItem.id}>
                        <img
                        src={productItem.thumbnail}
                        alt={productItem.title}                        
                        />
                        <p>{productItem.title}</p>
                    </div>
                )) 
                : null
            }
        </div>
        <div className="button-container">
            <button disabled={disableButton} onClick={()=> setCurrentProducts(currentProducts + 20)}>
                Load More Products
                </button>
                <p>{products.length} Loaded</p>
                {
                    disableButton ? <p>You have reached Maximum Products</p> : null
                }
        </div>
    </div>
}