import { Component } from 'react';
import { getProperty } from '@/services/property';
import style from './style.less';

import { Search, SearchMultiple, ConList } from './component';
import { Input } from 'antd';

// 默认属性值
const defaultProps = {
  position: '',
  lowPrice: '',
  highPrice: '',
  specify: '',
  lowSize: '',
  highSize: '',
  posIndex: 0,
  priceIndex: 0,
  specifyIndex: 0,
  sizeIndex: 0,
};

class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      constList: [],
      fresh: false,
      tab: 'default', // tab页
      selectOpt: {
        position: '',
        lowPrice: '',
        highPrice: '',
        specify: '',
        lowSize: '',
        highSize: '',
        posIndex: 0,
        priceIndex: 0,
        specifyIndex: 0,
        sizeIndex: 0,
      },
    };
  }

  componentDidMount() {
    document.title = '区块链共享租赁平台-房源中心';
    this.getAllProperty();
  }

  // 获取所有房源信息
  getAllProperty = async () => {
    const resp = await getProperty();
    if (resp.msg === 'SUCCESS') {
      this.setState({
        constList: resp.data,
      });
    }
  };

  // 切换tab页
  handleChangeTab = (val) => {
    this.setState({
      tab: val,
    });
  };

  // 显示loading状态
  handleVisible = (visible) => {
    this.setState({
      visible,
    });
  };

  // 设置房源列表值
  setConList = (value) => {
    this.setState({
      constList: value,
    });
  };

  // 设置重新刷新
  setRefresh = () => {
    this.setState({
      selectOpt: Object.assign({}, defaultProps),
    });
  };

  // 更改选择项目
  handleSelect = (data) => {
    this.setState({
      selectOpt: data,
    });
  };

  render() {
    const { visible, constList, selectOpt, tab } = this.state;
    return (
      <div className={style.contain}>
        {/* 内容索引 */}
        <Search
          handle={this.handleVisible}
          setConList={this.setConList}
          setRefresh={this.setRefresh}
          curTab={tab}
        />
        {/* 条件搜搜 */}
        <SearchMultiple
          handle={this.handleVisible}
          setConList={this.setConList}
          selectOpt={selectOpt}
          setSelectedOpt={this.handleSelect}
          curTab={tab}
        />
        {/* 内容选择 */}
        <ConList
          handle={this.handleVisible}
          setConList={this.setConList}
          selectOpt={selectOpt}
          visible={visible}
          list={constList}
          changeTab={this.handleChangeTab}
          curTab={tab}
        />
        {/* 页面底部 */}
      </div>
    );
  }
}
export default Rent;
