import React, { useState, useRef } from 'react';
import { Button, Select, Divider, Popconfirm, message, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import Protable from '@ant-design/pro-table';
import CreateForm from '@/components/CreateForm';
import { getAllUser, userAdd, deleteUser, updateUser } from '@/services/login';
import style from './style.less';

const { Option } = Select;
const FormItem = Form.Item;

const Selects = ({ name, initialValue }) => (
  <FormItem name={name} initialValue={initialValue}>
    <Select placeholder="请选择用户角色">
      <Option value={0}>房东</Option>
      <Option value={1}>租客</Option>
      <Option value={2}>代理服务商</Option>
      <Option value={3}>监管用户</Option>
    </Select>
  </FormItem>
);

// const hide = (msg) => {
//   return message.loading(msg);
// };

// 新增用户
const handleAdd = async (field) => {
  const hide = message.loading('正在添加');
  try {
    const status = await userAdd({ ...field });
    hide();
    return status;
  } catch (err) {
    hide();
    message.error('添加失败请重试');
    return false;
  }
};

// 更新用户
const handleUpdate = async (field) => {
  const hide = message.loading('正在修改');
  const updates = await updateUser({ ...field });
  hide();
  if (updates.data > 0) {
    return true;
  } else {
    message.error('修改失败，请重试');
    return false;
  }
};

// 删除用户
const handleDelete = async (selectedRowsState, record) => {
  const hide = message.loading('正在删除');
  if (!record) return true;
  const resp = await deleteUser(record.id);
  hide();
  if (resp.data > 0) {
    return true;
  } else {
    message.error('删除失败，请重试');
    return false;
  }
};

const UserManage = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [selectedRowsState, setSelectedRows] = useState([]);
  const [updateVals, setUpdateValues] = useState({
    id: '',
    userName: '',
    addressName: '',
    role: '',
    certId: '',
    status: '',
    password: '',
    phone: '',
    address: '',
    userHash: '',
  });
  const actionRef = useRef();
  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      hideInTable: true,
      hideInForm: formTitle == '新增用户' ? true : false,
      formItemProps: {
        initialValue: updateVals.id,
        children: <Input disabled />
      },
    },
    {
      title: '用户姓名',
      dataIndex: 'addressName',
      formItemProps: {
        placeholder: '请输入用户真实姓名',
        rules: [
          {
            required: true,
            message: '用户姓名为必填项',
          },
        ],
        children: formTitle == '新增用户' ? null : <Input disabled />,
        initialValue: updateVals.addressName,
      },
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      formItemProps: {
        placeholder: '请输入用户名',
        rules: [
          {
            required: true,
            message: '用户名为必填项',
          },
        ],
        initialValue: updateVals.userName,
      },
    },
    {
      title: '密码',
      dataIndex: 'password',
      formItemProps: {
        placeholder: '请输入密码',
        rules: [
          {
            required: true,
            message: '用户密码为必填项',
          },
        ],
        initialValue: updateVals.password,
      },
      render: () => <span>****</span>,
    },
    {
      title: '用户角色',
      dataIndex: 'role',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '用户角色为必选项',
          },
        ],
        children: <Selects name="role" initialValue={updateVals.role} />,
      },
      render: (text, record) => {
        const { role } = record;
        let returnText;
        switch (role) {
          case 0:
            returnText = '房东';
            break;
          case 1:
            returnText = '租客';
            break;
          case 2:
            returnText = '代理服务商';
            break;
          case 3:
            returnText = '监管用户';
            break;
        }
        return returnText;
      },
    },
    {
      title: '身份证号',
      dataIndex: 'certId',
      formItemProps: {
        placeholder: '请输入身份证号',
        rules: [
          {
            required: true,
            message: '身份证号为必填项',
          },
          {
            pattern: /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/,
            message: '身份证信息不正确',
          },
        ],
        children: formTitle == '新增用户' ? null : <Input disabled />,
        initialValue: updateVals.certId,
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      formItemProps: {
        placeholder: '请输入电话',
        rules: [
          {
            required: true,
            message: '电话为必填项',
          },
          {
            pattern: /^1\d{10}$/,
            message: '手机号输入不正确',
          },
        ],
        initialValue: updateVals.phone,
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
      formItemProps: {
        placeholder: '请输入地址',
        rules: [
          {
            required: true,
            message: '地址为必填项',
          },
        ],
        initialValue: updateVals.address,
      },
    },
    {
      title: '用户哈希',
      dataIndex: 'userHash',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              record.password = '****';
              console.log(record)
              setUpdateValues(record);
              setFormTitle('更新用户');
              handleModalVisible(true);
            }}
          >
            更新
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除该用户？"
            onConfirm={async () => {
              const resp = await handleDelete(selectedRowsState, record);
              if (resp) {
                message.success('删除成功');
                actionRef.current?.reloadAndRest();
              }
            }}
            onCancel={() => {}}
            okText="确认"
            cancelText="取消"
          >
            <a href="#">删除</a>
          </Popconfirm>
        </>
      ),
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
        rowKey="id"
        request={(params, sorter, filter) => getAllUser({ ...params, sorter, filter })}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              setUpdateValues({});
              setFormTitle('新增用户');
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新增用户
          </Button>,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
            </div>
          }
        >
          <Button
            type="danger"
            onClick={async () => {
              await handleDelete(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        title={formTitle}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      >
        <Protable
          className={style.select}
          type="form"
          rowKey="id"
          columns={columns}
          onSubmit={async (value) => {
            let status;
            if (formTitle === '更新用户') {
              status = await handleUpdate(value);
            } else {
              status = await handleAdd(value);
            }
            if (status) {
              handleModalVisible(false);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
        />
      </CreateForm>
    </PageContainer>
  );
};

export default UserManage;
