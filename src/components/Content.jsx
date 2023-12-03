import React, { useEffect, useState } from "react";
import styles from "../styles/content.module.css";
import { Avatar, List, Pagination } from "antd";
import { state } from "./data/data";
import { Link, useNavigate, useParams } from "react-router-dom";

function Content() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  // const navigate = useNavigate();
  // const { urlId } = useParams();

  const data = state.search.results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // 根据id进行页面切换
  const handleItemClick = (id) => {
    console.log("🚀 ~ file: Content.jsx:15 ~ handleItemClick ~ id:", id);
  };

  return (
    <div className={styles.content}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={
                <a
                  href={<Link to={`/detail/${item.id}`}>{item.title}</Link>}
                  onClick={(e) => {
                    e.preventDefault();
                    handleItemClick(item.id);
                  }}
                >
                  {item.title}
                </a>
              }
              description={item.publisher}
            />
          </List.Item>
        )}
      />
      <Pagination
        className={styles.pagination}
        total={state.search.results.length}
        showTotal={(total) => `Total ${total} items`}
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

export default Content;
