import React, { useEffect } from 'react'
import "./Home.css"
import ProductCard from './ProductCard'
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';

const Home = () => {
  const alert = useAlert()
  const dispatch = useDispatch();
  const {products, loading, error} = useSelector(
    (state) => state.products
  );

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);


  return (
    <>
    {loading ? <Loader /> :
    (<>
      <MetaData title="ECOMMERCE"/>
      <div className='homedash'>
          <h2 className='homeHeading'>Featured Products</h2>
      <div className='container' id='container'>
         {products && products.map((product)=> 
        
         <ProductCard product={product}/>
        )}
  
      </div>
      </div>
      </>
    ) }
    </>
    
  )
}

export default Home