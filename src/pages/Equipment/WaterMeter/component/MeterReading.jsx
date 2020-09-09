import { useState } from 'react';
import { Radio, Input, Divider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import style from './style.less';

const { Button } = Radio;

const MeterReading = () => {
  const [type, setType] = useState('all');
  const columns = [
    {
      title: '设备名',
      dataIndex: 'device_num',
    },
    {
      title: '归档',
      dataIndex: '',
    },
    {
      title: '上次抄表',
      dataIndex: 'last_read',
    },
    {
      title: '本次抄表',
      dataIndex: 'this_read',
    },
    {
      title: '本月已超',
      dataIndex: 'overmonth',
    },
    {
      title: '用量',
      dataIndex: 'spend',
    },
    {
      title: '操作',
      dataIndex: 'option',
      render: (_, record) => {
        return <a>查看详情</a>;
      },
    },
  ];
  return (
    <>
      <div className={[style.search_opt, 'clearfix'].join(' ')}>
        <div className={style.search_opt_l}>
          <Radio.Group
            defaultValue="a"
            buttonStyle="solid"
            size="middle"
            style={{ marginRight: 10 }}
          >
            <Button value="a">电</Button>
            <Button value="b">冷水</Button>
            <Button value="c">热水</Button>
          </Radio.Group>
          <Radio.Group defaultValue="1" size="middle" buttonStyle="solid">
            <Button value="1">已签约</Button>
            <Button value="2">空置房</Button>
          </Radio.Group>
        </div>
        <div className={style.search_opt_r}>
          <Input.Search
            enterButton="搜索"
            style={{ width: 350, marginRight: 10 }}
            placeholder="搜索房间名、用户名"
            prefix={<SearchOutlined />}
          />
        </div>
      </div>
      <Divider className={style.divider} />
      <ProTable search={false} columns={columns} />
    </>
  );
};
export default MeterReading;
