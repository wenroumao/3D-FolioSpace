/**
 * 幻灯片ID常量定义
 * 用于标识不同的幻灯片页面
 */
export const SLIDE_IDS = {
  TITLE: 'title',        // 标题页
  HomeProfile: 'HomeProfile',    // HomeProfile项目页
  HOMEPAGE: 'homepage',  // 个人主页项目页
  GALLERY: 'gallery',    // 动画相册项目页
  TERMFOLIO: 'termfolio', // 终端作品集项目页
  THINKING: 'thinking',  // 思考的价值项目页
  SCRCPY: 'scrcpy',     // Scrcpy-GUI项目页
  ITALKING: 'italking',  // ITalking项目页
  PROJECTS: 'projects',  // FolioSpace项目页
  OVERVIEW: 'overview',  // 总览页
} as const;

/**
 * 幻灯片ID类型定义
 * 从SLIDE_IDS常量中提取所有可能的值作为类型
 */
export type SlideId = (typeof SLIDE_IDS)[keyof typeof SLIDE_IDS];

/**
 * 特殊幻灯片位置配置
 * 定义标题页和总览页的3D空间位置
 */
export const SLIDE_POSITIONS = {
  // 标题页位置（原点）
  TITLE: { x: 0, y: 0, z: 0 },
  // 总览页位置（缩放4.5倍以显示全局视图）
  OVERVIEW: { x: 0, y: 0, z: 0, scale: 4.5 },
} as const;
