import React, { useEffect, useState } from "react";
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
  Button,
  Modal,
} from "antd";
import styles from "../styles/layout.module.css";
import Content from "./Content";
import { getRecipeById } from "./Search";
import { render } from "react-dom";
import {
  clearBookmarks,
  getRecipe,
  init,
  renderBookmark,
  searchRecipe,
  state,
} from "./data/data";
import Sidebar from "./Sidebar";
import { updateServings, recipeBookmarked } from "./data/data";
import BookmarkWindow from "./BookmarkWindow";

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
    children: [],
  },
];

function HomePage() {
  const [collapsed, setCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState(""); // 搜索框初始化
  // const [query, setQuery] = useState("");
  const [data, setData] = useState({});
  const [bookmarkedRecipe, setBookmarkedRecipe] = useState([]);
  const [open, setOpen] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // 获取初始数据并渲染初始数据
  useEffect(() => {
    try {
      const intialValue = init();
      if (!intialValue) throw new Error("No local recipes bookmarked");
      setBookmarkedRecipe(intialValue);
    } catch (error) {
      message.warning(error.message);
    }
  }, []);

  // modal option
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // 搜索按钮
  const handleSearch = async (values) => {
    if (values === "") {
      return;
    }

    const query = values;
    await searchRecipe(query);

    setSearchValue(""); // initial value
  };

  // 根据id获取食谱
  const handleRecipeId = async (id, isBookmarked = false) => {
    const data = await getRecipe(id, isBookmarked);
    console.log("🚀 ~ file: HomePage.jsx:69 ~ handleRecipeId ~ data:", data);

    setData(data);
  };

  // 获取食谱数据
  const handleRecipeItem = async (item) => {
    const data = item;
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
    if (newRecipe.bookmark) {
      message.success("Bookmarked");
    } else {
      message.success("Unbookmarked");
    }
    recipeBookmarked(newRecipe);
    bookmarkWindow();
    setData(newRecipe);
  };

  // 更新书签食谱数据
  const bookmarkWindow = () => {
    const getData = renderBookmark();

    setBookmarkedRecipe(getData);
  };

  // clear local storage 数据
  const handleClearButton = () => {
    message.success("Clear");
    clearBookmarks();
    setBookmarkedRecipe([]);
    setData({});
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
        {/* 右上小菜单栏 */}
        <span className={styles.user}>
          <Dropdown
            menu={{
              items: USER_ITEMS.map((item, index) =>
                item.label === "Recipe Bookmark"
                  ? {
                      ...item,
                      children: bookmarkedRecipe.map((recipe, index) => ({
                        label: (
                          // 将所有书签食谱依次渲染
                          <BookmarkWindow
                            key={recipe.id} // 使用 recipe 的唯一标识作为 key
                            data={recipe}
                            onData={handleRecipeId}
                          />
                        ),
                        key: `${index}-${item.key}`, // 使用组合键确保唯一性
                      })),
                    }
                  : item
              ),
            }}
            autoAdjustOverflow={true}
          >
            <a>
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
            <Button
              onClick={() => {
                Modal.confirm({
                  open: { open },
                  title: "Clear",
                  content: "Are you sure to clear the local storage?",
                  onOk: () => {
                    handleClearButton();
                    handleOk();
                  },
                  onCancel: { handleCancel },
                  footer: (_, { OkBtn, CancelBtn }) => (
                    <>
                      <CancelBtn />
                      <OkBtn />
                    </>
                  ),
                });
              }}
              style={{ float: "right", margin: 15 }}
            >
              Clear
            </Button>
            {/* <Modal
              open={open}
              title="Clear"
              onOk={() => {
                handleClearButton();
                handleOk();
              }}
              onCancel={handleCancel}
              footer={(_, { OkBtn, CancelBtn }) => (
                <>
                  <CancelBtn />
                  <OkBtn />
                </>
              )}
            >
              <p>Are you sure to clear local storage?</p>
            </Modal> */}
            {/* <Menu></Menu> */}
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
