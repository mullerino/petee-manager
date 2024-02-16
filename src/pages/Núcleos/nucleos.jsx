import { useQuery } from 'react-query';
import { deleteNucleo, editNucleo, fetchAreas, registerNewNucleo } from "../../fetchs";

import styles from './nucleos.module.css';

import Content from '../../components/content/content';
import { useModalContext } from '../../contexts/modalForm';
import Actions from '../../components/actions/actions';

const Nucleos = () => {
  const keyQuery = 'areas'
  const { data: areas, isLoading } = useQuery(keyQuery, fetchAreas, {
    staleTime: 60000
  })

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
  ]


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
        <Actions record={record} deleteTypeRegister={deleteNucleo} fieldsForms={fields} data={areas} keyQuery={keyQuery} />
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
    <div>
      <Content
        data={data}
        columns={columns}
        isLoading={isLoading}
        tooltipAdding={'Adicionar novo núcleo'}
        fields={fields}
        addRegister={registerNewNucleo}
        editRegister={editNucleo}
        keyQuery={keyQuery}
      />
    </div>
  )
}

export default Nucleos
