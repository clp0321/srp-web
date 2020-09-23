import { Table, Card, Input, Radio } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';

const mockData = [];

const Reservation = () => {
  const columns = [
    {
      title: '申请人姓名',
      dataIndex: 'user_name',
    },
    {
      title: '房东姓名',
      dataIndex: 'houser_name',
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
    },
    {
      title: '智能门锁标识',
      dataIndex: 'device_num',
    },
    {
      title: '申请状态',
      dataIndex: 'apply_status',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '密码有效期',
      dataIndex: 'password_time',
    },
  ];
  return (
    <PageContainer>
      <Card style={{ marginBottom: 24 }}>
        <Radio.Group defaultValue="4" optionType="button" buttonStyle="solid">
          <Radio.Button value="4">全部</Radio.Button>
          <Radio.Button value="1">已处理</Radio.Button>
          <Radio.Button value="2">同意</Radio.Button>
          <Radio.Button value="3">拒绝</Radio.Button>
        </Radio.Group>
        <Input.Search enterButton="查询" placeholder="请输入查询用户姓名" style={{ width: 300, marginLeft: 10 }} />
      </Card>
      <Table columns={columns} dataSource={mockData} pagination={false} />
    </PageContainer>
  );
};

export default Reservation;
