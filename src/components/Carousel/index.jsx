import { Component } from 'react';
import style from './style.less';
import { getPicListById } from '@/services/property';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';

const PicList = ({ list }) => {
  return list.map((item, index) => {
    return <img src={item} key={`${item}${index}`} />;
  });
};

export default class Carousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      curIndex: 1,
      picList: [],
      picSize: 0,
      preLeft: '',
      nextLeft: '',
    };
  }

  componentDidMount() {
    this.getAllPicList();
  }

  // 获取图片集合
  getAllPicList = () => {
    const house_id = location.search.split('=')[1];
    // 获取图片集
    getPicListById(house_id)
      .then((value) => {
        if (value.msg === 'SUCCESS') {
          let list = value.data;
          const oldLen = list.length;
          const first = list[0];
          const last = list[list.length - 1];
          list.unshift(last);
          list.push(first); // 首尾添加对应房源
          const len = list.length;
          this.setState({
            picSize: oldLen,
            picList: list,
            preLeft: `-${(len - 3) * 1000}px`,
            nextLeft: `-${(len - 1) * 1000}px`,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  // 前一个
  onPrev = () => {
    let newLeft = 1000;
    let { curIndex, picSize, preLeft } = this.state;
    if (this.wrapper.style.left === '0px') {
      this.wrapper.style.transition = 'left 0s';
      this.wrapper.style.left = preLeft;
    } else {
      this.move(newLeft);
    }
    curIndex--;
    if (curIndex < 1) curIndex = picSize;
    this.setState({
      curIndex,
    });
  };

  // 下一个
  onNext = () => {
    let newLeft = -1000;
    let { curIndex, picSize, nextLeft } = this.state;
    if (this.wrapper.style.left === nextLeft) {
      this.wrapper.style.transition = 'left 0s';
      this.wrapper.style.left = '-2000px';
    } else {
      this.move(newLeft);
    }
    curIndex++;
    if (curIndex > picSize) curIndex = 1;
    this.setState({
      curIndex,
    });
  };

  // 移动图片
  move = (num) => {
    var term = parseInt(this.wrapper.style.left) + num;
    this.wrapper.style.transition = 'left 0.1s';
    this.wrapper.style.left = term + 'px';
  };

  render() {
    const { maskVisible } = this.props;
    const { picSize, curIndex, picList } = this.state;
    const picArray = <PicList list={picList} />;

    return (
      <div className={[style.mask, maskVisible ? style.mask_show : style.mask_hide].join(' ')}>
        <div className={style.contain}>
          <div
            className={style.wrapper}
            ref={(node) => (this.wrapper = node)}
            style={{ left: -1000, width: picList.length * 1000 }}
          >
            {picArray}
          </div>
        </div>
        <div className={style.img_contain}>
          <p>
            第 {curIndex} 张 / 共 {picSize} 张
          </p>
        </div>
        {picSize <= 1 ? null : (
          <>
            <LeftOutlined className={[style.row, style.left].join(' ')} onClick={this.onPrev} />
            <RightOutlined className={[style.row, style.right].join(' ')} onClick={this.onNext} />
          </>
        )}
        <CloseOutlined className={style.close_label} onClick={() => this.props.handleMask(false)} />
      </div>
    );
  }
}
