import { Space, Tooltip, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { useModalContext } from '../../contexts/modalForm';

const Actions = ({ record }) => {
  const { editRegister } = useModalContext();

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
          >
            <DeleteOutlined />
          </Popconfirm>
        </a>
      </Tooltip>
    </Space>
  )
}

export default Actions;
