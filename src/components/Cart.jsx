import {forwardRef, useRef, useImperativeHandle} from 'react'
import {createPortal} from 'react-dom'
import CheckOutForm from './CheckOutForm'
const cartModal = forwardRef(function Cart({cartItems, onCheckOut},ref)
{
  const dialog = useRef()
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  useImperativeHandle(ref,() => {
    return {
      open()
      {
        dialog.current.showModal()
      },
      close()
      {
        dialog.current.close()
      }
    }
  })
  return createPortal(
    <dialog ref={dialog}>
      <>
        {
          cartItems.map(item =>
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <p>{item.quantity}</p>
          </div>)}
      <div>
      <h1>Total Price ${totalPrice}</h1>
      </div>
      <div>
        <button onClick={() =>dialog.current.close()}>Close</button>
        <CheckOutForm key={cartItems.length} onCheckOut={onCheckOut} />
      </div>      
      </>
    </dialog>,document.getElementById('modal')
    )
})

export default cartModal;