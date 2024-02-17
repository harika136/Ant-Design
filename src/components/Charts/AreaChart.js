import React, { useState, useRef } from 'react';
import { Upload, message, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';
import { Chart } from 'chart.js/auto';

const AreaChart = () => {
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
    const subjects = Object.keys(data[0]).filter((key) => key !== 'id' && key !== 'Name' && key !== 'Gender' && key !== 'Age' && key !== 'Section');
    const labels = data.map((entry) => entry.Name);

    const datasets = subjects.map((subject, index) => {
      const values = data.map((entry) => entry[subject]);

      return {
        label: subject,
        data: values,
        backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.6)`,
        borderColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 1)`,
        fill: true, // Set to true for area chart
      };
    });

    const chartData = {
      labels: labels,
      datasets: datasets,
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const ctx = chartRef.current.getContext('2d');
    new Chart(ctx, {
      type: 'line', // Change type to 'line'
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
        <canvas id="myChart" ref={chartRef} width="400" height="400" />
      </Space>
    </div>
  );
};

export default AreaChart;
