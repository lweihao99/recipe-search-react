import React from "react";
import styles from "../styles/bookmark.module.css";
import { Avatar, List } from "antd";
import { Link } from "react-router-dom";

function BookmarkWindow({ data, onData }) {
  // const data = state.bookmarks;

  // todo 在通过书签页面跳转的食谱页面servings不会改变，或者改变之后会恢复原样。

  const handleItemClick = (id, isBookmarked) => {
    onData(id, isBookmarked);
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
              handleItemClick(item.id, true);
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
