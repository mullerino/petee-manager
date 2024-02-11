import TableGeneric from '../table/table'
import styles from './content.module.css'

import { Tooltip, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import Forms from '../forms/forms';
import { useModalContext } from '../../contexts/modalForm';

const Content = ({ data, columns, isLoading, tooltipAdding, fields }) => {
  const { openModal, addNewRegister, closeModal } = useModalContext();

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    closeModal()
  };

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
        />
      </div>
      <div>
        <TableGeneric data={data} columns={columns} isLoading={isLoading} />
      </div>
    </div>
  )
}

export default Content
