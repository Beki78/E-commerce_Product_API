import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import IMG from "../assets/undraw_web_shopping_re_owap-removebg-preview.png"; 


function Form() {
  const ACCESS_TOKEN = "access";
  const REFRESH_TOKEN = "refresh";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("http://127.0.0.1:8000/api/token/", { username, password });
      if (res) {
        console.log("Setting access token:", res.data.access);
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        console.log("Access token set:", localStorage.getItem(ACCESS_TOKEN));
        navigate("/");
      } else {
        navigate("/login");   
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
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
                  
                  <form onSubmit={handleSubmit}>
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="text"
                      placeholder="Email"
                      onChange={(e) => setUsername(e.target.value)}
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
                      disabled={loading}
                    >
                      <FaUserPlus className="w-6 h-6 text-black" />
                      <span className="ml-2 text-black">
                        {loading ? "Logging in..." : "Log In"}
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
}

export default Form;
