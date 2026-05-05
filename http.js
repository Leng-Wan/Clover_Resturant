async function http()
{
    const res = await fetch('http://localhost:3000/meals');
    if(!res.ok)
    {
        throw new Error('Failed to fetch meals');
    }
    const data = await res.json();
    return data;
}

export default http;