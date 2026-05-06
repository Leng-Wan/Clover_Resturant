import {useState} from 'react'
import http from './http';
import useFetch from './hook/useFetch';
import MealLists from './components/MealLists';
import Cart from './components/Cart';
export default function App()
{
    const {data, error, loading} = useFetch(http, []);
    const [cartItems, setCartItems] = useState([])

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
            <h1>Meals</h1>
            <Cart cartItems={cartItems} />
            <MealLists meals={data} onAddToCart={handleAddToCart} />
        </div>
    )
}