import { Skeleton } from "../ui/skeleton";

import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

function LoadingTable({ cells = 5 }) {
  return (
    <Table className="w-full lg:w-1/2 my-4">
      <TableHeader>
        <TableRow>
          {Array(cells)
            .fill()
            .map((_, index) => (
              <TableHead key={index}>
                <Skeleton className="w-[70px] h-4" />
              </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(10)
          .fill()
          .map((_, index) => (
            <TableRow key={index}>
              {Array(cells)
                .fill()
                .map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="w-[70px] h-4" />
                  </TableCell>
                ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

export default LoadingTable;
