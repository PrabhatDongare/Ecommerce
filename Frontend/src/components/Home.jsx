import { useEffect } from 'react'
import { BiSolidCheckbox, BiSolidCheckboxChecked } from "react-icons/bi";

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowCategory, fetchEditAddCategory, fetchEditDeleteCategory } from '../redux/category/categorySlice'

const Categorie = () => {
  const { page, category, interests } = useSelector((state) => state.category)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleToggleCB = (categoryId) => {
    if(interests.includes(categoryId)){
      dispatch(fetchEditDeleteCategory(categoryId))
    }
    else{
      dispatch(fetchEditAddCategory(categoryId))
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchShowCategory(page))
    }
    else {
      navigate('/login')
    }
  }, []);


  return (
    <>
      <div className='border-2 w-[35%] px-16 mx-auto mt-12 pb-10 pt-7 rounded-3xl text-sm'>
        <div className='text-center'>
          <h1 className='text-2xl font-semibold pb-3'>Please mark your interests!</h1>
          <p className='text-base pb-6'>We will keep you notified.</p>
        </div>
        <p className='font-semibold pb-4 pl-2'>My saved interests!</p>

        {/* CATEGORY DISPLAY */}
        {category.map(categoryRow => {
          return (
            <div className='flex items-center mb-3' key={categoryRow.id}>
              <button onClick={ () => handleToggleCB(categoryRow.id) } className='text-3xl mr-3'>
                { interests.includes(categoryRow.id) ? <BiSolidCheckboxChecked /> : <BiSolidCheckbox style={{ color: "#D3D3D3", }} />}
              </button>
              <span>{categoryRow.categoryName}</span>
            </div>
          )
        })}

        {/* PAGINATION */}
        <div className='flex gap-1 text-gray-400 pt-8 pl-2 font-medium'>
          <div className='flex gap-5'>
            <button disabled={page === 1} onClick={() => dispatch(fetchShowCategory(1))} > {"<<"} </button>
            <button disabled={page === 1} onClick={() => dispatch(fetchShowCategory(page - 1))}>{"<"}</button>
          </div>
          <div className='flex gap-2 w-44 justify-center'>
            <span style={{ display: page > 4 ? "inline" : "none" }}>...</span>
            {[...Array(7)].map((_, index) => {
              let pageNumber = page <= 4 ? index + 1 : (page > 14 ? page + index - (6 - (17 - page)) : page - 3 + index);

              return (
                <span key={index} style={{ color: pageNumber === page ? "black" : "gray" }}>
                  {pageNumber}
                </span>
              );
            })}
            <span style={{ display: page < 13 ? "inline" : "none" }}>...</span>
          </div>
          <div className='flex gap-5'>
            <button disabled={page === 17} onClick={() => dispatch(fetchShowCategory(page + 1))}>{">"}</button>
            <button disabled={page === 17} onClick={() => dispatch(fetchShowCategory(17))}>{">>"}</button>
          </div>
        </div>

      </div>
    </>
  )
}

export default Categorie
