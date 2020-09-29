import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Select } from 'antd';
import { Authorize, BaseLock, Record } from './component';

const { TabPane } = Tabs;
const { Option } = Select;

class EquipmentManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: "1",
      authority: true,
      openRecord: true
    };
  }

  handleChange = (val) => {
    this.setState({
      currentKey: val,
    });
  };

  setAbled = () => {
    this.setState({
      authority: false,
      openRecord: false
    })
  }


  render() {
    const { currentKey, authority, openRecord } = this.state;

    const PropertySelect = () => (
      <Select style={{ width: 100 }} defaultValue={1}>
        <Option value={1}>房产1</Option>
        <Option value={2}>房产2</Option>
        <Option value={3}>房产3</Option>
      </Select>
    );

    return (
      <PageContainer>
        <Card>
          <Tabs
            defaultActiveKey={currentKey}
            onChange={this.handleChange}
            size="large"
            tabBarExtraContent={<PropertySelect />}
          >
            <TabPane tab="智能门锁" key="1" >
              <BaseLock setAbled={this.setAbled} />
            </TabPane>
            <TabPane tab="门锁授权" key="2" disabled={authority}>
              <Authorize />
            </TabPane>
            <TabPane tab="开锁记录" key="3" disabled={openRecord}>
              <Record />
            </TabPane>
          </Tabs>
        </Card>
      </PageContainer>
    );
  }
}

export default EquipmentManage;
