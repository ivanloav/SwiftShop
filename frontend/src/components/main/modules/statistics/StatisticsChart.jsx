import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registra los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const StatisticsChart = ({ data }) => {
  const chartData = {
    labels: data.labels, // Etiquetas para el eje X
    datasets: [
      {
        label: "Recibidos",
        data: [data.received, 0, 0, 0], // Solo el primer valor es para "Recibidos"
        backgroundColor: "#FF6384",
      },
      {
        label: "En proceso",
        data: [0, data.processing, 0, 0], // Solo el segundo valor es para "En proceso"
        backgroundColor: "#36A2EB",
      },
      {
        label: "Enviados",
        data: [0, 0, data.shipped, 0], // Solo el tercer valor es para "Enviados"
        backgroundColor: "#FFCE56",
      },
      {
        label: "Entregados",
        data: [0, 0, 0, data.delivered], // Solo el cuarto valor es para "Entregados"
        backgroundColor: "#4BC0C0",
      },
    ],
  };

  const maxDataValue = Math.max(
    data.received,
    data.processing,
    data.shipped,
    data.delivered
  );
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Estadísticas de Pedidos",
      },
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: true,
        },
        suggestedMax: maxDataValue + maxDataValue * 0.1, // Ajusta el máximo del eje Y
      },
    },
    barThickness: 125, // Ajusta el grosor de las barras
  };

  return <Bar data={chartData} options={chartOptions} />;
};
