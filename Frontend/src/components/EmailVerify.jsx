import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserVerifyOtp } from '../redux/user/userSlice'

const EmailVerify = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const { signUpUserEmail } = useSelector((state) => state.category)

  const onSubmit = async (data) => {
    const otp = Object.values(data).join('');
    await dispatch(fetchUserVerifyOtp({ otp: Number(otp) }))
    navigate('/')
  }

  const handleMaskEmail = () => {
    const [username, domain] = signUpUserEmail.split('@');
    const maskedUsername = username.length <= 3 ? username.slice(0, 1) + '***' : username.slice(0, 3) + '***';
    return maskedUsername + '@' + domain;
  }


  return (
    <>
      <div className='border-2 w-[35%] px-16 mx-auto mt-12 pb-16 rounded-3xl text-sm'>
        <div className="text-center">
          <h1 className='text-2xl font-semibold py-7'>Verify your email</h1>
          <p>Enter the 8 digit code you have received on</p>
          <p className="font-semibold">{handleMaskEmail()}</p>

          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col pt-10'>
            <div>
              <div className='flex justify-between pb-2'>
                <label>Code</label>
                {errors.n1 && <span className=' text-red-500'>{errors.n1.message}</span>}
              </div>

              <div className="flex justify-between items-center text-base font-medium">
                <input
                  {...register("n1", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n2", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n3", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n4", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n5", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n6", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n7", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />

                <input
                  {...register("n8", {
                    required: { value: true, message: "* This field is required" },
                    pattern: { value: /^[0-9]+$/, message: "* Only digits (0-9) are allowed", },
                  })}
                  className='border-2 rounded-md p-2 w-10 text-center' maxLength={1} />
              </div>

            </div>

            {/* SUBMIT */}
            <input disabled={isSubmitting} type="submit" value="VERIFY" className='bg-black text-white w-full py-3 rounded-md tracking-wider mt-10 cursor-pointer' />
          </form>

        </div>
      </div>
    </>
  )
}

export default EmailVerify
