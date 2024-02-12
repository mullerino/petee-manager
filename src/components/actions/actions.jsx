import { Space, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useModalContext } from '../../contexts/modalForm';
import { useMutation } from 'react-query'
import { deletePetiano } from '../../fetchs';
import { useQueryClient } from '../../contexts/useQuery';
import { useNotification } from '../../contexts/notification';

const Actions = ({ record }) => {
  const { editRegister } = useModalContext();
  const { queryClientInstance } = useQueryClient();
  const { openNotification } = useNotification();
  const { mutate } = useMutation(deletePetiano, {
    onSuccess: (response) => {
      openNotification('Deu tudo certo', `${response.message}!`, true);
      queryClientInstance.invalidateQueries('petianos');
    }
  }
  );

  const onDeletePetiano = (id) => {
    mutate(id)
  };

  return (
    <Space size="middle">
      <Tooltip placement='bottom' title="Editar">
        <a><EditOutlined onClick={() => editRegister()} /></a>
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
              onDeletePetiano(record.key)
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
