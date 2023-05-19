import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../..";
import Pagination from "react-bootstrap/Pagination";

const PagesProduct = observer(() => {
  const { product } = useContext(Context);
  const pageCount = Math.ceil(product.totalCount / product.limit);
  const pages = [];

  for (let i = 0; i < pageCount; i++) {
    pages.push(i + 1);
  }

  const visiblePages = 7;
  const ellipsisThreshold = Math.floor(visiblePages / 2);

  const handlePageChange = (page) => {
    product.setPage(page);
    window.scrollTo(0, 0);
  };

  const getPageRange = () => {
    if (pageCount <= visiblePages) {
      return pages;
    }
    const startPage = Math.max(
      Math.min(product.page - ellipsisThreshold, pageCount - visiblePages + 1),
      1
    );
    const endPage = Math.min(startPage + visiblePages - 1, pageCount);
    return pages.slice(startPage - 1, endPage);
  };

  return (
    <div>
      <Pagination className="mt-5">
        <Pagination.First onClick={() => handlePageChange(1)} />
        <Pagination.Prev
          onClick={() => handlePageChange(product.page - 1)}
          disabled={product.page === 1}
        />

        {getPageRange().map((page) => {
          if (
            page === 1 ||
            page === pageCount ||
            page === product.page ||
            (page >= product.page - ellipsisThreshold &&
              page <= product.page + ellipsisThreshold)
          ) {
            return (
              <Pagination.Item
                key={page}
                active={product.page === page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Pagination.Item>
            );
          } else if (
            (page === product.page - ellipsisThreshold - 1 &&
              product.page > ellipsisThreshold + 2) ||
            (page === product.page + ellipsisThreshold + 1 &&
              product.page < pageCount - ellipsisThreshold - 1)
          ) {
            return <Pagination.Ellipsis key={`ellipsis${page}`} />;
          }
          return null;
        })}

        <Pagination.Next
          onClick={() => handlePageChange(product.page + 1)}
          disabled={product.page === pageCount}
        />
        <Pagination.Last onClick={() => handlePageChange(pageCount)} />
      </Pagination>
    </div>
  );
});

export default PagesProduct;
