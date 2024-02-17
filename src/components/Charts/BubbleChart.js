import React, { useState, useRef } from 'react';
import { Upload, message, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { Chart } from 'chart.js/auto'; // Import Chart object

const BubbleChart = () => {
  const chartRef = useRef(null);
  const [data, setData] = useState([]);

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const results = await new Promise((resolve) => {
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: (result) => {
            resolve(result.data);
          },
          error: (error) => {
            onError(error.message);
          },
        });
      });

      setData(results);
      renderChart(results);
      onSuccess();
    } catch (error) {
      onError(error.message);
    }
  };

  const beforeUpload = (file) => {
    const isCSV = file.type === 'text/csv';
    if (!isCSV) {
      message.error('You can only upload CSV files!');
    }
    return isCSV;
  };

  const renderChart = (data) => {
    const labels = data.map((entry) => entry.Name);

    const datasets = [
      {
        label: 'Science',
        data: data.map((entry) => ({
          x: entry.Science,
          y: entry.Age,
          r: entry.Science / 2, // Adjust the factor for bubble size
        })),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Color for Science data
      },
      {
        label: 'English',
        data: data.map((entry) => ({
          x: entry.English,
          y: entry.Age,
          r: entry.English / 2,
        })),
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Color for English data
      },
      {
        label: 'History',
        data: data.map((entry) => ({
          x: entry.History,
          y: entry.Age,
          r: entry.History / 2,
        })),
        backgroundColor: 'rgba(255, 205, 86, 0.6)', // Color for History data
      },
      {
        label: 'Maths',
        data: data.map((entry) => ({
          x: entry.Maths,
          y: entry.Age,
          r: entry.Maths / 2,
        })),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Color for Maths data
      },
    ];

    const chartData = {
      labels: labels,
      datasets: datasets,
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Subject Score',
          },
        },
        y: {
          title: {
            display: true,
            text: 'Age',
          },
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'bubble',
      data: chartData,
      options: chartOptions,
    });
  };

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Upload
          customRequest={customRequest}
          beforeUpload={beforeUpload}
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Upload CSV</Button>
        </Upload>
        <canvas id="myChart" ref={chartRef} width="600" height="400" />
      </Space>
    </div>
  );
};

export default BubbleChart;
