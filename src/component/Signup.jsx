import React from 'react'
import authservice from '../appwrite/auth'
import { useState } from 'react'
import Button from './Button'
import Input from './Input'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {login} from '../store/authSlice'
import { useDispatch } from 'react-redux'

const Signup = () => {
    const {register,handlesubmit,formState:{errors}}=useForm();
    const navigate=useNavigate();
    const [error, seterror] = useState("");
    const dispatch=useDispatch();

    const signup=async(data)=>
    {
        seterror("")
        try {
            const userdata= await authservice.createaccount(data);
            if(userdata)
            {
                const currUser=await authservice.getCurruser();
                if(currUser)dispatch(login(userdata))
                navigate("/");
            }
        } catch (error) {
            seterror(error)
        }  
    }
  return (
    <div className="container mt-5">
    <div className="row justify-content-center">
        <div className="col-md-6">
            <h2 className="text-center">Sign up for your account</h2>
            {error && (<div className="alert alert-danger">{error}</div>)}
            <form onSubmit={handlesubmit(signup)} className="mt-4">
                <div className="mb-3">
                    <Input
                        type="text"
                        placeholder="Enter your Name"
                        label="Name"
                        {...register("name", { required: true })}
                        className="form-control"
                    />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                    <Input
                        type="email"
                        placeholder="Enter your Email"
                        label="Email"
                        {...register("email", { required: true })}
                        className="form-control"
                    />
                    {errors.email && <span className="text-danger">This field is required</span>}
                </div>
                <div className="mb-3">
                    <Input
                        type="password"
                        placeholder="Enter your Password"
                        label="Password"
                        {...register("password", { minLength: { value: 4, message: 'Minimum length is 4' }, required: true })}
                        className="form-control"
                    />
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
                <Button type="submit" className="btn btn-primary">Sign up</Button>
            </form>
        </div>
    </div>
</div>
);
}

export default Signup
