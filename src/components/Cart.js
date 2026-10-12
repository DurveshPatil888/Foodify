import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/redux/cartSlice';

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const HandleClearCart = () => {
    dispatch(clearCart());
  };
  const cartTotal = cartItems.reduce((sum, _item, i) => sum + (150 + i * 10), 0);

  return (
    <div className="min-h-screen pt-28 pb-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-orange-100 p-8">
        <h1 className="text-2xl font-extrabold text-slate-900">Cart</h1>
        <p className="text-sm text-slate-500 mt-1">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </p>

        <ul className="mt-6 flex flex-col gap-3">
          {cartItems.map((item, i) => (
            <li
              key={item.idMeal}
              className="flex justify-between items-center border-b border-slate-100 pb-3"
            >
              <span className="font-medium text-slate-800">{item.strMeal}</span>
              <span className="text-orange-600 font-semibold py-[2px] text-center w-16">
                ₹{150 + i * 10}
              </span>
            </li>
          ))}
        </ul>

        {cartItems.length > 0 && (
          <div className="flex justify-between mt-4 font-bold text-slate-900">
            <span>Total</span>
            <span>₹{cartTotal}</span>
          </div>
        )}

        <button
          className="mt-6 w-full p-2.5 bg-slate-900 text-white rounded-full font-semibold hover:bg-slate-800"
          onClick={HandleClearCart}
        >
          Clear Cart
        </button>
        {cartItems.length === 0 && (
          <h1 className="mt-4 text-center text-slate-500">
            Cart is Empty. Add Items to the Cart
          </h1>
        )}
      </div>
    </div>
  );
};

export default Cart;
