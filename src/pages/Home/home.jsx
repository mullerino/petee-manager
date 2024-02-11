import { useQuery } from 'react-query';
import { fetchPetianos } from "../../fetchs";

import styles from './home.module.css';

import { Space, Table, Tag, Spin, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

const Home = () => {
  const { data: petianos, isLoading, isError } = useQuery('petianos', fetchPetianos, {
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
      title: 'Semestre de ingresso no PET',
      dataIndex: 'semestreIngresso',
      key: 'semestreIngresso',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Situação',
      key: 'tag',
      dataIndex: 'tag',
      render: (_, { tag }) => {
        const color = tag === true ? 'green' : 'red';

        const state = {
          green: 'Ativo',
          red: 'Desligado'
        }

        return (
          <>
            <Tag color={color} key={'a'}>
              {state[color]}
            </Tag>
          </>
        );
      }

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

  const data = petianos?.map((petiano) => {
    return (
      {
        key: petiano.id,
        nome: petiano.nome,
        semestreIngresso: petiano.semestreingresso,
        email: petiano.email,
        tag: petiano.ativo,
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

export default Home
