async function http()
{
    const res = await fetch('http://localhost:3000/meals');
    if(!res.ok)
    {
        throw new Error('Failed to process the request');
    }
    const data = await res.json();
    return data;
}

async function postOrder(orderData)
{
    const res = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    });
    if(!res.ok)
    {
        throw new Error('Failed to process the request');
    }
    const data = await res.json();
    return data;
}

export {http, postOrder}