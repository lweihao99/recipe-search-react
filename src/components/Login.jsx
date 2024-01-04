// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userLogin = (user, pass) => {
    return axios({
      method: "post",
      url: "http://127.0.0.1:3001/api/recipe/login",
      data: {
        username: user,
        password: pass,
      },
    });
  };

  const handleLogin = async () => {
    try {
      const response = await userLogin(username, password);
      console.log(response);
      if (!response.data.status === "success") throw new Error("Login Failed");

      navigate("/home");
    } catch (error) {
      console.error("Login Failed", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Forkify </h2>
      <Form onFinish={handleLogin}>
        {/* account input */}
        <Form.Item
          label="账号"
          name="name"
          rules={[{ required: true, message: "Enter admin" }]}
        >
          <Input
            placeholder="Enter admin"
            onChange={(e) => setUsername(e.target.value)}
          ></Input>
        </Form.Item>

        {/* password input */}
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            placeholder="Please enter password"
            onChange={(e) => setPassword(e.target.value)}
          ></Input.Password>
        </Form.Item>

        {/* login button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className={styles.btn}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
