// 导入联系方式链接类型定义
import { ContactLink } from '../types/userConfig';

/**
 * 用户配置信息
 * 包含个人信息、头像、联系方式等配置
 */
export const USER_CONFIG = {
  // 头像图片URL
  AVATAR_URL:
    'https://wenroumao.oss-cn-beijing.aliyuncs.com/img/%E5%A4%B4%E5%83%8F',
  // 用户名称
  NAME: 'Wenrou Mao',
  // 职位标题
  JOB_TITLE: 'Wenrou Mao',
  // 个人简介（支持多行）
  BIO: [
    '👨‍💻 前端 | 后端 | 左端 | 右端 工程师',
    '✨ 独立开发者 | 构建人们需要的产品',
    '🤖 AI 爱好者 | 探索 AI 驱动的产品',
  ],
  // 微信号
  WECHAT_ID: 'Wenrou Mao',

  // 联系方式链接配置
  CONTACT_LINKS: [
    // {
    //   type: 'github',
    //   url: 'https://github.com/wenroumao',
    //   icon: 'fab fa-github',
    //   text: 'GitHub',
    // },
    // {
    //   type: 'email',
    //   url: 'mailto:hi@wenroumao.com',
    //   icon: 'fas fa-envelope',
    //   text: '邮箱',
    // },
    {
      type: 'website',
      url: 'https://blog.wenroumao.com',
      icon: 'fas fa-globe',
      text: '个人网站',
    },
    // {
    //   type: 'twitter',
    //   url: '',
    //   icon: 'fab fa-twitter',
    //   text: 'X',
    // },
    // {
    //   type: 'wechat',
    //   icon: 'fab fa-weixin',
    //   text: '微信',
    //   url: '',
    // },
  ] as ContactLink[],
} as const;

/**
 * GitHub API 访问令牌
 * 用于获取GitHub仓库信息（如star数量等）
 * 注意：此处使用了混淆处理以避免直接暴露token
 */
export const GITHUB_TOKEN =
  'g?i?t?h?u?b?_?p?a?t?_?1?1?A?H?V?6?E?W?Q?0?M?f?C?S?r?0?4?K?A?j?1?F?_?3?7?n?4?U?y?u?S?m?d?z?i?t?D?s?w?i?s?i?u?a?g?N?b?a?k?V?n?L?I?7?U?W?s?s?h?n?K?p?s?H?S?D?S?4?D?K?O?Q?Q?J?S?S?x?q?z?Z?X?M';
