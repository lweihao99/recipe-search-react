import React, { useEffect, useState } from "react";
import styles from "../styles/content.module.css";
import icons from "../assets/icons.svg";
import Fracty from "fracty";

import {
  UserOutlined,
  BookOutlined,
  FieldTimeOutlined,
  UsergroupAddOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { Image, Button, Space } from "antd";

function Content({ data, updateServings }) {
  return (
    <div className={styles.content}>
      {/* figure */}
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

      {/* detail */}
      <div className={styles.recipe_detail}>
        <Space>
          <div className={styles.recipe_info}>
            <Space>
              <FieldTimeOutlined />
              <span className={styles.recipe_info_data}>
                {data.cookingTime}
              </span>
              <span>minutes</span>
            </Space>
          </div>

          <div className={styles.recipe_info}>
            <Space>
              <UsergroupAddOutlined />
              <span className={styles.recipe_info_data}>{data.servings}</span>
              <span>servings</span>
            </Space>
            <div className={styles.recipe_info_buttons}>
              <button
                className={styles.btn_tiny}
                onClick={(e) => {
                  e.preventDefault();
                  updateServings(data.servings + 1);
                }}
              >
                <PlusCircleOutlined />
              </button>
              <button className={styles.btn_tiny}>
                <MinusCircleOutlined />
              </button>
            </div>
          </div>
        </Space>

        <Button className={styles.recipe_user}>
          <UserOutlined style={{ fontSize: 30 }} />
        </Button>
        <Button className={styles.bookmarkBtn}>
          <BookOutlined style={{ fontSize: 30 }} />
        </Button>
      </div>

      {/* render ingredients */}
      <div className={styles.recipe_ingredients}>
        <h2 className={styles.heading}>Recipe ingredients</h2>
        <ul className={styles.recipe_ingredient_list}>
          {data.ingredients &&
            data.ingredients.map((item, index) => (
              <li className={styles.recipe_ingredient} key={index}>
                <svg className={styles.recipe__icon}>
                  <use href={`${icons}#icon-check`}></use>
                </svg>
                <div className={styles.recipe__quantity}>
                  {item.quantity ? Fracty(item.quantity) : ""}
                </div>
                <div className={styles.recipe__description}>
                  <span className="recipe__unit">{item.unit}</span>
                  {item.description}
                </div>
              </li>
            ))}
        </ul>
      </div>

      {/* footer */}
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
