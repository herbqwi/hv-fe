import { useState } from "react"


const usePagination = (listSize: number, pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(0)
  const pageCount = Math.ceil(listSize / pageSize);
  const startingIndex = currentPage * pageSize, endingIndex = ((currentPage * pageSize) + pageSize)

  return { currentPage, setCurrentPage, pageCount, index: { start: startingIndex, end: endingIndex }, available: { prev: currentPage != 0 && listSize != 0, next: currentPage != pageCount - 1 && listSize != 0 } }
}

export default usePagination