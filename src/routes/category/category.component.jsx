import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment, useEffect, useState } from 'react';

import {CategoryContainer,
        CategoryTitle
        } from './category.styles.jsx';

import { selectCategoriesMap } from '../../store/category/category.selector.js';

import ProductCard from '../../components/product-card/product-card.component';

const Category = () => {
    const {category} = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products,setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    },[category,categoriesMap]);
    return (
        <Fragment>
        <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
        <CategoryContainer>
            {products && products.map((product) => (
            <ProductCard key={product.id} product={product} /> 
            ))}
        </CategoryContainer>
        </Fragment>
    )
}

export default Category;