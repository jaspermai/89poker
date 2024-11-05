import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DropdownProps {
    buttonClassName?: string;
    value: string;
    dropdownOptions: string[];
    onChange: (value: string) => void; // Update to accept string
}

export function Dropdown({ buttonClassName = '', value, dropdownOptions, onChange }: DropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className={`${buttonClassName}`}>{value === '' ? 'Filter by Name' : value}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white text-black table-font max-h-60 md:max-h-80 overflow-y-auto">
                <DropdownMenuLabel>Player</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
                    <DropdownMenuRadioItem value="" className={`cursor-pointer dropdown-cell-hover`}>NO FILTER</DropdownMenuRadioItem>
                    {dropdownOptions.map((option, index) => (
                        <DropdownMenuRadioItem key={index} value={option} className={`cursor-pointer dropdown-cell-hover`}>
                            {option}
                        </DropdownMenuRadioItem>
                    ))}
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}