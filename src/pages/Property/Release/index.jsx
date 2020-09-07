import React, { Component } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Steps, Card, Button } from 'antd';
import { BaseInfo, Configurate, Template } from './component';

import style from './style.less';

const { Step } = Steps;

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

class Release extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  // 上一步
  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  // 下一步
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;
    return (
      <PageContainer>
        <Card className={style.realse}>
          <Steps current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className={style.content}>{steps[current].content}</div>
          <div className={style.action}>
            {current > 0 && current < steps.length - 1 && (
              <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                上一步
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => this.next()}>
                下一步
              </Button>
            )}
          </div>
        </Card>
      </PageContainer>
    );
  }
}

export default Release;
