import { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.less';
import { LeftOutlined, RightOutlined, CloseOutlined } from '@ant-design/icons';
import imgUrl1 from '@/assets/house/house1.jpg';
import imgUrl2 from '@/assets/house/house2.jpg';
import imgUrl3 from '@/assets/house/house3.jpg';
import imgUrl4 from '@/assets/house/house4.jpg';
import imgUrl5 from '@/assets/house/house5.jpg';

const mockPic = [imgUrl1, imgUrl2, imgUrl3, imgUrl4, imgUrl5];
const first = mockPic[0];
const last = mockPic[mockPic.length - 1];
mockPic.unshift(last);
mockPic.push(first);

const PicList = ({ list }) => {
  return list.map((item, index) => {
    return <img src={item} key={`${item}${index}`} />;
  });
};

export default class Carousel extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    picList: PropTypes.array,
  };

  static defaultProps = {
    visible: false,
    picList: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      curIndex: 1,
      picList: [],
      picSize: 0,
    };
  }

  componentDidMount() {
    // @todo 获取图片集
    const { picList } = this.props;
    this.setState({
      picSize: picList.length,
      picList,
    });
  }

  // 前一个
  onPrev = () => {
    let newLeft = 1000;
    let { curIndex, picSize } = this.state;
    if (this.wrapper.style.left === '0px') {
      this.wrapper.style.transition = 'left 0s';
      this.wrapper.style.left = '-4000px';
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
    let { curIndex, picSize } = this.state;
    if (this.wrapper.style.left === '-6000px') {
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
    const first = picList[0];
    const last = picList[picList.length - 1];
    picList.unshift(last);
    picList.push(first);
    const picArray = <PicList list={picList} />;

    return (
      <div className={[style.mask, maskVisible ? style.mask_show : style.mask_hide].join(' ')}>
        <div className={style.contain}>
          <div
            className={style.wrapper}
            ref={(node) => (this.wrapper = node)}
            style={{ left: -1000 }}
          >
            <PicList />
          </div>
        </div>
        <div className={style.img_contain}>
          <p>
            第 {curIndex} 张 / 共 {picSize} 张
          </p>
        </div>
        <LeftOutlined className={[style.row, style.left].join(' ')} onClick={this.onPrev} />
        <RightOutlined className={[style.row, style.right].join(' ')} onClick={this.onNext} />
        <CloseOutlined className={style.close_label} onClick={() => this.props.handleMask(false)} />
      </div>
    );
  }
}
