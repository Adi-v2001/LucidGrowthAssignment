import Actions from "@/components/Actions";
import { ColumnDef } from "@tanstack/react-table";

enum RecordType {
  A,
  AAAA,
  CNAME,
  MX,
  NS,
  PTR,
  SOA,
  SRV,
  TXT,
  DNSSEC,
}

export type DNS = {
  id: number;
  uuid: string;
  name: string;
  recordType: RecordType;
  domain: string;
  createdAt: Date;
  updatedAt: Date
};

export const columns: ColumnDef<DNS>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "domain",
      header: "Domain Link",
      cell: (value) => {
        let link = value.getValue() as string
        if (!link.startsWith('https://')) {
        link = 'https://' + link;
    }
        return <a href={link} target="_blank" className="text-blue-600 underline hover:text-blue-800">{value.getValue() as string}</a>
      }
    },
    {
      accessorKey: "recordType",
      header: "Domain Type",
    },
    {
      accessorKey: "createdAt",
      header: "Creation Time",
      cell: (value) => {
        const dateValue = value.getValue() as string
        const newValue = new Date(dateValue).toLocaleDateString('en-GB', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
        return newValue
      }
    },
    {
      id: "actions",
      header: 'Actions',
    cell: ({ row }) => {
      return (
        <Actions row={row.original}/>
      )
    },
    }
  ]
