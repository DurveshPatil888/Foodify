import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const HandleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center min-h-screen flex flex-col items-center justify-center  m-10 p-10">
      <h1 className="text-xl font-bold">Cart</h1>

      {
        <ul className="mt-5 flex flex-col gap-3 items-center">
          {cartItems.map((item, i = 1) => (
            <li
              key={item.idMeal}
              className="flex justify-between w-96 border-b pb-2"
            >
              <span>{item.strMeal}</span>
              <span className="text-gray-500 font-medium py-[2px] text-center w-16">
                ₹{150 + i * 10}
              </span>
            </li>
          ))}
        </ul>
      }
      <button
        className="p-2 m-2 bg-black text-white rounded-lg"
        onClick={HandleClearCart}
      >
        Clear Cart
      </button>
      {cartItems.length === 0 && <h1> Cart is Empty. Add Items to the Cart</h1>}
    </div>
  );
};

export default Cart;
