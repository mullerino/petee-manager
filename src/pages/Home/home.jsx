import { useQuery } from 'react-query';
import { fetchPetianos } from "../../fetchs";

import styles from './home.module.css';

import { Tag } from 'antd';

import Content from '../../components/content/content';
import { useModalContext } from '../../contexts/modalForm';
import Actions from '../../components/actions/actions';

const Home = () => {
  const { data: petianos, isLoading, isError } = useQuery('petianos', fetchPetianos, {
    staleTime: 60000
  })

  const { openModal } = useModalContext();

  // Alerta gambiarra, caso o botão de editar não seja o clicado, todos os campos são obrigatórios!!
  const requiredField = !openModal.editMode

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
        <Actions record={record}/>
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

  const fields = [
    {
      name: 'nome',
      label: 'Nome',
      required: requiredField,
      type: 'input',
      typeData: 'text'
    },
    {
      name: 'email',
      label: 'Email',
      required: requiredField,
      type: 'input',
      typeData: 'email'
    },
    {
      name: 'descricao',
      label: 'Descrição',
      required: requiredField,
      type: 'textarea',
      typeData: 'text'
    },
    {
      name: 'matricula',
      label: 'Matrícula',
      required: requiredField,
      type: 'input',
      typeData: 'string'
    },
    {
      name: 'telefone',
      label: 'Telefone',
      required: requiredField,
      type: 'input',
      typeData: 'string'
    },
    {
      name: 'semestreingresso',
      label: 'Semestre de Ingresso',
      required: requiredField,
      type: 'input',
      typeData: 'string'
    },
    {
      name: 'imagem',
      label: 'URL da foto do petiano',
      required: requiredField,
      type: 'input',
      typeData: 'url'
    },
    {
      name: 'linkedln',
      label: 'Linkedln',
      required: requiredField,
      type: 'input',
      typeData: 'string',
      placeholder: 'Ex: erikafernandes19'
    },
    {
      name: 'instagram',
      label: 'Instagram',
      required: requiredField,
      type: 'input',
      typeData: 'string',
      placeholder: 'Ex: eclsns'
    },
    {
      name: 'ativo',
      label: 'Petiano ativo?',
      required: requiredField,
      type: 'radio',
      typeData: 'any',
      options: [
        { value: true, label: 'Sim' },
        { value: false, label: 'Não' },
      ],
    },
  ];

  return (
    <div className={styles.container}>
      <Content
        data={data}
        columns={columns}
        isLoading={isLoading}
        tooltipAdding={'Adicionar novo petiano'}
        fields={fields}
      />
    </div>
  )
}

export default Home
