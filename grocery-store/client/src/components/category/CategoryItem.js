import React from 'react'
import { PRODUCTS } from "../../utils/consts";
import { Link } from 'react-router-dom';

const CategoryItem = ({ category }) => {
    return (
        <div className="category">
            <Link to={`${PRODUCTS}/${category.id}`}>
                <div className="category-image" style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL + category.img})` }}>
                    <div className="category-title">{category.name}</div>
                </div>
            </Link>
        </div>
    )
}

export default CategoryItem;