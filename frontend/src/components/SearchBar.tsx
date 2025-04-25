import { Input } from './ui/input'
//make thath acccepts classes 
type SearchBarProps = {
    classNames?: string[]
}

function SearchBar({ classNames = [] }:SearchBarProps) {
    return (
        <div className={`w-4/5 md:w-3/5 flex items-center ${classNames.join(' ')}`}>
            <Input type="text" placeholder="Cerca chat..." className="w-full" />
        </div>
    )
}

export default SearchBar