import { FaUserPlus } from "react-icons/fa";
import IMG from "../assets/undraw_web_shopping_re_owap-removebg-preview.png";

const Login = () => {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <h1 className="text-center font-bold text-3xl my-8">
                    Login
                  </h1>
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                  />

                  <button className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:shadow-outline focus:outline-none">
                    <FaUserPlus className="w-6 h-6 text-black" />
                    <span className="ml-2 text-black">Log In</span>
                   </button>
                 
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-green-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${IMG})` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
