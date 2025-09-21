/**
 * 获取动态尺寸
 * 根据当前窗口大小计算适合的宽度和高度
 * @returns 包含宽度和高度的对象
 */
const getDynamicDimensions = () => {
  // 确保最小宽度为1024px
  const width = Math.max(1024, window.innerWidth);
  // 确保最小高度为768px
  const height = Math.max(768, window.innerHeight);
  return { width, height };
};

/**
 * Impress.js 3D演示配置
 * 控制3D转场动画的各种参数
 */
export const IMPRESS_CONFIG = {
  // 转场动画持续时间（毫秒）
  TRANSITION_DURATION: '1000',
  // 最大缩放比例
  MAX_SCALE: '3',
  // 最小缩放比例
  MIN_SCALE: '0',
  // 3D透视距离
  PERSPECTIVE: '1000',
  // 动态获取画布宽度
  get WIDTH() {
    return getDynamicDimensions().width.toString();
  },
  // 动态获取画布高度
  get HEIGHT() {
    return getDynamicDimensions().height.toString();
  },
} as const;
