"use client";

import { Users } from "@/src/lib/firebase/store/users.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { MoreHorizontal } from "lucide-react";
import { toast } from "react-toastify";

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "company",
    header: () => <div className="min-w-[10rem]">Company</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="min-w-[5rem]">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
  {
    accessorKey: "firstName",
    header: () => <div className="min-w-[10rem]">FirstName</div>,
  },
  {
    accessorKey: "lastName",
    header: () => <div className="min-w-[10rem]">LastName</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const link = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                navigator.clipboard.writeText(link.user_link as string);
                toast.success("Copied!");
              }}
            >
              Copy Link
            </DropdownMenuItem>

            <DropdownMenuItem>Edit</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
