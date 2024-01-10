import React, { useState } from 'react';
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

import styles from './layout.module.css'

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Petianos', '1', <PieChartOutlined />),
  getItem('Projetos', '2', <DesktopOutlined />),
];

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout
      className={styles.container}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header
          style={{
            background: colorBgContainer,
          }}
        />
        <Content
        >
          <div
          >
            Bill is a cat.
          </div>
        </Content>
        <Footer
          className={styles.footer}
        >
          PETee ©{new Date().getFullYear()} Created by Leandro Müller
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
