import { FILTERS_ITEMS_PER_PAGE } from '@/src/utils/constants';

type ItemsPerPageProps = {
  setItems: (quantity: number) => void
}

export default function ItemsPerPage({
  setItems
}: ItemsPerPageProps) {
  return (
    <div className="flex gap-2 items-center">
      <label
        htmlFor="items"
      >
        Filtra los registros
      </label>
      <select
        id="items"
        className="text-sm border-1 border-gray-400 outline-0 p-2 rounded-md"
        onChange={(e) => setItems(Number(e.target.value))}
      >
        {FILTERS_ITEMS_PER_PAGE.map(item => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
    </div>
  )
}
