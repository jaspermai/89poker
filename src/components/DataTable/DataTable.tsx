import { Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table"

interface DataTableProps {
    title: string;
    tableHeaders: Array<string>;
    tableBody: Array<{ [key: string]: string | number | null }>;
    // tableBody will be in the form of [{a: x, b: y, c: z}, {a: x, b: y, c: z}, ...]
}

export function DataTable({title, tableHeaders, tableBody}: DataTableProps) {
    return(
        <div className='my-24'>
            <div className='table-title-font text-4xl text-center my-4'>
                - {title} -
            </div>
            <Table className='table-font text-lg text-center w-full max-w-6xl mx-auto'>
                <TableHeader className='font-semibold border-2'>
                    <TableRow>
                        {tableHeaders.map((header) => (
                            <TableCell className='table-cell-hover'>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className='border-none'>
                    {tableBody.map((row) => (
                        <TableRow className='border-none'>
                            {Object.values(row).map((val, i) => (
                                // If index is the last one (it represents rank) AND the value starts with a 1 (since we will never go double-digits), then add a star
                                <TableCell className='table-cell-hover border-none'>
                                    {val}
                                    {i === tableHeaders.length - 1 && val?.toString().startsWith('1') ?
                                    <img 
                                        src="src/assets/star.png" 
                                        alt="Star Icon" 
                                        className="inline-block ml-1 align-middle" // Adjust margin as needed
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