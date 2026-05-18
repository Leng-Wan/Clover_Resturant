import {useActionState} from 'react'

export default function CheckOutForm({onCheckOut})
{
    async function signUpAction(prevState, formData)
    {
        const name = formData.get('name');
        const email = formData.get('email');
        const street = formData.get('street');
        const postalCode = formData.get('postal-code');
        const city = formData.get('city');
        
        const errors = []
        if(name.trim().length === 0) errors.push('Name is required')
        if(email.trim().length === 0) errors.push('Email is required')
        if(street.trim().length === 0) errors.push('Street is required')
        if(postalCode.trim().length === 0) errors.push('Postal code is required')
        if(city.trim().length === 0) errors.push('City is required')

        if(errors.length > 0){
            return {error: errors, enteredValue: {name, email, street, postalCode, city}}
        }

        await onCheckOut({name, email, street, 'postal-code': postalCode, city})
        return {error: null, submitted: true}
    }

    const [formState, formAction, pending] = useActionState(signUpAction, {error:null, submitted:false})
    
    return(
        <div>
            <h1>Check Out</h1>
            <form action={formAction}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required defaultValue={formState.enteredValue?.name || ''}/>
                
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required defaultValue={formState.enteredValue?.email || ''}/>
                
                <label htmlFor="street">Street</label>
                <input type="text" id="street" name="street" required defaultValue={formState.enteredValue?.street || ''}/>
                
                <label htmlFor="postal-code">Postal Code</label>
                <input type="text" id="postal-code" name="postal-code" required defaultValue={formState.enteredValue?.postalCode || ''}/>
                
                <label htmlFor="city">City</label>
                <input type="text" id="city" name="city" required defaultValue={formState.enteredValue?.city || ''}/>
                
                <button type="submit">Submit</button>
            </form>
            {formState.error && 
            <ul>
                {formState.error.map((err) => <li key={err}>{err}</li>)}
            </ul>}
            {pending && <p>Submitting...</p>}
            {!pending && formState.submitted && <p>Order placed successfully!</p>}
        </div>
    )
}