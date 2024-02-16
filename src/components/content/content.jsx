import TableGeneric from '../table/table'
import styles from './content.module.css'
import { useMutation } from 'react-query'
import { Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Forms from '../forms/forms';
import { useModalContext } from '../../contexts/modalForm';
import { useEffect } from 'react';
import { useQueryClient } from '../../contexts/useQuery';
import { useNotification } from '../../contexts/notification';
import { useFormContext } from '../../contexts/form';


const Content = ({ data, columns, isLoading, tooltipAdding, fields, addRegister, editRegister, keyQuery }) => {
  const { openModal, addNewRegister, closeModal, idEditRegister } = useModalContext();
  const { queryClientInstance } = useQueryClient();
  const form = useFormContext();

  const { mutate, isSuccess, isError } = useMutation(addRegister, {
    onSuccess: () => {
      queryClientInstance.invalidateQueries(keyQuery);
      openNotification('Deu certo', `Informação submetida com sucesso!`, true);
    }
  });

  const { mutate: editOneRegister } = useMutation(editRegister, {
    onSuccess: ({ message }) => {
      queryClientInstance.invalidateQueries(keyQuery);
      openNotification('Deu certo', `${message}!`, true);
    }
  });

  const { openNotification } = useNotification();

  const onCreate = (dataFromForm) => {
    console.log('Received values of form: ', dataFromForm);

    if (!Array.isArray(dataFromForm.imgs)) {
      dataFromForm.imgs = dataFromForm.imgs.split(',');
    }

    if (openModal.editMode) {
      editOneRegister({ data: dataFromForm, id: idEditRegister });
      closeModal();
      return
    }

    mutate(dataFromForm);
    closeModal();
  };

  useEffect(() => {
    if (isError) {
      openNotification('Algo deu errado', 'As informações inseridas no formulário não foram submetidas.', isSuccess);
    }

  }, [isError])

  return (
    <div className={styles.container}>
      <div className={styles.actions}>
        <Tooltip placement='bottom' title={tooltipAdding}>
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size='large'
            onClick={() => {
              form.resetFields();
              addNewRegister();
            }}
          />
        </Tooltip>
        <Forms
          title={openModal.editMode === true ? 'Editar' : 'Cadastrar'}
          onCreate={onCreate}
          onCancel={() => {
            closeModal()
          }}
          fields={fields}
        />
      </div>
      <div>
        <TableGeneric data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Content
