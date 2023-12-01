import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme, Input } from "antd";
import styles from "../styles/search.module.css";
import Content from "./Content";

const { Header, Content: AntdContent, Footer, Sider } = Layout;
const { Search } = Input;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("pasta", "1"),
  {
    key: "3",
    label: "pizza",
    icon: <PieChartOutlined />,
    children: [{ label: "pomodoro", key: "4" }],
  },
];

function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSearch = (values) => {
    if (values === "") {
      return;
    }
    console.log("search button", values);
    setSearchValue("");
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["2"]}
          mode="inline"
          items={items}
        />
      </Sider>

      {/* main */}
      <Layout>
        {/* header */}
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Search
            className={styles.search}
            placeholder="input search text"
            enterButton
            allowClear
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onSearch={handleSearch}
          />
        </Header>
        {/* content */}
        <AntdContent
          style={{
            margin: "0 16px",
          }}
        >
          <div>
            <h2>Title</h2>
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Content items={items}>hello</Content>
          </div>
        </AntdContent>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}

export default HomePage;
