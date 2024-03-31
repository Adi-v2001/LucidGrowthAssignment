import { ListFilter } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

const PopoverFilter = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex text-violet-600 rounded-lg p-2 pl-3 pr-3 cursor-pointer space-x-3 border border-[rgb(124,58,237)] hover:bg-violet-100 transition-all ease-in-out duration-200">
            <ListFilter color="rgb(124,58,237)"/>
            <p>Filters</p>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        hi
      </PopoverContent>
    </Popover>
  )
}

export default PopoverFilter