import http from './http';
import useFetch from './hook/useFetch';
import MealLists from './components/MealLists';
export default function App()
{
    const {data, error, loading} = useFetch(http, []);
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
            <MealLists meals={data}/>
        </div>
    )
}