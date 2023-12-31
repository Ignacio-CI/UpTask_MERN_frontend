import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axiosClient from "../config/axiosClient"
import Alert from "../components/Alert"

const NewPassword = () => {
  const [password, setPassword] = useState('');
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [modifiedPassword, setModifiedPassword] = useState(false);

  const params = useParams();
  
  const { token } = params;

  useEffect(() => {
    const verifyToken = async () => {
      try {
        
        await axiosClient(`/users/forgot-password/${token}`)
        //console.log(data);

        setValidToken(true)

      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    verifyToken()
  }, []);

  const handleSubmit =  async e => {
    e.preventDefault();

    if(password.length < 6) {
      setAlert({
        msg: 'Your password must be at least 6 characters',
        error: true
      })
      return;
    }

    try {
      const url = `/users/forgot-password/${token}`;
      const { data } = await axiosClient.post(url, { password });
      
      setAlert({
        msg: data.msg,
        error: false
      })

      setModifiedPassword(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Reset your password and keep access to your {''} 
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      {validToken && (
        <form 
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              New Password
            </label>
            <input
              id="password" 
              type="password" 
              placeholder="Your new password here"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50" 
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <input 
            type="submit" 
            value="Save New Password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-auto hover:bg-sky-800 transition-colors mb-5"
          />
        </form>
      )}
      {modifiedPassword && (
          <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-slate-700 transition-colors"
          >
            Log in 
          </Link>
      )}
    </>
  )
}

export default NewPassword
