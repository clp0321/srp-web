import {
  Row,
  Col,
  message,
  Card,
  Alert,
  Timeline,
  Affix,
  Form,
  Input,
  Button,
  Divider,
  Typography,
  Modal,
} from 'antd';
import { BaseInfo, RentInfo, Detail, HousePic, ContactInfo, ButtonList } from './component';
import { getHouseId, addProperty } from '@/services/property';
import lock1 from '@/assets/lock/lock1.png';
import lock2 from '@/assets/lock/lock2.png';
import lock3 from '@/assets/lock/lock3.png';
import lock4 from '@/assets/lock/lock4.png';
import smartLock from '@/assets/house/smartLock.png';
import tianwang from '@/assets/lock/tianwang.png';
import { SoundOutlined } from '@ant-design/icons';
import style from './style.less';

const { Paragraph, Title, Text } = Typography;

// Mock房屋配置信息
const configuration = [
  '冰箱',
  '电视',
  '洗衣机',
  '热水器',
  '空调',
  '宽带',
  '沙发',
  '床',
  '暖气',
  '衣柜',
  '可做饭',
  '卫生间',
  '阳台',
  '智能门锁',
  '油烟机',
  '煤气灶',
];

// 房屋配置请求参数
const configObj = {
  空调: 'airCond',
  阳台: 'balcony',
  床: 'bed',
  宽带: 'broadband',
  可做饭: 'cooking',
  冰箱: 'fridge',
  煤气灶: 'gasStove',
  热水器: 'heater',
  暖气: 'heating',
  智能门锁: 'intelLock',
  油烟机: 'lampblackMachine',
  沙发: 'sofa',
  卫生间: 'toilet',
  电视: 'tv',
  衣柜: 'wardrobe',
  洗衣机: 'washM',
};

// 价格包括请求参数
const priceObj = {
  电费: 'electric',
  燃气费: 'gas',
  贷款费: 'loan',
  停车费: 'parking',
  物业费: 'property',
  水费: 'water',
};

const warningMessage =
  '为共建真实可信的生活服务平台，所有新发布的信息需要进行认证才能展现，请如实填写信息，如有虚假会有账号封禁及扣除用户积分等处罚';

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
  myGeo = null;
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      method: 0,
      payway: 0,
      struct: 0,
      fileList: [],
      formVal: {
        currentUser: '',
        role: '',
      },
      visible: true,
      returnId: '',
    };
  }

  componentDidMount() {
    document.title = '区块链共享租赁平台-房源发布';
    this.initMap();
  }

  initMap = () => {
    if (BMapGL) {
      this.myGeo = new BMapGL.Geocoder({ extensions_town: true });
    }
  };

  componentWillMount() {
    this.map = null;
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

  // 处理图片
  handleFileList = (info) => {
    this.setState({
      fileList: info.fileList.filter((file) => !!file.status),
    });
  };

  handlePublish = async () => {
    const { fileList, returnId, deviceId } = this.state;
    this.formRef.current.validateFields().then(async (values) => {
      if (fileList.length === 0) {
        message.warning('请至少上传一张房源图片');
        return;
      }
      if (fileList.length > 12) {
        message.warning('最大上传12张房源图片');
        return;
      }
      const returnData = await this.getLngAndLat();
      if (!returnData) {
        message.warning('错误地址，无法正常解析经纬度');
        return;
      }
      const { lng, lat } = returnData;
      const {
        location,
        method,
        price,
        phone,
        payway,
        publisher,
        size,
        position,
        room,
        hall,
        guard,
        seeTime, // 看房时间
        configlist, // 房屋配置
        earlyTime, // 最早入住时间
        numbers, // 宜住几人
        pricelist, // 租金包括
        description,
      } = values; // 房源 + 房产
      const houseConfiglist = [];
      const priceContentlist = [];
      let house_obj = {},
        price_obj = {};
      const configArr = configlist || [];
      const priceArr = pricelist || [];
      configArr.map((item) => {
        if (configObj[item]) house_obj[configObj[item]] = item;
      });
      priceArr.map((item) => {
        if (priceObj[item]) price_obj[priceObj[item]] = item;
      });
      houseConfiglist.push(house_obj);
      priceContentlist.push(price_obj);
      const resp = await addProperty({
        houseLng: lng, // 经度
        houseLat: lat, // 纬度
        province: location[0],
        city: location[1],
        country: location[2],
        method,
        price,
        phone,
        payway,
        publisher,
        size,
        position,
        specify: `${room}室${hall}厅${guard}卫`,
        deviceId,
        houseOwner: publisher,
        certNum: 1,
        description,
        userId: localStorage.getItem('id'),
        seeTime,
        earlyTime,
        numbers,
        houseConfiglist,
        priceContentlist,
        houseId: returnId,
      });
      if (resp.msg === 'SUCCESS') {
        message.success('房源发布成功');
        this.formRef.current.resetFields();
        this.setState({
          fileList: [],
        });
      } else {
        message.error('房源发布失败');
      }
    });
  };

  // 获取经纬度值
  getLngAndLat = () => {
    let lng, lat;
    const curForm = this.formRef.current;
    if (this.myGeo) {
      const location = curForm.getFieldValue('location');
      const position = curForm.getFieldValue('position') || '';
      const keyword = location.map((pre, cur) => pre + cur, '') + position;
      return new Promise((resolve, reject) => {
        this.myGeo.getPoint(
          keyword,
          (point) => {
            if (point) {
              lng = point.lng; // 经度
              lat = point.lat; // 纬度
              resolve({
                lng,
                lat,
              });
            } else {
              reject('未获取经纬度');
              message.error('未找到合适得经纬度');
            }
          },
          '深圳市',
        );
      }).catch((err) => console.log(err));
    }
  };

  handleReset = () => {
    this.formRef.current.resetFields();
  };

  handleInputChange = (e) => {
    this.setState({
      deviceId: e.target.value,
    });
  };

  // 认证房源
  handleAuthorize = () => {
    const userId = localStorage.getItem('id');
    const { deviceId } = this.state;
    if (!deviceId) {
      message.warning('请补充设备信息');
      return;
    }
    getHouseId(userId)
      .then((values) => {
        if (values && values.data) {
          this.setState({
            returnId: values.data,
            visible: false,
            deviceId,
          });
        }
        Modal.success({
          title: '设备已认证通过,请补充相关房源内容!',
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { indeterminate, checkAll, checkedList, fileList, visible, returnId } = this.state;
    const userName = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    return (
      <div className={style.contain}>
        {visible ? (
          <div className={style.inner_block}>
            <div className={style.lock}>
              <Title level={2}>门锁设备认证</Title>
              <img src={smartLock} />
              <Input
                style={{ width: 300 }}
                placeholder="请输入待认证的设备编号"
                onChange={this.handleInputChange}
              />
              <Button
                type="primary"
                style={{ marginLeft: 10, width: 150 }}
                onClick={this.handleAuthorize}
              >
                认证
              </Button>
            </div>
            <Divider />
            <Paragraph className={style.desc}>说明</Paragraph>
            <Paragraph className={style.p}>房源发布前，需认证门锁设备</Paragraph>
            <Paragraph className={style.p}>
              门锁设备编号由运营商提供，将作为房源绑定的可靠凭证
            </Paragraph>
            <div className={style.product}>
              <Title level={4}>相关产品</Title>
              <ul>
                <li key="house1">
                  <img src={lock1} width={250} />
                  <p>公寓/公租房NB-IoT智能锁</p>
                </li>
                <li key="house2">
                  <img src={lock2} width={250} />
                  <p>高校会议室/宿舍NB-IoT联网锁</p>
                </li>
                <li key="house3">
                  <img src={lock3} width={250} />
                  <p>医院陪护床NB-IoT智能锁</p>
                </li>
                <li key="house4">
                  <img src={lock4} width={250} />
                  <p>工业光交箱NB-IoT智能锁</p>
                </li>
              </ul>
            </div>
            <div className={style.tianwang_base}>
              <Divider />
              <Text strong>生态技术支持</Text>
              <Divider />
              <img src={tianwang} />
            </div>
          </div>
        ) : (
          <>
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
                    form={this.formRef}
                    indeterminate={indeterminate}
                    checkAll={checkAll}
                    onCheckAllChange={(checked) => this.checkAllChange(checked)}
                    checkedList={checkedList}
                    changeCheckList={(list) => this.handleCheckList(list)}
                  />
                  {/* 房源图片 */}
                  <HousePic
                    house_id={returnId}
                    fileList={fileList}
                    handleFile={(info) => this.handleFileList(info)}
                  />
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
          </>
        )}
      </div>
    );
  }
}

export default Release;
