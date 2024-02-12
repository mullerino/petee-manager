import { useQuery } from 'react-query';
import { fetchProjects } from "../../fetchs";

import styles from './projects.module.css';

import Content from '../../components/content/content';
import { useModalContext } from '../../contexts/modalForm';
import Actions from '../../components/actions/actions';

const Projects = () => {
  const { data: projetos, isLoading, isError } = useQuery('projetos', fetchProjects, {
    staleTime: 60000
  })

  const { openModal, editRegister } = useModalContext();

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
        <Actions record={record} />
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

  const fields = [
    {
      name: 'nome',
      label: 'Nome',
      required: requiredField,
      type: 'input',
      typeData: 'text'
    },
    {
      name: 'descricao',
      label: 'Descrição',
      required: requiredField,
      type: 'textarea',
      typeData: 'text'
    },
    {
      name: 'resumo',
      label: 'Resumo',
      required: requiredField,
      type: 'textarea',
      typeData: 'text'
    },
    {
      name: 'area',
      label: 'Núcleo',
      required: requiredField,
      type: 'select',
      optionsSelect: [
        { value: '1', label: 'Núcleo 1' },
        { value: '2', label: 'Núcleo 2' },
      ],
      typeData: 'any'
    },
  ]

  return (
    <div>
      <Content
        data={data}
        columns={columns}
        isLoading={isLoading}
        tooltipAdding={'Adicionar novo projeto'}
        fields={fields}
      />
    </div>
  )
}

export default Projects
