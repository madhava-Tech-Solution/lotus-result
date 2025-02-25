// import { postData } from '@/helpers/request';
// import { setAuthCookie } from '@/utils/apiHandlers';
// import { reactIcons } from '@/utils/icons';
// import Cookies from 'js-cookie';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// const Login = () => {
// const [togglePassword, setTogglePassword] = useState(false);
// const [error, setError] = useState('');
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const navigate = useNavigate(); // Initialize useHistory for redirection
// const API_URL = process.env.API_MATCH;
// // Predefined login credentials

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (email !== '' && password !== '') {
//       try {
//         const response = await postData(`${API_URL}/user/signin`, {
//           username: email,
//           password: password,
//         });
//         if (response?.ut === 'OWNER') {
//           console.log('response', response);
//           Cookies.set('__user__isLoggedIn', response?.token, {
//             expires: 1,
//           });
//           setAuthCookie();
//           sessionStorage.setItem('session', 'true');
//           navigate('/');
//           toast.success('Login Successfully');
//         } else {
//           toast.error('invalid credentials');
//         }
//       } catch (error) {
//         toast.error('Username Password does not match');
//       }
//     } else {
//       toast.error('Please fill all the fields');
//       setError('Please fill all the fields');
//     }
//   };

//   return (
//     <div className="w-full min-h-screen flex bg-[#040b1d]">
//       <div className="admin-login-left w-1/2 py-20 text-white">
//         <div className=" max-w-[500px] w-full mx-auto border-slate-500 bg-[#071535] border rounded-md">
//           <div className="pt-16 pb-6 p-4 my-10  ">
//             <header className="text-center">
//               <h4 className="font-bold font-plus-jakarta text-[2rem] mb-2 ">
//                 Login as Admin
//               </h4>
//             </header>
// <form onSubmit={handleSubmit} className="flex flex-col gap-3 my-4">
//   <div className="flex flex-col gap-1">
//     <label className="label" htmlFor="username">
//       Email
//     </label>
//     <input
//       id="username"
//       name="username"
//       className="input-field p-3 text-gray-700 border rounded-md"
//       type="text"
//       placeholder="Enter your email"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//     />
//   </div>
//   <div className="flex flex-col gap-1">
//     <label className="label" htmlFor="password">
//       Password
//     </label>
//     <div className="w-full relative ">
//       <input
//         className="input-field  w-full  p-3 text-gray-700 border rounded-md"
//         type={togglePassword ? 'text' : 'password'}
//         placeholder="Enter your password"
//         name="password"
//         id="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}

//         // onChange={handleChange}
//       />
//       <span
//         onClick={() => setTogglePassword((prev) => !prev)}
//         className="ay-center right-3 z-10 text-24  cursor-pointer text-slate-500"
//       >
//         {togglePassword ? reactIcons.eyes : reactIcons.eyeslash}
//       </span>
//     </div>
//   </div>
//   {error}
//   <div>
//     <button
//       type="submit"
//       className="btn btn-black w-full btn-lg border-none rounded-md pt-2 bg-[#040b1d]"
//     >
//       Login
//     </button>
//   </div>
// </form>
//           </div>
//         </div>
//       </div>
//       <div className="admin-login-right w-1/2 mx-auto">
//         <div className="min-h-screen w-[1/2] h-96 right-0 top-0  object-cover flex justify-center items-center">
//           <img src="shiv11.png" alt="" className="w-80" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import { isYupError, parseYupError } from '@/utils/Yup';
import { postData } from '@/helpers/request';
import { setAuthCookie } from '@/utils/apiHandlers';
import { reactIcons } from '@/utils/icons';
// import { loginValidation } from '@/utils/validation';
import Cookies from 'js-cookie';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  //eslint-disable-next-line
  const [togglePassword, setTogglePassword] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useHistory for redirection
  const API_URL = process.env.API_MATCH;
  // Predefined login credentials

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email !== '' && password !== '') {
      try {
        const response = await postData(`${API_URL}/user/signin`, {
          username: email,
          password: password,
        });
        if (response?.ut === 'OWNER') {
          console.log('response', response);
          Cookies.set('__user__isLoggedIn', response?.token, {
            expires: 1,
          });
          setAuthCookie();
          sessionStorage.setItem('session', 'true');
          navigate('/');
          toast.success('Login Successfully');
        } else {
          toast.error('invalid credentials');
        }
      } catch (error) {
        toast.error('Username Password does not match');
      }
    } else {
      toast.error('Please fill all the fields');
      setError('Please fill all the fields');
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center darkBg">
      <div className=" w-[400px] h-[450px]  rounded-lg flex flex-col justify-center items-center">
        <div className=" h-20 ">
          <img
            className="h-full w-full object-cover"
            src="/images/logo.png"
            alt=""
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 my-4 w-full"
        >
          <div className="flex flex-col gap-1">
            <label className="label text-white" htmlFor="username">
              Email
            </label>
            <input
              id="username"
              name="username"
              className="input-field p-3 text-gray-700 border rounded-md outline-none"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="label text-white" htmlFor="password">
              Password
            </label>
            <div className="w-full relative ">
              <input
                className="input-field  w-full  p-3 text-gray-700 border rounded-md outline-none"
                type={togglePassword ? 'text' : 'password'}
                placeholder="Enter your password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}

                // onChange={handleChange}
              />
              <span
                onClick={() => setTogglePassword((prev) => !prev)}
                className="ay-center right-3 z-10 text-24  cursor-pointer text-slate-500"
              >
                {togglePassword ? reactIcons.eyes : reactIcons.eyeslash}
              </span>
            </div>
          </div>
          <span className="text-red-500"> {error}</span>
          <div>
            <button
              type="submit"
              className="btn btn-black w-full btn-lg border-none rounded-md mt-2 bg-[#183F45]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
