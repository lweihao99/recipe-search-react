import React from "react";
import styles from "../styles/login.module.css";
import { Form, Button, Input } from "antd";

function Login() {
  const handleLogin = () => {
    console.log("login");
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}> Forkify </h2>
      <Form onFinish={handleLogin}>
        {/* account input */}
        <Form.Item
          label="账号"
          name="name"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Please enter username"></Input>
        </Form.Item>

        {/* password input */}
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Please enter password"></Input.Password>
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
