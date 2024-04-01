import { useDns } from "@/Context/DnsContext";
import { columns } from "@/DNSDATA/columns";
import { DataTable } from "@/DNSDATA/data-table";
import SmallLoader from "./SmallLoader";

const Home = () => {
  const { allDNS, loading } = useDns();
  return (
    <>
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <SmallLoader />
        </div>
      ) : (
        <div className="container mx-auto py-10">
          {allDNS && allDNS?.length > 0 && (
            <DataTable columns={columns} data={allDNS} />
          )}
        </div>
      )}
    </>
  );
};

export default Home;
