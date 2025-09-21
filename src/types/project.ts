/**
 * 3D空间位置接口
 * 定义项目在3D空间中的位置和旋转角度
 */
interface Position {
  x: number;      // X轴坐标
  y: number;      // Y轴坐标
  z: number;      // Z轴坐标（深度）
  rotate?: number;  // 旋转角度（可选）
  rotateY?: number; // Y轴旋转角度（可选）
}

/**
 * 项目链接接口
 * 定义项目相关链接的信息
 */
export interface Link {
  type: string;     // 链接类型（如demo、code等）
  url: string;      // 链接地址
  text: string;     // 显示文本
  githubRepo?: string; // GitHub仓库信息，用于获取star数（可选）
}

/**
 * GitHub仓库信息接口
 * 存储从GitHub API获取的仓库统计信息
 */
export interface GitHubRepoInfo {
  stars: number;      // 星标数量
  forks: number;      // 分叉数量
  issues: number;     // 问题数量
  language: string;   // 主要编程语言
  license: string | null; // 许可证信息
  createdAt: string;  // 创建时间
  updatedAt: string;  // 最后更新时间
}

/**
 * 项目信息接口
 * 定义单个项目的完整信息结构
 */
export interface Project {
  id: string;         // 项目唯一标识符
  name: string;       // 项目名称
  title: string;      // 显示标题
  preview: string;    // 预览图片路径
  position: Position; // 3D空间位置
  description: string; // 项目描述
  tech: string[];     // 技术标签数组
  links: Link[];      // 相关链接数组
  layout: string;     // 布局类型
}
