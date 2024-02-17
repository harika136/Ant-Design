// Home.js
import React from 'react';
import { Typography, Card } from 'antd';
import { SmileOutlined, CodeOutlined, ExperimentOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const Home = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '76vh' }}>
      <Title level={2} style={{ marginBottom: '20px', color: '#1890ff', textAlign: 'center' }}>
        Welcome to Ant Design Dashboard
      </Title>
      <Paragraph style={{ fontSize: '18px', textAlign: 'center', marginBottom: '20px', color: '#333' }}>
      Where Imagination Unfolds, Crafting Tomorrow's Interfaces Today. Elevate Your Designs with Intuitive Components and a Symphony of Innovation. Embark on a Visual Odyssey, Where Every Pixel Tells a Story. Anticipate the Future, Designing Beyond Boundaries. In a World of Code, We Paint the Canvas of User Experiences.
      </Paragraph>

      <Card
        title="About Ant Design"
        style={{ marginTop: '20px', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}
      >
        <Paragraph style={{ fontSize: '16px', marginBottom: '10px', color: '#555' }}>
          Ant Design is a masterpiece created and nurtured by the brilliant minds at the Ant Design Team, Alibaba. It empowers
          developers and designers alike to sculpt interfaces that are not just functional but visually spectacular.
        </Paragraph>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div style={{ textAlign: 'center' }}>
            <SmileOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            <Text strong style={{ display: 'block', marginTop: '10px', fontSize: '16px' }}>
              User-Friendly Bliss
            </Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <CodeOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            <Text strong style={{ display: 'block', marginTop: '10px', fontSize: '16px' }}>
              Developer's Wonderland
            </Text>
          </div>
          <div style={{ textAlign: 'center' }}>
            <ExperimentOutlined style={{ fontSize: '36px', color: '#1890ff' }} />
            <Text strong style={{ display: 'block', marginTop: '10px', fontSize: '16px' }}>
              Innovation Unleashed
            </Text>
          </div>
        </div>
        <Paragraph style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>
          Immerse yourself in a world of limitless possibilities. Ant Design offers a rich palette of components, design principles,
          and customization options that transcend the ordinary. Elevate your UI development experience to an art form!
        </Paragraph>
        <Paragraph style={{ fontSize: '16px', color: '#555', marginTop: '10px' }}>
          For in-depth documentation, captivating demos, and a vibrant community, visit the official{' '}
          <a
            href="https://ant.design/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#1890ff', fontWeight: 'bold' }}
          >
            Ant Design website
          </a>
          .
        </Paragraph>
      </Card>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <a href="https://github.com/ant-design" target="_blank" rel="noopener noreferrer">
        <Title level={3} style={{ color: '#1890ff', marginBottom: '10px' }}>
          Embark on a Creative Journey
        </Title>
      </a>
        <Paragraph style={{ fontSize: '16px', color: '#555', marginBottom: '10px' }}>
          Discover the vast array of components by navigating through the sidebar. Your creative journey with Ant Design begins here!
        </Paragraph>
      </div>
    </div>
  );
};

export default Home;
