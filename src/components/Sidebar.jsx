import React, { useEffect, useState } from "react";
import styles from "../styles/sidebar.module.css";
import { Avatar, List, Pagination } from "antd";
import { getRecipe, state } from "./data/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRecipeById } from "./Search";

function Sidebar({ collapsed, onData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [resize, setResize] = useState(false);
  // const navigate = useNavigate();
  // const { urlId } = useParams();

  const data = state.search.results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 传递id参数给父级元素
  const handleItemClick = async (id) => {
    onData(id);
  };

  useEffect(() => {
    setResize(collapsed);
  }, [collapsed]);

  return (
    <div className={styles.content}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item
            className={styles.list}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.id);
            }}
          >
            {resize ? (
              <List.Item.Meta
                className={styles.listItemMetaShort}
                avatar={
                  <Avatar style={{ width: 60, height: 60 }} src={item.image} />
                }
              />
            ) : (
              <List.Item.Meta
                className={styles.listItemMeta}
                avatar={<Avatar src={item.image} />}
                title={
                  <a
                    href={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
                    // onClick={(e) => {
                    //   e.preventDefault();
                    //   handleItemClick(item.id);
                    // }}
                  >
                    {item.title}
                  </a>
                }
                description={item.publisher}
              />
            )}
          </List.Item>
        )}
      />
      <Pagination
        className={styles.pagination}
        total={state.search.results.length}
        showTotal={(total) => (resize ? "" : `Total ${total} items`)}
        defaultPageSize={pageSize}
        defaultCurrent={1}
        current={currentPage}
        pageSize={pageSize}
        onChange={(page, pageSize) => {
          setPageSize(pageSize);
          setCurrentPage(page);
        }}
      />
    </div>
  );
}

export default Sidebar;
