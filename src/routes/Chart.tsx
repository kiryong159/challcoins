import { useQuery } from "@tanstack/react-query";
import { fetchOHLCV } from "../api";
import ApexChart from "react-apexcharts";

interface IChart {
  coinId: string;
}

interface IOHLCV {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Chart({ coinId }: IChart) {
  const { data: OHLCVData, isLoading } = useQuery<IOHLCV[]>(
    ["OHLCV", `${coinId}`],
    () => fetchOHLCV(coinId)
  );
  const data2 = OHLCVData ?? [];

  if (!data2.length) {
    return <h3>차트 데이터가 없습니다.</h3>;
  }

  const chartData = data2?.map((data) => {
    return {
      x: new Date(data.time_close * 1000),
      y: [data.open, data.high, data.low, data.close],
    };
  });

  if (isLoading) {
    return <h3>Loading Chart...</h3>;
  }

  return (
    <>
      {isLoading ? (
        "Loading Chart..."
      ) : data2 ? (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: chartData,
            },
          ]}
          options={{
            theme: { mode: "dark" },
            chart: { height: 350, width: 500, toolbar: { show: false } },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      ) : (
        "차트 데이터가 없습니다."
      )}
    </>
  );
}

export default Chart;
