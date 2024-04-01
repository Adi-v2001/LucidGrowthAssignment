/* eslint-disable @typescript-eslint/no-unused-vars */
import { DNS } from "@/DNSDATA/columns";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface DnsContext {
    allDNS: DNS[],
    refreshAllDns: () => void,
    loading: boolean,
    dnsCount: DNSCOUNT[]
}

interface DNSCOUNT{
    name: string, 
    value: number
}

const dnsContext = createContext<DnsContext>({
    allDNS: [],
    refreshAllDns: () => {},
    loading: false,
    dnsCount: []
});

export function DnsProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

    const [allDNS, setAllDNS] = useState<DNS[]>([])
    const [dnsCount, setDnsCount] = useState<DNSCOUNT[]>([])
    const [refresh, setRefresh] = useState(false)
    const [loading, setLoading] = useState(true)

    const refreshAllDns = () => {
        setRefresh(prev => !prev)
    }

    useEffect(() => {
      const getAllDns = async () => {
        setLoading(true)
        const res = await axios.get(`${process.env.BASE_URL}/api/dns/getAllDNS`)
        setAllDNS(res.data)
      }
      const getDnsCount = async () => {
        const res = await axios.get(`${process.env.BASE_URL}/api/dns/getCountOfDns`)
        setDnsCount(res.data)
      }
      getAllDns().catch(err => console.log("An error occured", err))
      getDnsCount().catch(err => console.log("An error occured", err)).finally(() => setLoading(false))
    }, [refresh])

  return (
    <dnsContext.Provider value={{allDNS, refreshAllDns, loading, dnsCount}}>
      {children}
    </dnsContext.Provider>
  );
}

export const useDns = () => useContext(dnsContext);
