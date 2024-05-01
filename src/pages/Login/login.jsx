import { Button, Form, Input, message } from 'antd';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '../../services/firebaseConfig'
import styles from './login.module.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../contexts/notification';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { openNotification } = useNotification();

  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  function handleSignIn(e) {
    e.preventDefault();
    signInWithEmailAndPassword(email, password)
  }

  useEffect(() => {
    if (user) {
      navigate('/petianos');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      openNotification('Algo deu errado', 'Email e/ou senha incorreto!!', false);
    }
  }, [error]);

  return (
    <div className={styles.container}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="username"
          rules={[
            {
              required: true,
              message: 'Insira o email!',
            },
          ]}
        >
          <Input onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[
            {
              required: true,
              message: 'Insira a senha!',
            },
          ]}
        >
          <Input.Password onChange={(e) => setPassword(e.target.value)}/>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSignIn}>
            Entrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}



export default Login
