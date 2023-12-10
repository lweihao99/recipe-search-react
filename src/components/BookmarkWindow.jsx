import React, { useState } from "react";
import { state, renderBookmark } from "./data/data";
import styles from "../styles/bookmark.module.css";
import { Avatar, List, Pagination } from "antd";
import { Link } from "react-router-dom";

function BookmarkWindow({ data, onData }) {
  // const data = state.bookmarks;

  const handleItemClick = (id) => {
    // todo 点击书签窗口的时候加载相应数据
    onData(id);
  };

  return (
    <div className={styles.content}>
      <List
        itemLayout="horizontal"
        dataSource={[data]}
        renderItem={(item, index) => (
          <List.Item
            className={styles.list}
            onClick={(e) => {
              e.preventDefault();
              handleItemClick(item.id);
            }}
          >
            <List.Item.Meta
              className={styles.listItemMeta}
              avatar={
                <Avatar style={{ width: 50, height: 50 }} src={item.image} />
              }
              title={
                <a href={<Link to={`/detail/${item.id}`}>{item.title}</Link>}>
                  {item.title}
                </a>
              }
              description={item.publisher}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default BookmarkWindow;
