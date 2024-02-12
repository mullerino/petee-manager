import TableGeneric from '../table/table'
import styles from './content.module.css'
import { useMutation } from 'react-query'
import { Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Forms from '../forms/forms';
import { useModalContext } from '../../contexts/modalForm';
import { registerNewPetiano } from '../../fetchs';
import { useEffect } from 'react';
import { useQueryClient } from '../../contexts/useQuery';
import { useNotification } from '../../contexts/notification';


const Content = ({ data, columns, isLoading, tooltipAdding, fields }) => {
  const { openModal, addNewRegister, closeModal } = useModalContext();
  const { queryClientInstance } = useQueryClient();
  const { mutate, isSuccess, isError} = useMutation(registerNewPetiano, {
    onSuccess: () => {
      queryClientInstance.invalidateQueries('petianos');
    }
  });
  const { openNotification } = useNotification();

  const onCreate = (dataFromForm) => {
    console.log('Received values of form: ', dataFromForm);
    mutate(dataFromForm);
    closeModal();
  };

  useEffect(() => {
    if (isSuccess || isError) {
      const notificationTitle = isSuccess ? 'Deu tudo certo' : 'Algo deu errado';
      const notificationMessage = isSuccess ? 'As informações inseridas no formulário foram submetidas.' : 'As informações inseridas no formulário não foram submetidas.';
      
      openNotification(notificationTitle, notificationMessage, isSuccess);
    }

  }, [isSuccess, isError])

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
              addNewRegister()
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
          errorSubmit={isError}
          sucessSubmit={isSuccess}
        />
      </div>
      <div>
        <TableGeneric data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Content
