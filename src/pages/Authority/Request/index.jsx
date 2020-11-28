import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card, Divider } from 'antd';
import { getAllPermissions } from '@/services/request_permission';


export default class Request extends React.PureComponent {
  columns = [
    {
      title: '路径url',
      dataIndex: 'url',
      align: 'center',
    },
    {
      title: '路径描述',
      dataIndex: 'url',
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

  render() {
    const { dataSource } = this.state;
    return (
      <PageContainer>
        <Table columns={this.columns} dataSource={dataSource} />
      </PageContainer>
    );
  }
}
