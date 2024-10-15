import { FaUserPlus } from "react-icons/fa";
import IMG from "../assets/undraw_web_shopping_re_owap-removebg-preview.png";
import { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/AuthSlice"; 
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/api";

const Login = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error } = useSelector((state: RootState) => state.auth); 

  const handleLogin = async(e:FormEvent) => {
    e.preventDefault(); 
    console.log(email);
    loginApi(email)
    
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <h1 className="text-center font-bold text-3xl my-8">Login</h1>
                  {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                  )}
                  <form onSubmit={handleLogin}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />

                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-green-400 text-white w-full py-4 rounded-lg hover:bg-green-600 transition-all duration-300 ease-in-out flex items-center justify-center gap-2 focus:shadow-outline focus:outline-none"
                      disabled={isLoading} 
                    >
                      <FaUserPlus className="w-6 h-6 text-black" />
                      <span className="ml-2 text-black">
                        {isLoading ? "Logging in..." : "Log In"}
                      </span>
                    </button>
                  </form>
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
