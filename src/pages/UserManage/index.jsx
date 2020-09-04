import React, { useState, useRef } from 'react';
import { Button, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, PageLoading } from '@ant-design/pro-layout';
import Protable from '@ant-design/pro-table';
import CreateForm from '@/components/CreateForm';


const Selects = () => (
  <Select placeholder="请选择用户角色">
    <Option value={0}>房东</Option>
    <Option value={1}>租客</Option>
    <Option value={2}>代理服务商</Option>
    <Option value={3}>监管用户</Option>
  </Select>
);

const UserManage = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [selectedRowkeys, setSelectedRows] = useState([]);
  const actionRef = useRef();
  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      formItemProps: {
        placeholder: "请输入用户名",
        rules: [
          {
            required: true,
            message: '用户名为必填项',
          },
        ],
      },
    },
    {
      title: '用户姓名',
      dataIndex: 'addressName',
      formItemProps: {
        placeholder: "请输入用户真实姓名",
        rules: [
          {
            required: true,
            message: '用户姓名为必填项',
          },
        ],
      },
    },
    {
      title: '角色',
      dataIndex: 'role',
      formItemProps: {
     
        children: <Selects />,
      },
    },
    {
      title: '身份证号',
      dataIndex: 'certId',
      formItemProps: {
        placeholder: "请输入身份证号",
        rules: [
          {
            required: true,
            message: '身份证号为必填项',
          },
        ],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      formItemProps: {
        placeholder: "请输入电话",
        rules: [
          {
            required: true,
            message: '电话为必填项',
          },
        ],
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
      formItemProps: {
        placeholder: "请输入地址",
        rules: [
          {
            required: true,
            message: '地址为必填项',
          },
        ],
      },
    },
    {
      title: '用户哈希',
      dataIndex: 'userHash',
      hideInForm: true
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
        <Protable type="form" columns={columns} rowKey="createForm"></Protable>
      </CreateForm>
    </PageContainer>
  );
};

export default UserManage;
