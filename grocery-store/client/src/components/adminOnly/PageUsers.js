import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import Pagination from "react-bootstrap/Pagination";

const PageUsers = observer(() => {
  const { user } = useContext(Context);
  const pageCount = Math.ceil(user.totalCount / user.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  const visiblePages = 7;
  const ellipsisThreshold = Math.floor(visiblePages / 2); 

  const handlePageChange = (page) => {
    user.setPage(page);
    window.scrollTo(0, 0);
  };

  const getPageRange = () => {
    if (pageCount <= visiblePages) {
      return pages;
    }
    const startPage = Math.max(
      Math.min(user.page - ellipsisThreshold, pageCount - visiblePages + 1),
      1
    );
    const endPage = Math.min(startPage + visiblePages - 1, pageCount);
    return pages.slice(startPage - 1, endPage);
  };

  return (
    <div>
      <Pagination>
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(user.page - 1)}
          disabled={user.page === 1}
        />

        {getPageRange().map((page) => {
          if (
            page === 1 ||
            page === pageCount ||
            page === user.page ||
            (page >= user.page - ellipsisThreshold &&
              page <= user.page + ellipsisThreshold)
          ) {
            return (
              <Pagination.Item
                key={page}
                active={user.page === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            );
          } else if (
            (page === user.page - ellipsisThreshold - 1 &&
              user.page > ellipsisThreshold + 2) ||
            (page === user.page + ellipsisThreshold + 1 &&
              user.page < pageCount - ellipsisThreshold - 1)
          ) {
            return <Pagination.Ellipsis key={`ellipsis${page}`} />;
          }
          return null;
        })}

        <Pagination.Next
          onClick={() => handlePageChange(user.page + 1)}
          disabled={user.page === pageCount}
        />
        <Pagination.Last onClick={() => handlePageChange(pageCount)} />
      </Pagination>
    </div>
  );
});

export default PageUsers;
