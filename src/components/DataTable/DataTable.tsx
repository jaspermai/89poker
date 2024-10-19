import { Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table"
import { Input } from "@/components/ui/input"

import { useState } from 'react';

interface DataTableProps {
    title: string;
    tableHeaders: Array<string>;
    tableBody: Array<{ [key: string]: string | number | null }>;
    // tableBody will be in the form of [{a: x, b: y, c: z}, {a: x, b: y, c: z}, ...]
    blurIndex?: number;
    isMatchHistory?: boolean;
}

export function DataTable({title, tableHeaders, tableBody, blurIndex, isMatchHistory}: DataTableProps) {
    // If isMatchHistory, then add filter by Name option
    const [filterName, setFilterName] = useState<string>('')

    const filteredTableBody = isMatchHistory && filterName !== ''
        ? tableBody.filter(row => {
            const rowValues = Object.values(row); // Get the row values as an array
            return rowValues[1]?.toString().toLowerCase().includes(filterName.toString().toLowerCase());
        })
        : tableBody;
    
    return(
        <div className='my-24 px-4'>
            <div className='table-title-font text-3xl md:text-4xl text-center my-4'>
                - {title} -
            </div>
            <div className='w-full max-w-6xl mx-auto'>
                {isMatchHistory && 
                    <div className="flex justify-end mb-4">
                        <Input 
                            className="bg-white text-black table-font text-sm md:text-base w-28 md:w-44 p-2 border rounded-lg"
                            value={filterName}
                            onChange={(e) => setFilterName(e.target.value)}
                            placeholder="Filter by player"
                        />
                    </div>
                }
                <div className="overflow-hidden mb-20">
                    <Table className='table-font text-md md:text-lg text-center w-full overflow-hidden'>
                        <TableHeader className='font-semibold border-2'>
                            <TableRow>
                                {tableHeaders.map((header, index) => (
                                    <TableCell key={index} className='table-cell-hover'>{header}</TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className='border-none'>
                            {filteredTableBody.map((row, rowIndex) => (
                                <TableRow key={rowIndex} className='border-none'>
                                    {Object.values(row).map((val, i) => (
                                        <TableCell key={i} className={`table-cell-hover border-none ${blurIndex && blurIndex === i ? 'table-cell-blur' : '' }`}>
                                            {val}
                                            {i === 0 && (val?.toString() === '1' || val?.toString().startsWith('1 ')) ?
                                            <img 
                                                src='/star.png'
                                                alt="star" 
                                                className="inline-block ml-1 align-middle"
                                            /> : null}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}