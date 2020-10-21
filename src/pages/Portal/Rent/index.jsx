import { Component } from 'react';
import { getProperty } from '@/services/property';
import style from './style.less';

import { Search, SearchMultiple, ConList } from './component';

// 默认属性值
const defaultProps = {
  position: '',
  lowPrice: 0,
  highPrice: 1500,
  specify: '一',
  lowSize: 0,
  highSize: 50,
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
      selectOpt: {
        position: '',
        lowPrice: 0,
        highPrice: 1500,
        specify: '一',
        lowSize: 0,
        highSize: 50,
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
      selectOpt: defaultProps,
    });
  };

  // 更改选择项目
  handleSelect = (data) => {
    this.setState({
      selectOpt: data,
    });
  };

  render() {
    const { visible, constList, selectOpt } = this.state;
    return (
      <div className={style.contain}>
        {/* 内容索引 */}
        <Search
          handle={this.handleVisible}
          setConList={this.setConList}
          setRefresh={this.setRefresh}
        />
        {/* 条件搜搜 */}
        <SearchMultiple
          handle={this.handleVisible}
          setConList={this.setConList}
          selectOpt={selectOpt}
          setSelectedOpt={this.handleSelect}
        />
        {/* 内容选择 */}
        <ConList handle={this.handleVisible} visible={visible} list={constList} />
        {/* 页面底部 */}
      </div>
    );
  }
}
export default Rent;
