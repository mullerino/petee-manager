import { Space, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useModalContext } from '../../contexts/modalForm';
import { useMutation } from 'react-query'
import { useQueryClient } from '../../contexts/useQuery';
import { useNotification } from '../../contexts/notification';
import { useFormContext } from '../../contexts/form';

const Actions = ({ record, deleteTypeRegister, keyQuery, fieldsForms, data }) => {
  const { editRegister } = useModalContext();
  const { queryClientInstance } = useQueryClient();
  const { openNotification } = useNotification();
  const form = useFormContext();

  const { mutate } = useMutation(deleteTypeRegister, {
    onSuccess: (response) => {
      openNotification('Deu tudo certo', `${response.message}!`, true);
      queryClientInstance.invalidateQueries(keyQuery);
    }
  }
  );

  const setFieldsValuesFromRecord = (fields, selectedRegister) => {
    const values = {};
    fields.forEach(field => {
      if (selectedRegister.hasOwnProperty(field.name)) {
        values[field.name] = selectedRegister[field.name];
      }
    });
    return values;
  };

  const onEditRegister = () => {
    const selectedRecord = data.filter((row) => row.id === record.key)[0];
    const initialValuesRegister = setFieldsValuesFromRecord(fieldsForms, selectedRecord);

    form.setFieldsValue(initialValuesRegister);
    editRegister(selectedRecord.id);
  };

  const onDeleteRegister = (id) => {
    mutate(id)
  };

  return (
    <Space size="middle">
      <Tooltip placement='bottom' title="Editar">
        <a><EditOutlined onClick={() => onEditRegister()} /></a>
      </Tooltip>
      <Tooltip placement='bottom' title="Deletar">
        <a>
          <Popconfirm
            title={`Deletar ${record.nome}`}
            description="Tem certeza dessa ação?"
            okText="Sim, deletar"
            cancelText="Não, cancelar"
            icon={
              <QuestionCircleOutlined
                style={{
                  color: 'red',
                }}
              />
            }
            okButtonProps={{
              danger: true
            }}
            onConfirm={() => {
              onDeleteRegister(record.key)
            }}
          >
            <DeleteOutlined />
          </Popconfirm>
        </a>
      </Tooltip>
    </Space>
  )
}

export default Actions;
