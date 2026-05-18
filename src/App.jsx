import {useState, useRef} from 'react'

import http from './http';
import useFetch from './hook/useFetch';
import MealLists from './components/MealLists';
import Cart from './components/Cart';
export default function App()
{
    const {data, error, loading} = useFetch(http, []);
    const [cartItems, setCartItems] = useState([])
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)
    const dialog = useRef();

    function handleAddToCart(mealItem)
    {
        const exitingItem = cartItems.find(item => item.id === mealItem.id);
        if(!exitingItem)
        {
            setCartItems(prev => [...prev, {...mealItem, quantity: 1}]);
        }
        else 
        {
            const updatedCartItems = cartItems.map(item => {
                if(item.id === mealItem.id)
                {
                    return {...item, quantity: item.quantity + 1}
                }
                return item;
            })
            setCartItems(updatedCartItems);
        }
    }

    function handleOpenCartModal()
    {
        dialog.current.open();
    }
    if(loading)
    {
        return <p>Loading...</p>
    }
    if(error)
    {
        return <p>{error.error}</p>
    }
    if(data.length ===0)
    {
        return <p>No Data Found!</p>
    }
    return (
        <div>
            <header>
                <h1>Clover Sky Bar & Resturant</h1>
                <nav>
                    <button onClick={handleOpenCartModal}>Cart ({totalQuantity})</button>
                </nav>
            </header>
            <h1>Meals</h1>
            <Cart cartItems={cartItems} ref={dialog}/>
            <MealLists meals={data} onAddToCart={handleAddToCart} />
        </div>
    )
}