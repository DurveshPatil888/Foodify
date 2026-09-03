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
          // Signed up
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
          // Signed in
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
    <div>
      <div className="flex min-h-screen  -mt-6 items-center justify-center text-black rounded-lg">
        <form
          className="bg-[#F3F4F7] m-10  w-4/12 p-10 rounded-2xl shadow-xl border border-gray-200 "
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
            {IsSignIn ? 'Login' : 'Sign up'} your account
          </h1>
          {!IsSignIn && (
            <input
              ref={fullname}
              className="m-2 p-2 w-full mt-2 "
              type="text"
              placeholder="Enter Your Full Name"
            ></input>
          )}
          <input
            ref={email}
            className="m-2 p-2 w-full mt-2 "
            type="email"
            placeholder="Enter Your Email"
          ></input>
          <input
            ref={password}
            className="m-2 p-2 w-full mt-2"
            type="password"
            placeholder="Enter Your Password"
          ></input>
          <button
            className="m-2 p-2 bg-orange-500 w-full rounded-lg "
            onClick={handleClick}
          >
            {IsSignIn ? 'Sign In' : 'Sign Up'}
          </button>
          {errorMsg && (
            <p className="p-2 m-2 text-red-600 font-bold">{errorMsg}</p>
          )}
          <p className="m-2 p-2 cursor-pointer" onClick={toggleSignInForm}>
            {IsSignIn
              ? "Don't Have Your Account Sign Up ?"
              : 'Already registered? Sign In now'}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
