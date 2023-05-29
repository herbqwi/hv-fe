import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    var myChart = null;
    if (chartContainer && chartContainer.current) {
      const labels = data.map((d) => d.label);
      const values = data.map((d) => d.value);

      const colors = [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#4BC0C0",
        "#9966FF",
        "#FF9F40",
        "#00CC99",
        "#FF99CC",
        "#666699",
      ];

      // Create chart
      myChart = new Chart(chartContainer.current, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: values,
              backgroundColor: colors.slice(0, data.length),
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: `bottom`,
              fullSize: true,
            }
          }
        }
      });
    }
  }, [data]);

  return (
    <div style={{ height: "300px", width: "300px" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default PieChart;