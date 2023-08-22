import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";


const ForgotPassword = () => {
  const [ email, setEmail ] = useState('');
  const [ alert, setAlert ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '') {
      setAlert({
        msg: 'Email is required',
        error: true
      })
      return;
    }

    try {
      const { data } = await axiosClient.post(`/users/forgot-password`, { email })
      
      setAlert({
        msg: data.msg,
        error: false
      });
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
      <h1 className="text-sky-600 font-black text-6xl capitalize">Get your access back and manage your {''} 
        <span className="text-slate-700">projects</span>
      </h1>

      {msg && <Alert alert={alert}/>}

      <form 
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label 
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email" 
            type="email" 
            placeholder="Your email here"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={ e => setEmail(e.target.value) } 
          />
        </div>

        <input 
          type="submit" 
          value="Send"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-auto hover:bg-sky-800 transition-colors mb-5"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          to="/"
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-slate-700 transition-colors"
        >
          Back to Login 
        </Link>
        <Link
          to="/register"
          className="block text-center my-5 text-slate-500 uppercase text-sm hover:text-slate-700 transition-colors"
        >
          Create New Account
        </Link>
      </nav>
    </>
  )
}

export default ForgotPassword
