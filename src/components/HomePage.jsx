import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  theme,
  Input,
  Dropdown,
  Space,
  Image,
  Pagination,
  message,
} from "antd";
import styles from "../styles/layout.module.css";
import Content from "./Content";
import { fetchData } from "./Search";
import { render } from "react-dom";
import { getRecipe, searchRecipe, state } from "./data/data";

const { Header, Content: AntdContent, Footer, Sider } = Layout;
const { Search } = Input;

const USER_ITEMS = [
  {
    label: "Detail",
    key: "1",
    icon: <UserOutlined />,
  },
  {
    label: "Recipe Bookmark",
    key: "2",
  },
];

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
  const [searchValue, setSearchValue] = useState(""); // 搜索框初始化
  // const [query, setQuery] = useState("");
  const [renderRecipe, setRenderRecipe] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // search button
  const handleSearch = async (values) => {
    if (values === "") {
      return;
    }

    const query = values;
    await searchRecipe(query);

    setSearchValue(""); // initial value
  };

  return (
    <Layout>
      <Header className={styles.header}>
        <Image
          src="/src/assets/cooking.png"
          alt="logo"
          width={50}
          height={50}
          className={styles.logo}
        ></Image>
        Recipe Search System
        {/* 左上小菜单栏 */}
        <span className={styles.user}>
          <Dropdown menu={{ items: USER_ITEMS }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                Profile
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </span>
      </Header>
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
            <Menu></Menu>
          </Header>
          {/* content */}
          <AntdContent
            style={{
              margin: "0 16px",
            }}
          >
            <div>
              <h2>Recipes</h2>
            </div>
            <div
              style={{
                padding: 24,
                minHeight: 360,
                height: "100%",
                background: colorBgContainer,
              }}
            >
              <Content></Content>
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
    </Layout>
  );
}

export default HomePage;
