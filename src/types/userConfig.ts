/**
 * 联系方式链接接口
 * 定义用户联系方式的数据结构
 */
export interface ContactLink {
  type: string;   // 联系方式类型（如github、email、website等）
  icon: string;   // 图标类名（Font Awesome图标）
  text: string;   // 显示文本
  url?: string;   // 链接地址（可选，某些类型可能不需要URL）
}
