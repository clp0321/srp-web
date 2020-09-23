import { Row, Col, message, Card, Alert, Timeline, Affix, Form } from 'antd';
import { BaseInfo, RentInfo, Detail, HousePic, ContactInfo, ButtonList } from './component';
import { addProperty, addEstate } from '@/services/property';
import { SoundOutlined } from '@ant-design/icons';
import style from './style.less';

// 随机产生一个mockHash
const randomHash = () => {
  const word = '0123456789abcdefghijklmnopqrstuvwxyz';
  let output = '';
  for (let i = 0; i < 5; i++) {
    output += word[Math.floor(Math.random() * word.length)];
  }
  return output;
};

const warningMessage =
  '为共建真实可信的生活服务平台，所有新发布的信息需要进行认证才能展现，认证方式包括：支付认证或芝麻信用认证请如实填写信息，如有虚假会有账号封禁及扣除保证金等处罚';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};

class Release extends React.Component {
  formRef = React.createRef();
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    method: 0,
    payway: 0,
    struct: 0,
    formVal: {
      currentUser: '',
      role: '',
    },
  };

  componentDidMount() {
    document.title = '区块链共享租赁平台-房源发布';
  }

  checkAllChange = (checked) => {
    const checkList = checked ? configuration : [];
    this.setState({
      checkAll: checked,
      checkedList: checkList,
      indeterminate: false,
    });
  };

  handleCheckList = (list) => {
    const indeterBool = !!list.length && list.length < configuration.length;
    this.setState({
      checkAll: list.length === configuration.length,
      checkedList: list,
      indeterminate: indeterBool,
    });
  };

  handlePublish = () => {
    this.formRef.current.validateFields().then(async (values) => {
      const houseId = randomHash();
      const { method, price, phone, payway, publisher, deviceId, size, position } = values; // 房源 + 房产
      Promise.all([
        addProperty({
          method,
          price,
          houseId,
          phone,
          payway,
          publisher,
        }),
        addEstate({
          houseId,
          size,
          position,
          specify: 0,
          deviceId,
          houseOwner: publisher,
          certNum: 1,
        }),
      ])
        .then((value) => {
          const [a, b] = value;
          if (a.msg === 'SUCCESS' && b.msg === 'SUCCESS') {
            message.success('房源发布成功');
            this.formRef.current.resetFields();
          } else {
            message.error('房源发布失败');
          }
        })
        .catch((err) => console.log('error', err));
    });
  };

  handleReset = () => {
    this.formRef.current.resetFields();
  };

  render() {
    const { indeterminate, checkAll, checkedList } = this.state;
    const userName = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    return (
      <div className={style.contain}>
        <Alert
          className={style.alert}
          message={warningMessage}
          type="warning"
          closable
          showIcon
          icon={<SoundOutlined />}
        />
        <Row gutter={24}>
          <Col span={20}>
            <Form
              {...formItemLayout}
              ref={this.formRef}
              initialValues={{
                publisher: userName,
                role: role === '0' ? '租客' : role === '1' ? '房东' : null,
              }}
            >
              {/* 基础信息 */}
              <BaseInfo />
              {/* 租金信息 */}
              <RentInfo />
              {/* 详细介绍 */}
              <Detail
                indeterminate={indeterminate}
                checkAll={checkAll}
                onCheckAllChange={this.checkAllChange}
                checkedList={checkedList}
                changeCheckList={this.handleCheckList}
              />
              {/* 房源图片 */}
              <HousePic form={this.formRef} />
              {/* 联系信息 */}
              <ContactInfo />
              {/* 按钮集 */}
              <ButtonList handleSubmit={this.handlePublish} resetData={this.handleReset} />
            </Form>
          </Col>
          <Col span={4}>
            <Affix offsetTop={0}>
              <Card>
                <Timeline>
                  <Timeline.Item>基础信息</Timeline.Item>
                  <Timeline.Item>租金信息</Timeline.Item>
                  <Timeline.Item>详细介绍</Timeline.Item>
                  <Timeline.Item>房源图片</Timeline.Item>
                  <Timeline.Item>联系信息</Timeline.Item>
                </Timeline>
              </Card>
            </Affix>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Release;
