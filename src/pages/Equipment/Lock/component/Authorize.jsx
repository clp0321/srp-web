import { useState } from 'react';
import { Radio, Input, Button, Typography, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import style from './style.less';

const { Group } = Radio;
const { Text } = Typography;

const Authorize = () => {
  const [type, setType] = useState('all');
  const columns = [
    {
      title: '设备名',
      dataIndex: 'device_num',
    },
    {
      title: '门锁状态',
      dataIndex: 'lock_status',
    },
    {
      title: '信号强度',
      dataIndex: 'signal_strength',
    },
    {
      title: '链接状态',
      dataIndex: 'connect_status',
    },
    {
      title: '电池容量',
      dataIndex: 'battery',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
  ];
  return (
    <>
      <div className={[style.search_opt, 'clearfix'].join(' ')}>
        <div className={style.search_opt_l}>
          <Text strong>授权类型：</Text>
          <Group value={type} onChange={(e) => setType(e.target.value)}>
            <Radio value="all">全部</Radio>
            <Radio value="passwd">密码</Radio>
            <Radio value="fingerprint">指纹</Radio>
            <Radio value="card">门限卡</Radio>
          </Group>
        </div>
        <div className={style.search_opt_r}>
          <Input.Search
            enterButton="搜索"
            style={{ width: 350, marginRight: 10 }}
            placeholder="搜索房间名、锁用户"
            prefix={<SearchOutlined />}
          />
          <Button type="primary" style={{ marginRight: 10 }}>
            新增授权
          </Button>
          <Button type="danger">新增授权</Button>
        </div>
      </div>
      <Divider className={style.divider} />
      <ProTable search={false} columns={columns} />
    </>
  );
};
export default Authorize;
