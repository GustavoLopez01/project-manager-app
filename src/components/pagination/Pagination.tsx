type PaginationProps = {
  items: number[]
  currentPage: number
  setCurrentPage: (page: number) => void
}

export default function Pagination({
  items,
  currentPage,
  setCurrentPage
}: PaginationProps) {
  return (
    <>
      <div className="flex gap-2">
        {items.map(item => (
          <button
            key={item}
            className={`${currentPage === item ? 'bg-amber-500 hover:bg-amber-600' : 'bg-gray-300 hover:bg-gray-400'} text-white font-barlow-black text-center w-8 h-8 rounded-full cursor-pointer`}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </button>
        ))}
      </div>

    </>
  )
}
