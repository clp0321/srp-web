import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Divider } from 'antd';
import { getAllUser } from '@/services/login' 
import style from '../style.less';

export default class Manage extends React.PureComponent {
  columns = [
    {
      title: '真实姓名',
      dataIndex: '',
    },
    {
      title: '用户名',
      dataIndex: '',
    },
    {
      title: '用户角色',
      dataIndex: '',
    },
    {
      title: '身份证号',
      dataIndex: '',
    },
    {
      titlt: '操作',
      render: (_, record) => {
        return (
          <>
            <a>查询权限</a>
            <Divider type="vertical" />
            <a>删除权限</a>
          </>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    getAllUser().then(data => {
      console.log(data)
    })
  }

  render() {
    const { dataSource } = this.state;
    return (
      <PageContainer>
        <Card className={style.authrity}></Card>
        <Table columns={this.columns} dataSource={dataSource} />
      </PageContainer>
    );
  }
}
