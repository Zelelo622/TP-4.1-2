import React, { useContext } from 'react'
import { Context } from '../..';
import { observer } from 'mobx-react-lite';
import CategoryItem from './CategoryItem';

const CategoryList = observer(() => {
    const { category } = useContext(Context);
    return (
        <div className="category-grid">
            {
                category.categorys.map(category =>
                    <CategoryItem key={category.id} category={category} />
                )
            }
        </div>
    );
});

export default CategoryList;