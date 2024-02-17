import React, { useState, useRef } from 'react';
import { Table, Upload, Button, message, Input } from 'antd';
import { UploadOutlined, SearchOutlined } from '@ant-design/icons';
import Papa from 'papaparse';

const CSVTable = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const searchInput = useRef(null);

  const handleUpload = (info) => {
    setLoading(true);
    Papa.parse(info.file, {
      complete: (result) => {
        if (result.data && result.data.length > 0) {
          const columnNames = result.data[0];
          const tableData = result.data.slice(1);
          setColumns(
            columnNames.map((name, index) => ({
              title: name,
              dataIndex: `${index}`,
              key: `${index}`,
            }))
          );
          setData(tableData);
          setLoading(false);
        } else {
          message.error('Error parsing CSV file');
          setLoading(false);
        }
      },
      error: () => {
        message.error('Error parsing CSV file');
        setLoading(false);
      },
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span>
          {text
            .toString()
            .split(new RegExp(`(${searchText})`, 'gi'))
            .map((fragment, i) =>
              fragment.toLowerCase() === searchText.toLowerCase() ? (
                <span key={i} style={{ fontWeight: 'bold' }}>
                  {fragment}
                </span>
              ) : (
                fragment
              )
            )}
        </span>
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Upload
        accept=".csv"
        showUploadList={false}
        beforeUpload={(file) => {
          handleUpload({ file });
          return false;
        }}
      >
        <Button icon={<UploadOutlined />} loading={loading} style={{ marginBottom: '20px' }}>
          Upload CSV
        </Button>
      </Upload>
      <Table
        dataSource={data}
        columns={columns.map((col) => ({
          ...col,
          ...getColumnSearchProps(col.dataIndex),
        }))}
        bordered
        pagination={{ pageSize: 10 }}
        scroll={{ x: true }}
      />
    </div>
  );
};

export default CSVTable;
