import { useState, useEffect } from 'react';
import { DatePicker, Input, Select, Divider, Table, Typography, Badge } from 'antd';
import { queryLockRecord } from '@/services/lock';
import { SearchOutlined } from '@ant-design/icons';
import style from './style.less';

const { Option } = Select;

const Record = () => {
  const [page, setPage] = useState({
    pageSize: 10,
    pageNum: 1,
  });
  const [dataSource, setData] = useState([]);
  const columns = [
    {
      title: '设备号',
      dataIndex: 'deviceNum',
    },
    {
      title: '开锁类型',
      dataIndex: 'authType',
      render: (record) => {
        let text;
        switch (record.authType) {
          case 1:
            text = '永久密码';
            break;
          case 2:
            text = '指纹';
            break;
          case 3:
            text = '临时密码';
            break;
          case 4:
            text = '远程开锁';
            break;
          case 5:
            text = '蓝牙开锁';
            break;
          case 6:
            text = 'cookie开锁';
            break;
          case 7:
            text = '门卡';
            break;
          default:
            text = 8;
        }
        return text;
      },
    },
    {
      title: '用户标识',
      dataIndex: 'identification',
    },
    {
      title: '开锁状态',
      dataIndex: 'status',
      render: (record) => {
        const { status } = record;
        return (
          <>
            <Badge status={status === -1 ? 'error' : 'success'} />
            {status === -1 ? '失败' : '成功'}
          </>
        );
      },
    },
    {
      title: '记录时间',
      dataIndex: 'opTime',
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const { pageSize, pageNum } = page;
      const resp = await queryLockRecord({ pageNum, pageSize });
      if (resp.code === 0) {
        setData(resp.data.list);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className={[style.search_opt, 'clearfix'].join(' ')}>
        {/* <div className={style.search_opt_l}>
          <DatePicker style={{ width: 300 }} showTime onChange={() => {}} onOk={() => {}} />
          <Select style={{ width: 200, marginLeft: 10 }} defaultValue={1}>
            <Option value={1}>永久密码</Option>
            <Option value={2}>临时密码</Option>
            <Option value={3}>门限卡</Option>
            <Option value={4}>指纹</Option>
          </Select>
        </div> */}
        {/* <div className={style.search_opt_r}>
          <Input.Search
            style={{ width: 350, marginLeft: 10 }}
            prefix={<SearchOutlined />}
            enterButton="搜索"
            placeholder="请输入房间名"
          />
        </div> */}
      </div>
      <Table columns={columns} dataSource={dataSource} rowKey="opTime" />
    </>
  );
};
export default Record;
