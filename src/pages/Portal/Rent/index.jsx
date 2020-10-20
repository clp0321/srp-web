import { Component } from 'react';
import { getProperty, } from '@/services/property';
import style from './style.less';

import { Search, SearchMultiple, ConList } from './component';

class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      constList: [],
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
        constList: resp.data
      })
    }
  }

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

  render() {
    const { visible, constList } = this.state;
    return (
      <div className={style.contain}>
        {/* 内容索引 */}
        <Search handle={this.handleVisible} setConList={this.setConList} />
        {/* 条件搜搜 */}
        <SearchMultiple handle={this.handleVisible} setConList={this.setConList} />
        {/* 内容选择 */}
        <ConList handle={this.handleVisible} visible={visible} list={constList} />
        {/* 页面底部 */}
      </div>
    );
  }
}
export default Rent;
