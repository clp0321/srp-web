import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card } from 'antd';
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
        <Card className={style.authrity}></Card>
        <Table columns={this.columns} dataSource={dataSource} />
      </PageContainer>
    );
  }
}
