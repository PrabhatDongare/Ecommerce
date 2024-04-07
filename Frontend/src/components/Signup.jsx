import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import { fetchUserSignUp } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux';
import { setEmail } from '../redux/category/categorySlice'

const Signup = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const onSubmit = async (data) => {
    const { name, email, password } = data
    dispatch(setEmail(email))
    await dispatch(fetchUserSignUp({ name, email, password }))
    navigate('/emailVerify')
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [navigate])

  return (
    <>
      <div className='border-2 w-[35%] px-16 mx-auto mt-12 pb-16 rounded-3xl text-sm'>
        <h1 className='text-2xl font-semibold py-5 text-center'>Create your account</h1>

        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-6 '>
          {/* NAME */}
          <div>
            <div className='flex justify-between pb-1'>
              <label>Name</label>
              {errors.name && <span className=' text-red-500'>{errors.name.message}</span>}
            </div>
            <input {...register("name", {
              required: { value: true, message: "* This field is required" },
              minLength: { value: 3, message: "* min 3 character required" },
              pattern: {
                value: /^[a-zA-Z]+( [a-zA-Z]+){0,3}$/,
                message: "* invalid entry"
              }
            })} placeholder='Enter' className='border-2 rounded-md p-2 w-full' maxLength={30}/>
          </div>

          {/* EMAIL */}
          <div>
            <div className='flex justify-between pb-1'>
              <label>Email</label>
              {errors.email && <span className='text-red-500 '>{errors.email.message}</span>}
            </div>
            <input {...register("email", {
              required: { value: true, message: "* This field is required" },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "* invalid email address"
              }
            })} placeholder='Enter' className='border-2 rounded-md p-2 w-full' maxLength={30} />
          </div>

          {/* PASSWORD */}
          <div>
            <div className='flex justify-between pb-1'>
              <label>Password</label>
              {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
            </div>
            <div className='relative'>
              <input type="password"  {...register("password", {
                required: { value: true, message: "* This field is required" }
              })} placeholder='Enter' className='border-2 rounded-md p-2  w-full' maxLength={30} />
            </div>
          </div>

          {/* SUBMIT */}
          <input disabled={isSubmitting} type="submit" value="CREATE ACCOUNT" className='bg-black text-white w-full py-3 rounded-md tracking-wider cursor-pointer' />
        </form>

        <div className='text-center mt-8'>
          <span>Have an Account? </span><button className='pl-2 font-semibold tracking-wider' onClick={() => navigate('/login')}>LOGIN</button>
        </div>
      </div>
    </>
  )
}

export default Signup
