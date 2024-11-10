import React from 'react'
import { useState } from 'react'
import Input from './Input'
import Button from './Button'
import { login as authlogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handlesubmit, formState: { errors } } = useForm();
  const [error, seterror] = useState('');

  const login = async (data) => {
    seterror("");
    try {
      const session = await authservice.login(data)
      if (session) {
        const currUser = await authservice.getCurruser();
        if (currUser) dispatch(authlogin(currUser));
        navigate("/")
      }
    } catch (error) {
      seterror(error);
    }
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Sign in to your account</h2>
          {error && (<div className="alert alert-danger">{error}</div>)}
          <form onSubmit={handlesubmit(login)} className="mt-4">
            <div className="mb-3">
              <Input
                type="email"
                placeholder="Enter your email"
                label="Email"
                {...register("email", { required: true })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <Input
                type="password"
                placeholder="Enter your password"
                label="Password"
                {...register("password", { required: true })}
                className="form-control"
              />
            </div>
            <Button type="submit" className="btn btn-primary">Sign in</Button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Login
