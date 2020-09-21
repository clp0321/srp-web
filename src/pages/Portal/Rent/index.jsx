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
        {/* 搜索结果 */}
        <div className={style.show_result}>
          已为您找到 <span>4286</span> 套深圳房租
        </div>
        {/* 内容选择 */}
        <ConList />
        {/* 页面底部 */}
      </div>
    );
  }
}
export default Rent;
