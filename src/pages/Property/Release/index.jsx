import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Card, Button, Form } from 'antd';
import { BaseInfo, Configurate, Template } from './component';
import { addProperty } from '@/services/property';
import style from './style.less';
import { toJSONSchema } from 'mockjs';

const { Step } = Steps;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class Release extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      len: 3,
    };
  }

  // 下一步
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  // 上一步
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  handleForm = (name, { values, forms }) => {
    if (name === 'base') {
      this.next()
      console.log(forms.base)
    }
  };

  render() {
    const { current, len } = this.state;
    // 内容分块
    const steps = [
      {
        title: '房源基本信息',
        content: <BaseInfo />,
      },
      {
        title: '价格配置信息',
        content: <Configurate />,
      },
      {
        title: '信息完成',
        content: <Template />,
      },
    ];
    return (
      <PageContainer>
        <Card className={style.realse}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <Form.Provider {...formItemLayout} onFormFinish={this.handleForm}>
            <div className={style.content}>{steps[current].content}</div>
          </Form.Provider>
        </Card>
      </PageContainer>
    );
  }
}

export default Release;
