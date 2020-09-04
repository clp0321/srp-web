import React, { useState, useRef } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import Protable from '@ant-design/pro-table';
import CreateForm from '@/components/CreateForm';

const UserManage = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [selectedRowkeys, setSelectedRows] = useState([]);
  const actionRef = useRef();
  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则名称为必填项',
          },
        ],
      },
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '身份id',
      dataIndex: 'certId',
    },
    {
      title: '地址名',
      dataIndex: 'addressName',
    },
    {
      title: '状态',
      dataIndex: 'status',
    },
    {
      title: '电话',
      dataIndex: 'phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '用户哈希',
      dataIndex: 'userHash',
    },
  ];
  return (
    <PageContainer>
      <Protable
        headerTitle="用户管理"
        options={false}
        actionRef={actionRef}
        columns={columns}
        search={false}
        rowKey="user-Manage"
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新增用户
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <CreateForm
        title="新增用户"
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <Protable
          type="form"
          columns={columns}
          rowKey="createForm"
        >
        </Protable>
      </CreateForm>
    </PageContainer>
  );
};

export default UserManage;
