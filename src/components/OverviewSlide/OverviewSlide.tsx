// 导入幻灯片ID和位置配置
import { SLIDE_IDS, SLIDE_POSITIONS } from '../../constants/slideIds';

/**
 * 总览幻灯片组件
 * 提供项目的全景视图，允许用户从高层次俯瞰所有项目
 * 这是一个空的幻灯片，主要用于impress.js的缩放效果展示所有项目
 */
const OverviewSlide = () => {
  return (
    <div
      id={SLIDE_IDS.OVERVIEW}                    // 总览幻灯片的唯一标识符
      className="step"                           // impress.js必需的CSS类
      data-x={SLIDE_POSITIONS.OVERVIEW.x}       // 3D空间X轴位置
      data-y={SLIDE_POSITIONS.OVERVIEW.y}       // 3D空间Y轴位置
      data-z={SLIDE_POSITIONS.OVERVIEW.z}       // 3D空间Z轴位置
      data-scale={SLIDE_POSITIONS.OVERVIEW.scale} // 缩放比例，用于显示全景视图
    ></div>
  );
};

export default OverviewSlide;
