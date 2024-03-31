import { DNS, columns } from "@/DNSDATA/columns"
import { DataTable } from "@/DNSDATA/data-table"
import axios from "axios"
import { useEffect, useState } from "react"

const Home = () => {
    const [allDNS, setAllDNS] = useState<DNS[]>()
    useEffect(() => {
      const getAllDns = async () => {
        const res = await axios.get(`${process.env.BASE_URL}/api/dns/getAllDNS`)
        setAllDNS(res.data)
      }
      getAllDns().catch(err => console.log("An error occured", err))
    }, [])
    return (
        <div className="container mx-auto py-10">
            {allDNS && allDNS?.length > 0 && <DataTable columns={columns} data={allDNS} />}
        </div>
      )
}

export default Home