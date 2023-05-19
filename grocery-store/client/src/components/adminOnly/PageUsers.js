import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '../..';
import { Pagination } from 'react-bootstrap';

const PageUsers = observer(() => {
    const { user } = useContext(Context);
    const pageCount = Math.ceil(user.totalCount / user.limit);
    const pages = [];
  
    for (let i = 0; i < pageCount; i++) {
      pages.push(i + 1);
    }
  
    return (
      <div>
        <Pagination className="mt-5">
          {pages.map((page) => (
            <Pagination.Item
              key={page}
              active={user.page === page}
              onClick={() => user.setPage(page)}
            >
              {page}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    );
  });

export default PageUsers