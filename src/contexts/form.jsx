import { createContext, useContext } from 'react';
import { Form } from 'antd';

const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [form] = Form.useForm();

  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
