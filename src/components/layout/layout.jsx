import { Layout, theme, Menu } from 'antd';
import {
  DesktopOutlined,
  UnorderedListOutlined,
  ApiOutlined
} from '@ant-design/icons';

import styles from './layout.module.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem('Petianos', '/petianos', <UnorderedListOutlined />),
  getItem('Projetos', '/projects', <DesktopOutlined />),
  getItem('Núcleos', '/nucleos', <ApiOutlined />),
];

const LayoutPage = ({ children }) => {
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { headerBg },
  } = theme.useToken();

  return (
    <Layout
      className={styles.container}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className={`${styles.logo} ${collapsed ? styles.logoCollapsed : ''}`}>
          <img src="/imgs/logoPET.png" alt="Logo petee" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['/']}
          mode="inline" items={items}
          onClick={({ key }) => {
            navigate(key);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: headerBg,
          }}
        >
        </Header>
        <Content
        >
          {children}
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
