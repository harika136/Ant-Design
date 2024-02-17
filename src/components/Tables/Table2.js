import React, { useState } from 'react';
import { Table, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const CSVTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to handle file upload
  const handleUpload = (info) => {
    const { file } = info;

    // Set loading state
    setLoading(true);

    // Parse uploaded CSV file
    Papa.parse(file, {
      complete: (result) => {
        // Check if data is successfully parsed
        if (result.data) {
          setData(result.data); // Set the parsed data to state
          setLoading(false); // Reset loading state
        } else {
          message.error('Error parsing CSV file');
          setLoading(false); // Reset loading state
        }
      },
      error: () => {
        message.error('Error parsing CSV file');
        setLoading(false); // Reset loading state
      },
    });
  };

  // Function to generate columns dynamically
  const generateColumns = () => {
    if (data.length === 0) return [];

    return data[0].map((item, index) => ({
      title: item,
      dataIndex: `${index}`,
      key: `${index}`,
      sorter: (a, b) => {
        // Convert values to string for proper comparison
        const aValue = String(a[index] || '');
        const bValue = String(b[index] || '');
        return aValue.localeCompare(bValue); // Sort alphabetically
      },
      filters: Array.from(new Set(data.slice(1).map(row => row[index]))).map(value => ({
        text: value,
        value: value,
      })),
      onFilter: (value, record) => record[index] === value,
      filterMultiple: true, // Allow multiple selections
    }));
  };

  return (
    <div>
      {/* Upload component for uploading CSV file */}
      <Upload
        accept=".csv"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload({ file });
          return false; // Prevent default upload behavior
        }}
      >
        <Button icon={<UploadOutlined />} loading={loading}>Upload CSV</Button>
      </Upload>

      {/* Table component to display CSV data */}
      <Table
        dataSource={data.slice(1)} // Exclude header row from data
        columns={generateColumns()}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }} // Enable horizontal scrolling if needed
      />
    </div>
  );
};

export default CSVTable;
