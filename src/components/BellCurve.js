import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    LinearScale
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );
  
  export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataIndex = context.dataIndex;
            const slice = context.dataset.data.slice(0, dataIndex);
            const percentile = slice.reduce((acc, cur) => acc + cur, 0);
            return `Percentile: ${percentile}`;
          },
        },
      },
      legend: {
        display: false,
        position: "bottom",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Score",
        },
      },
      y: {
        title: {
          display: false,
          text: "Pct",
        },
        ticks: {
          callback: function (value, index, ticks) {
            return value + "%";
          },
        },
      },
    },
  };
  
  export default function BellCurveChart({ bg, scores, percentages }) {
    const data = {
      labels: [...scores],
      datasets: [
        {
          label: "Scores",
          data: [...percentages],
          fill: true,
          backgroundColor: bg,
          pointBorderColor: "#ccc",
          pointBorderWidth: 5,
          pointRadius: 8,
          tension: 0.4,
        },
      ],
    };
  
    return <Line options={options} data={data} />;
  }