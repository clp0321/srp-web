import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Tabs, Card, Select } from 'antd';
import { BaseInfo, MeterReading } from './component';

const { TabPane } = Tabs;
const { Option } = Select;

class WaterMeterManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentKey: 1,
    };
  }

  handleChange = (val) => {
    this.setState({
      currentKey: val,
    });
  };

  render() {
    const { currentKey } = this.state;

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
            defaultActiveKey="1"
            onChange={this.handleChange}
            size="large"
            tabBarExtraContent={<PropertySelect />}
          >
            <TabPane tab="智能水电表" key="1">
              <BaseInfo />
            </TabPane>
            <TabPane tab="水电抄表" key="2">
              <MeterReading />
            </TabPane>
          </Tabs>
        </Card>
      </PageContainer>
    );
  }
}

export default WaterMeterManage;
