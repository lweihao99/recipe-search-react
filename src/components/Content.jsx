import React, { useEffect, useState } from "react";
import styles from "../styles/content.module.css";
import { Avatar, List, Pagination } from "antd";
import { state } from "./data/data";

function Content() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const data = state.search.results.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className={styles.content}>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={<a href={item.id}>{item.title}</a>}
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
