import { Spin, Table } from 'antd';

import styles from './table.module.css'

const TableGeneric = ({ columns, data, isLoading }) => {
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

export default TableGeneric;
