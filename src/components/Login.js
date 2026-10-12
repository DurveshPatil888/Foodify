import { useRef, useState } from 'react';
import { photoURL } from '../assets/constant';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { CheckValidData } from '../utils/validate';
import { useDispatch } from 'react-redux';
import { auth } from '../utils/firebase';
import { adduser } from '../utils/redux/userSlice';
const Login = () => {
  const email = useRef(null);
  const [errorMsg, seterrorMsg] = useState();
  const [IsSignIn, setIsSignIn] = useState(true);
  const password = useRef(null);
  const fullname = useRef(null);
  const dispatch = useDispatch();
  const toggleSignInForm = () => {
    setIsSignIn(!IsSignIn);
  };

  const handleClick = () => {
    const message = CheckValidData(
      fullname.current?.value,
      email.current.value,
      password.current.value,
      IsSignIn
    );
    seterrorMsg(message);
    if (message) return;
    if (!IsSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: fullname.current.value,
            photoURL: photoURL,
          }).then(async () => {
            await user.reload();

            const { uid, email, displayName, photoURL } = auth.currentUser;

            dispatch(adduser({ uid, email, displayName, photoURL }));
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + '' + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  };

  return (
    <div className="flex min-h-screen pt-24 items-center justify-center bg-gradient-to-b from-orange-50 to-white px-4">
      <form
        className="bg-white m-6 w-full max-w-md p-8 md:p-10 rounded-2xl shadow-xl border border-orange-100"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="text-center mb-6">
          <span className="text-2xl font-extrabold text-orange-500">Foodify</span>
          <p className="text-[10px] tracking-[0.2em] text-orange-400 uppercase">
            Delivery
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-8">
          {IsSignIn ? 'Login' : 'Sign up'} your account
        </h1>
        {!IsSignIn && (
          <input
            ref={fullname}
            className="m-2 p-3 w-full mt-2 rounded-xl border border-slate-200 outline-none focus:border-orange-400"
            type="text"
            placeholder="Enter Your Full Name"
          ></input>
        )}
        <input
          ref={email}
          className="m-2 p-3 w-full mt-2 rounded-xl border border-slate-200 outline-none focus:border-orange-400"
          type="email"
          placeholder="Enter Your Email"
        ></input>
        <input
          ref={password}
          className="m-2 p-3 w-full mt-2 rounded-xl border border-slate-200 outline-none focus:border-orange-400"
          type="password"
          placeholder="Enter Your Password"
        ></input>
        <button
          className="m-2 p-3 bg-orange-500 hover:bg-orange-600 text-white w-full rounded-full font-semibold"
          onClick={handleClick}
        >
          {IsSignIn ? 'Sign In' : 'Sign Up'}
        </button>
        {errorMsg && (
          <p className="p-2 m-2 text-red-600 font-bold">{errorMsg}</p>
        )}
        <p
          className="m-2 p-2 cursor-pointer text-center text-sm text-slate-600"
          onClick={toggleSignInForm}
        >
          {IsSignIn
            ? "Don't Have Your Account Sign Up ?"
            : 'Already registered? Sign In now'}
        </p>
      </form>
    </div>
  );
};

export default Login;
