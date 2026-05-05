import {useState, useEffect} from 'react'
export default function useFetch(http, initialValue)
{
  const [data, setData] = useState(initialValue)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchData(){
        try{
            const res = await http();
            setData(res);
        }
        catch(err){
            setError({error: err.message});
        }
        finally{
            setLoading(false);
        }
    }
    fetchData();
  },[])

    return {data, error, loading, setData};
}