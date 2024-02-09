import { useQuery } from 'react-query';
import { fetchProjects } from "../../fetchs";

import styles from './projects.module.css';

import { Space, Table, Tag, Spin, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const Projects = () => {
  const { data: projetos, isLoading, isError } = useQuery('projetos', fetchProjects, {
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
      title: 'Imagens',
      dataIndex: 'imgs',
      key: 'imgs',
      render: (_, {imgs}) => {
        return (
          <div>
            {imgs.map((img, index) => (
              <a key={index} href={img} target="_blank" rel="noopener noreferrer">
                Imagem {index + 1}<br></br>
              </a>
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

  const data = projetos?.map((projeto) => {
    return (
      {
        key: projeto.id,
        nome: projeto.nome,
        descricao: projeto.descricao,
        imgs: projeto.imgs
      }
    )
  })

  return (
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
  )
}

export default Projects
