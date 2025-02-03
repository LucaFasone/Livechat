import React from 'react'
import { Input } from './ui/input'

function SearchBar() {
    return (
        <div className="p-4">
            <Input type="text" placeholder="Cerca chat..." className="w-full" />
        </div>
    )
}

export default SearchBar