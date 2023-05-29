

const getPageCount = ({ itemsNum, currentPageNum, itemsPerPage }: {itemsNum: number, currentPageNum: number, itemsPerPage: number}) => {
    const totalPages = Math.ceil(itemsNum / itemsPerPage)
    const itemPos = (currentPageNum * itemsPerPage)
    return { totalPages, itemPos }
}

export default getPageCount;