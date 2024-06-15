import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import ReactApexChart from "react-apexcharts";

const Statistics = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookingStats');
      return res.data
    }
  });

  if (isLoading) return


  const series = [{
    data: stats.map(item => item.totalBookings)
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: stats.map(item => item._id)
    }
  }

  return (
    <section>
      <SectionHeading>Statistics</SectionHeading>

      <div>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
        <div id="html-dist"></div>
      </div>
    </section>
  );
};

export default Statistics;