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
    document.title = "区块链共享租赁平台-房源中心";
  }

  handleRelease = () => {
    this.setState({
      visible: true,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <div className={style.contain}>
        {/* 内容索引 */}
        <Search />
        {/* 条件搜搜 */}
        <SearchMultiple />
        {/* 内容选择 */}
        <ConList />
        {/* 页面底部 */}
      </div>
    );
  }
}
export default Rent;
