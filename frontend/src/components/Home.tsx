import { useDns } from "@/Context/DnsContext";
import { columns } from "@/DNSDATA/columns";
import { DataTable } from "@/DNSDATA/data-table";
import SmallLoader from "./SmallLoader";
import { PieChart, Pie, Tooltip } from "recharts";

const Home = () => {
  const { allDNS, loading, dnsCount } = useDns();
  return (
    <>
      {loading ? (
        <div className="h-[400px] flex items-center justify-center">
          <SmallLoader />
        </div>
      ) : (
        <div className="container mx-auto py-10">
          {allDNS && allDNS?.length > 0 && (
            <>
              <DataTable columns={columns} data={allDNS} />
              <div className="flex flex-col items-center justify-center">
              <h1 className="font-semibold text-2xl mt-10">Analytics</h1>
              <PieChart width={3500} height={350}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={dnsCount}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                  />
                <Tooltip />
              </PieChart>
                  </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
