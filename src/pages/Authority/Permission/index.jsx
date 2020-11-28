import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Divider, Button, Card } from 'antd';
import { getAllPermissions } from '@/services/request_permission';
import style from '../style.less';

export default class Permission extends React.PureComponent {
  columns = [
    {
      title: '权限编码',
      dataIndex: 'permissionCode',
      align: 'center',
    },
    {
      title: '权限描述',
      dataIndex: 'permissionName',
      align: 'center',
    },
    {
      title: '操作',
      align: 'center',
      render: () => {
        return (
          <>
            <a>删除</a>
            <Divider type="vertical" />
            <a>修改</a>
          </>
        );
      },
    },
  ];

  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      pageSize: 10,
      dataSource: [],
    };
  }

  componentDidMount() {
    this.getAllRequests();
  }

  getAllRequests = () => {
    const { pageNum, pageSize } = this.state;
    getAllPermissions({ pageNum, pageSize }).then((value) => {
      if (value.data) {
        this.setState({
          dataSource: value.data.list,
        });
      }
    });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <PageContainer>
        <Card className={style.authrity}>
          <Button type="primary" style={{ float: 'right' }}>
            新增权限
          </Button>
        </Card>
        <Table columns={this.columns} dataSource={dataSource} />
      </PageContainer>
    );
  }
}
