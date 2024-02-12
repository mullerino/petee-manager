import { createContext, useContext } from 'react';
import { notification } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (message, description, isSuccess) => {
    const iconStyle = {
      color: isSuccess ? '#52c41a' : '#f5222d',
    };

    const icon = isSuccess ? <SmileOutlined style={iconStyle} /> : <FrownOutlined style={iconStyle} />;

    api.open({
      message: message,
      description: description,
      icon: icon
    });
  };

  return (
    <NotificationContext.Provider value={{ openNotification }}>
      {children}
      {contextHolder}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
