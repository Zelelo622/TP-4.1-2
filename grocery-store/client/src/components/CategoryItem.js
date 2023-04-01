import React from 'react'

const CategoryItem = ({ category }) => {
    return (
        <div className="category">
            <div className="category-image" style={{ backgroundImage: `url(${category.img})` }}>
                <div className="category-title">{category.name}</div>
            </div>
        </div>
    )
}

export default CategoryItem;