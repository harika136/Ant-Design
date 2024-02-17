import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
  HomeOutlined,
  TableOutlined,
  SearchOutlined,
  ExpandOutlined,
  SortAscendingOutlined,
  FilterOutlined,
  PieChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  AreaChartOutlined,
  DotChartOutlined,
} from '@ant-design/icons';
import Home from '../Home/Home';
import Table1 from '../Tables/Table1';
import Table2 from '../Tables/Table2';
import Table3 from '../Tables/Table3';
import Table4 from '../Tables/Table4';
import Table5 from '../Tables/Table5';
import PieChart from '../Charts/PieChart';
import BarChart from '../Charts/BarChart';
import LineChart from '../Charts/LineChart';
import AreaChart from '../Charts/AreaChart';
import BubbleChart from '../Charts/BubbleChart';
import GitHubLogo from '../github-mark-white.png';
import AntDesignLogo from '../ant-design.svg'; // Add the path to the Ant Design logo

const { Header, Content, Footer, Sider } = Layout;

const items = [
  { key: '1', icon: <HomeOutlined />, label: 'Home', component: <Home /> },
  { key: '2', icon: <TableOutlined />, label: 'General Table', component: <Table1 /> },
  { key: '3', icon: <FilterOutlined />, label: 'Filter Table', component: <Table2 /> },
  { key: '4', icon: <SortAscendingOutlined />, label: 'A/D Table', component: <Table3 /> },
  { key: '5', icon: <SearchOutlined />, label: 'Search Table', component: <Table4 /> },
  { key: '6', icon: <ExpandOutlined />, label: 'Expandable Table', component: <Table5 /> },
  { key: '7', icon: <PieChartOutlined />, label: 'Pie Chart', component: <PieChart /> },
  { key: '8', icon: <BarChartOutlined />, label: 'Bar Chart', component: <BarChart /> },
  { key: '9', icon: <LineChartOutlined />, label: 'Line Chart', component: <LineChart /> },
  { key: '10', icon: <AreaChartOutlined />, label: 'Area Chart', component: <AreaChart /> },
  { key: '11', icon: <DotChartOutlined />, label: 'Bubble Chart', component: <BubbleChart /> },
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenuItem(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          padding: '0 16px',
          background: '#001529',
          textAlign: 'left',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={AntDesignLogo} alt="Ant Design Logo" style={{ height: '40px', marginRight: '10px' }} />
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>ANT DESIGN</h1>
        </div>
        <a href="https://github.com/harika136/Ant-Design" target="_blank" rel="noopener noreferrer">
          <img src={GitHubLogo} alt="GitHub Logo" style={{ height: '50px', marginLeft: '10px', marginTop: '20px' }} />
        </a>
      </Header>
      <Layout>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ marginTop: '0px' }}
        >
          <div className="demo-logo-vertical" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon} onClick={() => handleMenuClick({ key: item.key })}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Content style={{ margin: '16px' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {selectedMenuItem && items.find((item) => item.key === selectedMenuItem)?.component}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
            Ant Design ©{new Date().getFullYear()} Created by Harika
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
