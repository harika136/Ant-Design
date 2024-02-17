import React, { useState } from 'react';
import { Table, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const CSVTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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

  // Define columns for the table
  const columns = data.length > 0 ? data[0].map((item, index) => ({
    title: item,
    dataIndex: `${index}`,
    key: `${index}`,
    sorter: (a, b) => {
      // Convert values to string for proper comparison
      const aValue = String(a[index] || '');
      const bValue = String(b[index] || '');
      return aValue.localeCompare(bValue); // Sort alphabetically
    },
  })) : [];

  // Define expanded row content
  const expandedRowRender = (record) => {
    return (
      <pre style={{ margin: 0 }}>{JSON.stringify(record, null, 2)}</pre>
    );
  };

  // Handle row expand
  const handleRowExpand = (expanded, record) => {
    setExpandedRowKeys(expanded ? [record.key] : []);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* Upload component for uploading CSV file */}
      <Upload
        accept=".csv"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload({ file });
          return false; // Prevent default upload behavior
        }}
      >
        <Button icon={<UploadOutlined />} loading={loading} style={{ marginBottom: '20px' }}>
          Upload CSV
        </Button>
      </Upload>

      {/* Table component to display CSV data */}
      <Table
        dataSource={data.map((row, index) => ({ ...row, key: `${index}` }))}
        columns={columns}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }} // Enable horizontal scrolling if needed
        expandable={{ expandedRowRender, onExpand: handleRowExpand, expandedRowKeys }}
      />
    </div>
  );
};

export default CSVTable;
