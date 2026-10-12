import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { adduser, removeuser } from '../utils/redux/userSlice';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const onlineStatus = useOnlineStatus();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce((sum, _item, i) => sum + (150 + i * 10), 0);

  const handlesignOut = () => {
    setShowMenu(false);
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          adduser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate('/');
      } else {
        dispatch(removeuser());
        navigate('/Login');
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur border-b border-orange-100">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center h-[72px] px-4 md:px-6 gap-3">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center text-lg shadow-sm">
            🍴
          </span>
          <span className="leading-tight">
            <span className="block text-xl font-extrabold text-orange-500 tracking-tight">
              Foodify
            </span>
            <span className="block text-[9px] font-semibold tracking-[0.22em] text-orange-400 uppercase">
              Delivery
            </span>
          </span>
        </Link>

        <div className="md:hidden flex items-center gap-3">
          <Link
            to="/cart"
            className="flex items-center gap-1.5 rounded-full bg-orange-500 text-white px-3 py-1.5 text-sm font-semibold"
          >
            🛒 {cartItems.length}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl focus:outline-none text-slate-700"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? 'flex' : 'hidden'
          } md:flex absolute md:static top-[72px] left-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row items-center justify-end shadow-lg md:shadow-none`}
        >
          <ul className="flex flex-col md:flex-row items-center w-full md:w-auto p-4 md:p-0 gap-1 md:gap-1">
            <li className="py-2 md:px-4">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/"
                className="text-sm font-medium text-slate-600 hover:text-orange-500"
              >
                Home
              </Link>
            </li>
            <li className="py-2 md:px-4">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/about"
                className="text-sm font-medium text-slate-600 hover:text-orange-500"
              >
                About Us
              </Link>
            </li>
            <li className="py-2 md:px-4">
              <Link
                onClick={() => setIsMobileMenuOpen(false)}
                to="/contact"
                className="text-sm font-medium text-slate-600 hover:text-orange-500"
              >
                Contact
              </Link>
            </li>

            {user && (
              <div className="flex items-center gap-2 mx-3 my-2 md:my-0">
                <div className="relative">
                  <button
                    className="flex items-center gap-2"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    <span className="w-9 h-9 rounded-full bg-slate-800 text-white text-sm font-bold flex items-center justify-center">
                      {(user?.displayName || 'U').charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden md:inline text-sm font-semibold text-slate-800">
                      {user?.displayName?.split(' ')[0]}
                    </span>
                  </button>
                  {showMenu && (
                    <div className="absolute right-0 mt-2 w-32 bg-white text-slate-800 rounded-lg shadow-2xl border border-gray-100 z-50">
                      <button
                        onClick={handlesignOut}
                        className="block w-full text-left px-4 py-2 hover:bg-orange-50 text-sm"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="hidden md:flex items-center ml-2">
              <Link
                to="/cart"
                className="flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-600 text-white pl-3 pr-4 py-2 shadow-sm"
              >
                <span>🛒</span>
                <span className="text-sm font-semibold whitespace-nowrap">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
                {cartItems.length > 0 && (
                  <span className="text-sm font-bold">₹{cartTotal}</span>
                )}
              </Link>
              <span className="ml-2 text-[10px]" title={onlineStatus ? 'Online' : 'Offline'}>
                {onlineStatus ? '🟢' : '🔴'}
              </span>
            </div>

            <li className="md:hidden py-2 text-[10px]">
              {onlineStatus ? 'Online 🟢' : 'Offline 🔴'}
            </li>
            {!onlineStatus && (
              <div className="w-full bg-red-500 text-white text-center py-2 text-sm font-semibold">
                🚫 You are offline. Check your internet connection.
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
