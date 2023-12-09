import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  DownOutlined,
  FormOutlined,
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
import { getRecipeById } from "./Search";
import { render } from "react-dom";
import { getRecipe, searchRecipe, state } from "./data/data";
import Sidebar from "./Sidebar";
import { updateServings } from "./data/data";

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
    icon: <FormOutlined />,
  },
];

function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // 搜索框初始化
  // const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 搜索按钮
  const handleSearch = async (values) => {
    if (values === "") {
      return;
    }

    const query = values;
    await searchRecipe(query);

    setSearchValue(""); // initial value
  };

  // 获取食谱数据
  const handleRecipeId = async (id) => {
    await getRecipe(id);
    const data = state.recipe;
    console.log("🚀 ~ file: HomePage.jsx:69 ~ handleRecipeId ~ data:", data);

    setData(data);
  };

  // 服务人数控制
  const handleUpdateServings = (newServings) => {
    const newRecipe = updateServings(newServings);
    if (!newRecipe) return;

    setData(newRecipe); // react特性: 如果只是对原对象进行变化不会进行检测然后重新渲染，只有赋予了新的对象才会
  };

  // 书签控制
  const handleRecipeBookmarked = (newRecipe) => {
    setData(newRecipe);
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
          style={{
            backgroundColor: colorBgContainer,
            boxShadow: " 5px 0 5px rgba(0, 0, 0, 0.1)",
          }}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Sidebar collapsed={collapsed} onData={handleRecipeId}></Sidebar>
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
              <h2 style={{ color: "hsl(205, 86%, 17%)" }}>
                {data ? data.title : "Recipes"}
              </h2>
            </div>
            <div
              style={{
                padding: 0,
                minHeight: 360,
                height: "100%",
                background: colorBgContainer,
              }}
            >
              {data.id && (
                <Content
                  key={data.id}
                  data={data}
                  updateServings={handleUpdateServings}
                  recipeBookmarked={handleRecipeBookmarked}
                ></Content>
              )}
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
