import { LOGO_URL, cartLogo } from '../utils/constants';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useDispatch, useSelector } from 'react-redux';
import { photoURL } from '../assets/constant';
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
    <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center h-auto px-4 md:px-6 shadow-md bg-white">
      <img className="h-16 md:h-24" src={LOGO_URL} alt="Logo" />

      <div className="md:hidden flex items-center gap-4">
        <Link to="/cart" className="flex items-center">
          <img className="w-6" src={cartLogo} alt="Cart" />
          <span className="ml-1 font-bold">{cartItems.length}</span>
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:static top-[64px] left-0 w-full md:w-auto bg-white md:bg-transparent flex-col md:flex-row items-center justify-center shadow-lg md:shadow-none transition-all duration-300 ease-in`}
      >
        <ul className="flex flex-col md:flex-row items-center w-full md:w-auto p-4 md:p-0">
          <li className="py-2 md:px-6">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/">
              Home
            </Link>
          </li>
          <li className="py-2 md:px-6">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/about">
              About us
            </Link>
          </li>
          <li className="py-2 md:px-6">
            <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact">
              Contact us
            </Link>
          </li>

          {user && (
            <div className="flex flex-col items-center mx-4 my-2 md:my-0">
              <div className="relative">
                <img
                  src={photoURL}
                  className="w-10 h-10 md:w-12 md:h-12 md:-mt-7 rounded-full cursor-pointer hover:scale-105 transition duration-200"
                  onClick={() => setShowMenu(!showMenu)}
                />
                {showMenu && (
                  <div className="absolute right-1/2 translate-x-1/2 md:translate-x-0 md:right-0 mt-2 w-32 bg-black text-white rounded-lg shadow-2xl border border-gray-200 z-50">
                    <button
                      onClick={handlesignOut}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
              <p className="text-xs md:text-sm font-medium md:-mt-1">
                {user?.displayName?.split(' ')[0]}
              </p>
            </div>
          )}

          <div className="hidden md:flex items-center mx-6 gap-1">
            <Link to="/cart">
              <img className="max-w-[25px]" src={cartLogo} />
            </Link>
            <span>{cartItems.length}</span>
            <li className="px-8 text-[7px]">{onlineStatus ? '🟢' : '🔴'}</li>
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
  );
};

export default Header;
