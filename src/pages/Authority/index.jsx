import react from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Table, Card } from 'antd';
import style from './style.less';

export default class Authority extends React.PureComponent {
  render() {
    return (
      <PageContainer>
        <Card className={style.authrity}></Card>
        <Table />
      </PageContainer>
    );
  }
}
