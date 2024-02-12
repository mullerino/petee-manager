import { Form, Input, Modal, Radio, Select } from 'antd';
import { useModalContext } from '../../contexts/modalForm';

const Forms = ({ onCreate, onCancel, fields, title }) => {
  const [form] = Form.useForm();
  const { openModal } = useModalContext();

  return (
    <Modal
      open={openModal.isOpen}
      title={title}
      okText="Confirmar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        {fields.map((field, index) => (
          <Form.Item
            key={index}
            name={field.name}
            label={field.label}
            rules={[
              {
                required: field.required,
                message: `Insira ${field.label}!`,
                type: field.typeData
              },
            ]}
          >
            {field.type === 'textarea' ? (
              <Input.TextArea />
            ) : field.type === 'radio' ? (
              <Radio.Group>
                {field.options.map(option => (
                  <Radio key={option.value} value={option.value}>
                    {option.label}
                  </Radio>
                ))}
              </Radio.Group>
            ) : field.type === 'select' ?
              <Select>
                {field.optionsSelect.map(option => (
                  <Select.Option key={option.value} value={option.value}>
                    {option.label}
                  </Select.Option>
                ))}
              </Select> : (
                <Input placeholder={field.placeholder} />
              )}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default Forms;
