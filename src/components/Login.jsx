// eslint-disable-next-line no-unused-vars
import React from "react";
import styles from "../styles/login.module.css";
import { Form, Button, Input } from "antd";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (values) => {
    if (values.name && values.password === "admin") {
      navigate("/home");
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
          <Input placeholder="Please enter username"></Input>
        </Form.Item>

        {/* password input */}
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "Enter admin" }]}
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
