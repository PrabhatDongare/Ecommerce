import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserLogin } from '../redux/user/userSlice'
import { toast } from 'react-toastify';

const Login = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [passwordVisible, setPasswordVisible] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleShowPassword = (event) => {
    event.preventDefault();
    setPasswordVisible(!passwordVisible)
  }
  
  const onSubmit = async (data) => {
    const { email, password } = data
    await dispatch(fetchUserLogin({ email, password }))
    reset()
   
    const token = await localStorage.getItem('token')
      if (token) {
        navigate('/')
        toast.success('User Logged In')
      }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [navigate])
  

  return (
    <>
      <div className='border-2 w-[35%] px-16 mx-auto mt-12 pb-10 rounded-3xl text-sm'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold py-5'>Login</h1>
          <p className='text-lg font-medium pb-2'>Welcome back to ECOMMERCE</p>
          <p className='text-sm'>The next gen business marketplace</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 pt-5'>
          {/* EMAIL */}
          <div>
            <div className='flex justify-between pb-1'>
              <label>Email</label>
              {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
            </div>
            <input {...register("email", {
              required: { value: true, message: "* This field is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "* invalid email address"
              }
            })} placeholder='Enter' className='border-2 rounded-md p-2 text-sm w-full' />
          </div>

          {/* PASSWORD */}
          <div>
            <div className='flex justify-between pb-1'>
              <label>Password</label>
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </div>
            <div className='relative'>
              <input type={passwordVisible ? "text" : "password"}  {...register("password", {
                required: { value: true, message: "* This field is required" }
              })} placeholder='Enter' className='border-2 rounded-md p-2 text-sm w-full' maxLength={30} />

              <button className='absolute bottom-2 right-3'
                style={{
                  textDecoration: passwordVisible ? 'underline' : 'none',
                  fontWeight: passwordVisible ? '500' : 'normal'
                }} onClick={handleShowPassword}>Show</button>
            </div>
          </div>

          {/* SUBMIT */}
          <input disabled={isSubmitting} type="submit" value={"LOGIN"}  className='bg-black text-white w-full py-2 text-sm rounded-md tracking-widest cursor-pointer' />
        </form>

        <div className="line border-b-2 m-5 mx-auto border-zinc-300"></div>
        <div className='text-center text-sm'>
          <span>Don&apos;t have an Account? </span><button className='pl-2 font-semibold ' onClick={() => navigate('/signup')}>SIGN UP</button>
        </div>
      </div>

    </>
  )
}

export default Login
