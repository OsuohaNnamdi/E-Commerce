import React from 'react';
import { Products } from '../../../Component/ProductContent/productContent';
import { ProductProps } from './productProps';
import "./product.css"; 

export const Producs = () => {
  return (
    <div className='product'>
      <div className='productTitle'>
        <h3>PASTRIES</h3>
      </div>
      <div className='Products'>
        {Products.map((product) => (
          <ProductProps key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
