import React, { useEffect, useState } from "react";
import styles from "../styles/content.module.css";

import { UserOutlined, BookOutlined } from "@ant-design/icons";

import { Image, Button, Space } from "antd";

function Content({ data }) {
  return (
    <div className={styles.content}>
      <div className={styles.imageContainer}>
        <Image
          style={{
            width: 400,
            height: 256,
          }}
          className={styles.figure}
          src={data.image}
        ></Image>
      </div>
      <div className={styles.recipe_detail}>
        <Space>
          <div className={styles.recipe_info}>
            <Space>
              <span>{data.cookingTime}</span>
              <span>minutes</span>
            </Space>
          </div>

          <div className={styles.recipe_info}>
            <Space>
              <span>{data.servings}</span>
              <span>servings</span>
            </Space>
          </div>
        </Space>

        <Button className={styles.recipe_user}>
          <UserOutlined style={{ fontSize: 30 }} />
        </Button>
        <Button className={styles.bookmarkBtn}>
          <BookOutlined style={{ fontSize: 30 }} />
        </Button>
      </div>

      <div className={styles.recipe_ingredients}>
        <h2 className={styles.heading}>Recipe ingredients</h2>
        <ul className={styles.recipe_ingredient_list}>
          <li className={styles.recipe_ingredient}>
            <svg className={styles.recipe__icon}>
              <use href="${icons}#icon-check"></use>
            </svg>
            <div className={styles.recipe__quantity}>200</div>
            <div className={styles.recipe__description}>
              <span className="recipe__unit">g</span>
              {" grain sea salt "}
            </div>
          </li>
        </ul>
      </div>

      <div className={styles.recipe__directions}>
        <h2 className={styles.heading}>How to cook it</h2>
        <p className={styles.recipe__directions_text}>
          This recipe was carefully designed and tested by
          <span className="recipe__publisher" style={{ fontWeight: 700 }}>
            {" "}
            {data.publisher}
          </span>
          . Please check out directions at their website.
        </p>
        <a
          style={{ width: 110, height: 45 }}
          className={styles.btn_small}
          href={data.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          <span>Directions</span>
          <svg className="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Content;
