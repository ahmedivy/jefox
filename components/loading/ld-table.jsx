import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

function LoadingTable({ cells = 5, rows = 10, className = "" }) {
  return (
    <Table className={cn("w-full lg:w-1/2 p-4", className)}>
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
        {Array(rows)
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
