import { useQuery } from 'react-query';
import { fetchAreas } from "../../fetchs";

import styles from './nucleos.module.css';

import { Space, Table, Spin, Tooltip, Button } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'

const Nucleos = () => {
  const { data: areas, isLoading, isError } = useQuery('areas', fetchAreas, {
    staleTime: 60000
  })

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      width: '40%'
    },
    {
      title: 'Projetos',
      dataIndex: 'projects',
      key: 'projects',
      render: (_, { projetos }) => {
        return (
          <div>
            {projetos.map((projeto, index) => (
              <span key={index}>
                {projeto}<br></br>
              </span>
            ))}
          </div>
        );
      },
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement='bottom' title="Editar">
            <a><EditOutlined /></a>
          </Tooltip>
          <Tooltip placement='bottom' title="Deletar">
            <a><DeleteOutlined /></a>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const data = areas?.map((area) => {
    return (
      {
        key: area.id,
        nome: area.nome,
        descricao: area.descricao,
        projetos: area.projetos.map(projeto => projeto.nome)
      }
    )
  })

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Tooltip  placement='bottom' title="Adicionar novo núcleo">
          <Button type="primary" shape="circle" icon={<PlusOutlined />} size='large'/>
        </Tooltip>
      </div>
      <div className={styles.table}>
        <Table
          columns={columns}
          dataSource={data}
          loading={{
            indicator: <Spin />,
            spinning: isLoading
          }}
          pagination={{
            defaultPageSize: 6,
            showSizeChanger: true,
            pageSizeOptions: ['6', '10', '15']
          }}
        />
      </div>
    </div>
  )
}

export default Nucleos
