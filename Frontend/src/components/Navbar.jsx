import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { IoSearchOutline } from "react-icons/io5";
import { PiShoppingCartSimpleLight } from "react-icons/pi";

const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    if(localStorage.getItem('token')){
    localStorage.removeItem('token')
    navigate('/login')
    toast.success('User Logged out')
    }
  }

  return (
    <>
      <div className='px-10 pt-1'>
        <div className='flex justify-end gap-x-5 text-sm'>
          <NavLink to="/" >Help</NavLink>
          <NavLink to="/" >Orders & Returns</NavLink>
          <span >Hi, John</span>
        </div>

        <div className='flex justify-between items-center my-3'>
          <h1 className='text-3xl font-bold'>ECOMMERCE</h1>
          <div className='pr-24'>
            <ul className='flex gap-10 text-lg font-medium'>
              <li ><NavLink to="/" >Categories</NavLink></li>
              <li ><NavLink to="/" >Sale</NavLink></li>
              <li ><NavLink to="/">Clearence</NavLink></li>
              <li ><NavLink to="/" >New Stock</NavLink></li>
              <li><NavLink to="/" >Trending</NavLink></li>
            </ul>
          </div>

          <div className='gap-7 text-2xl flex px-1'>
            <button><IoSearchOutline /></button>
            <button onClick={handleLogout}>
              {localStorage.getItem('token') ? (
                <PiShoppingCartSimpleLight style={{ color: "gray" }} />
              ) : (
                <PiShoppingCartSimpleLight />
              )}
            </button>
          </div>

        </div>
      </div>

      <div className='text-center bg-zinc-50 py-1'>
        <button>{`<`}</button>
        <span className='px-5 '>Get 10% off on business sign up</span>
        <button>{`>`}</button>
      </div>
    </>
  )
}

export default Header
