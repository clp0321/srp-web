import { useState } from 'react';
import { DatePicker, Input, Select, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Protable from '@ant-design/pro-table';
import style from './style.less';

const { Option } = Select;

const Record = () => {
  const columns = [
    {
      title: '设备号',
      dataIndex: 'device_num',
    },
    {
      title: '开锁类型',
      dataIndex: 'auth_type',
    },
    {
      title: '标识',
      dataIndex: 'idendification',
    },
    {
      title: '开锁状态',
      dataIndex: 'status',
    },
    {
      title: '记录时间',
      dataIndex: 'op_time',
    },
  ];

  return (
    <>
      <div className={[style.search_opt, 'clearfix'].join(' ')}>
        <div className={style.search_opt_l}>
          <DatePicker style={{ width: 300 }} showTime onChange={() => {}} onOk={() => {}} />
          <Select style={{ width: 200, marginLeft: 10 }} defaultValue={1}>
            <Option value={1}>永久密码</Option>
            <Option value={2}>临时密码</Option>
            <Option value={3}>门限卡</Option>
            <Option value={4}>指纹</Option>
          </Select>
        </div>
        <div className={style.search_opt_r}>
          <Input.Search
            style={{ width: 350, marginLeft: 10 }}
            prefix={<SearchOutlined />}
            enterButton="搜索"
            placeholder="请输入房间名"
          />
        </div>
      </div>
      <Divider className={style.divider} />
      <Protable search={false} columns={columns} />
    </>
  );
};
export default Record;
