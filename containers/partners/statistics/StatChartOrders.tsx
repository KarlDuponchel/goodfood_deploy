import { useFetchCountOrdersByPeriod } from "@/hooks/reporting/use_fetch_count_orders_by_period";
import { convertDateToFr, getDay } from "@/utils/function";
import { PureComponent } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type StatChartOrdersProps = {
  period: string;
  idRestaurant: number;
};

export const StatChartOrders = ({
  period,
  idRestaurant,
}: StatChartOrdersProps) => {
  const countOrders = useFetchCountOrdersByPeriod(period, idRestaurant);

  const formatXAxis = (tickItem: string) => {
    let dateToReturn = "";

    if (period == "year") {
      dateToReturn = getDay(tickItem);
    } else {
      dateToReturn = convertDateToFr(tickItem);
    }
    return dateToReturn;
  };

  return (
    <div className="h-72 bg-white rounded-md flex flex-col gap-4">
      {idRestaurant ? (
        period ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={400}
              height={200}
              data={countOrders.data?.sort((a, b) =>
                a.dateMin.localeCompare(b.dateMin)
              )}
              margin={{
                left: -25,
                right: 10,
                top: 10,
                bottom: -15,
              }}
            >
              <CartesianGrid strokeDasharray="1 1" />
              <XAxis
                dataKey="dateMin"
                height={50}
                tickFormatter={(tick) => formatXAxis(tick)}
              />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div>Sélectionner une période</div>
        )
      ) : (
        <div>Sélectionner un restaurant</div>
      )}
    </div>
  );
};
