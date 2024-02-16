import { useQuery } from 'react-query';
import { deleteProject, editProject, fetchAreas, fetchProjects, registerProject } from "../../fetchs";

import styles from './projects.module.css';

import Content from '../../components/content/content';
import { useModalContext } from '../../contexts/modalForm';
import Actions from '../../components/actions/actions';

const Projects = () => {
  const keyQuery = 'projetos';
  const { data: projetos, isLoading } = useQuery(keyQuery, fetchProjects, {
    staleTime: 60000
  })
  const { data: nucleos } = useQuery('nucleos', fetchAreas);

  const dataToSelectNucleos = nucleos?.map(nucleo => {
    return {
      value: nucleo.id,
      label: nucleo.nome
    }
  });

  const { openModal } = useModalContext();

  // Alerta gambiarra, caso o botão de editar não seja o clicado, todos os campos são obrigatórios!!
  const requiredField = !openModal.editMode;

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
      name: 'imgs',
      label: 'Imagens do projeto',
      required: requiredField,
      type: 'textarea',
      placeholder: 'Ex: www.image.com,www.image1.com,www.image2.com',
      typeData: 'text'
    },
    {
      name: 'areaId',
      label: 'Núcleo',
      required: requiredField,
      type: 'select',
      optionsSelect: dataToSelectNucleos,
      typeData: 'any'
    },
  ];

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
      render: (_, { imgs }) => {
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
        <Actions record={record} deleteTypeRegister={deleteProject} keyQuery={keyQuery} data={projetos} fieldsForms={fields} />
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
    <div>
      <Content
        data={data}
        columns={columns}
        isLoading={isLoading}
        tooltipAdding={'Adicionar novo projeto'}
        fields={fields}
        addRegister={registerProject}
        editRegister={editProject}
        keyQuery={keyQuery}
      />
    </div>
  )
}

export default Projects
