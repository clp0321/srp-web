import { Component } from 'react';
import style from './style.less';

import { Search, SearchMultiple, ConList } from './component';

class Rent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentDidMount() {
    document.title = '区块链共享租赁平台-房源中心';
  }

  handleVisible = (visible) => {
    this.setState({
      visible,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div className={style.contain}>
        {/* 内容索引 */}
        <Search handle={this.handleVisible} />
        {/* 条件搜搜 */}
        <SearchMultiple handle={this.handleVisible} />
        {/* 内容选择 */}
        <ConList handle={this.handleVisible} visible={visible} />
        {/* 页面底部 */}
      </div>
    );
  }
}
export default Rent;
