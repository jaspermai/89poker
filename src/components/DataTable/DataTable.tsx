import { Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table"

interface DataTableProps {
    title: string;
    tableHeaders: Array<string>;
    tableBody: Array<{ [key: string]: string | number | null }>;
    // tableBody will be in the form of [{a: x, b: y, c: z}, {a: x, b: y, c: z}, ...]
    blurIndex?: number;
}

export function DataTable({title, tableHeaders, tableBody, blurIndex}: DataTableProps) {
    return(
        <div className='my-24 px-4'>
            <div className='table-title-font text-2xl md:text-4xl text-center my-4'>
                - {title} -
            </div>
            <Table className='table-font text-md md:text-lg text-center w-full max-w-6xl mx-auto'>
                <TableHeader className='font-semibold border-2'>
                    <TableRow>
                        {tableHeaders.map((header, index) => (
                            <TableCell key={index} className='table-cell-hover'>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className='border-none'>
                    {tableBody.map((row, rowIndex) => (
                        <TableRow key={rowIndex} className='border-none'>
                            {Object.values(row).map((val, i) => (
                                // If index is the last one (it represents rank) AND the value starts with a 1 (since we will never go double-digits), then add a star
                                <TableCell key={i} className={`table-cell-hover border-none ${blurIndex && blurIndex === i ? 'table-cell-blur' : '' }`}>
                                    {val}
                                    {i === tableHeaders.length - 1 && val?.toString().startsWith('1') ?
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
    )
}