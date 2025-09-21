# FolioSpace 开发指南

## 📋 目录

- [项目概述](#项目概述)
- [技术栈](#技术栈)
- [项目结构](#项目结构)
- [开发环境设置](#开发环境设置)
- [核心组件详解](#核心组件详解)
- [配置文件说明](#配置文件说明)
- [开发最佳实践](#开发最佳实践)
- [性能优化](#性能优化)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

## 项目概述

FolioSpace 是一个基于 React 和 impress.js 的 3D 项目展示平台，提供沉浸式的作品集浏览体验。项目采用现代化的前端技术栈，支持响应式设计和多种交互方式。

### 核心特性

- **3D 演示效果**: 基于 impress.js 的流畅 3D 转场动画
- **智能导航**: 创新的 MiniMap 导航系统
- **响应式设计**: 完美适配各种设备
- **GitHub 集成**: 实时获取项目统计信息
- **模块化架构**: 组件化开发，易于维护和扩展

## 技术栈

### 前端框架
- **React 18**: 用户界面构建
- **TypeScript**: 类型安全的 JavaScript
- **Rsbuild**: 现代化构建工具

### 动画和交互
- **impress.js**: 3D 演示框架
- **Framer Motion**: 动画库
- **CSS3**: 样式和动画效果

### 开发工具
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **pnpm**: 包管理器

## 项目结构

```
FolioSpace/
├── src/                          # 源代码目录
│   ├── components/               # React 组件
│   │   ├── MiniMap/             # 导航地图组件
│   │   │   ├── MiniMap.tsx      # 主组件文件
│   │   │   └── MiniMap.css      # 样式文件
│   │   ├── OverviewSlide/       # 总览幻灯片
│   │   ├── ProgressBar/         # 进度条组件
│   │   ├── ProjectCard/         # 项目卡片组件
│   │   ├── ProjectSlide/        # 项目详情幻灯片
│   │   ├── TitleSlide/          # 标题幻灯片
│   │   ├── Toolbar/             # 工具栏组件
│   │   └── ui/                  # 通用 UI 组件
│   │       ├── blur-fade.tsx    # 模糊淡入动画
│   │       └── target-cursor.tsx # 自定义光标
│   ├── constants/               # 配置常量
│   │   ├── impressConfig.ts     # impress.js 配置
│   │   ├── projectsData.ts      # 项目数据
│   │   ├── slideIds.ts          # 幻灯片 ID 定义
│   │   └── userConfig.ts        # 用户配置
│   ├── types/                   # TypeScript 类型定义
│   │   ├── global.d.ts          # 全局类型
│   │   ├── project.ts           # 项目相关类型
│   │   └── userConfig.ts        # 用户配置类型
│   ├── assets/                  # 静态资源
│   ├── App.tsx                  # 主应用组件
│   ├── App.css                  # 全局样式
│   └── index.tsx                # 应用入口点
├── public/                      # 公共文件
│   └── index.html               # HTML 模板
├── rsbuild.config.mjs           # 构建配置
├── tsconfig.json                # TypeScript 配置
├── package.json                 # 项目依赖
├── README.md                    # 项目说明（英文）
├── README.zh_CN.md              # 项目说明（中文）
└── DEVELOPMENT.zh_CN.md         # 开发指南（本文件）
```

## 开发环境设置

### 系统要求

- Node.js >= 16.0.0
- pnpm >= 7.0.0 (推荐) 或 npm >= 8.0.0

### 安装步骤

1. **克隆项目**
   ```bash
   git clone https://github.com/SimonAKing/FolioSpace.git
   cd FolioSpace
   ```

2. **安装依赖**
   ```bash
   pnpm install
   # 或使用 npm
   npm install
   ```

3. **启动开发服务器**
   ```bash
   pnpm dev
   # 或使用 npm
   npm run dev
   ```

4. **访问应用**
   打开浏览器访问 [http://localhost:3001](http://localhost:3001)

### 开发命令

```bash
# 开发模式
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview

# 代码检查
pnpm lint

# 代码格式化
pnpm format
```

## 核心组件详解

### 1. App.tsx - 主应用组件

主应用组件负责整个应用的初始化和布局管理。

**主要功能:**
- 初始化 impress.js
- 渲染所有幻灯片组件
- 管理全局状态和事件

**关键代码:**
```typescript
// 初始化 impress.js
useEffect(() => {
  const impressInstance = impress();
  impressInstance.init();
  
  return () => {
    // 清理资源
  };
}, []);
```

### 2. TitleSlide - 标题幻灯片

展示个人信息和简介的首页组件。

**主要功能:**
- 显示个人头像和基本信息
- 展示个人简介
- 提供社交链接
- 使用 BlurFade 动画效果

**配置方式:**
在 `src/constants/userConfig.ts` 中修改个人信息。

### 3. ProjectSlide - 项目幻灯片

为每个项目创建独立的 3D 幻灯片。

**主要功能:**
- 渲染项目详细信息
- 支持多种布局模式
- 集成 GitHub API 获取项目统计

**布局类型:**
- `standard`: 信息在左，预览在右
- `reverse`: 预览在左，信息在右

### 4. MiniMap - 导航地图

创新的项目导航组件，提供直观的导航体验。

**主要功能:**
- 实时显示当前位置
- 支持点击快速跳转
- 自动滚动到当前项目
- 显示浏览进度

**实现原理:**
```typescript
// 监听幻灯片切换事件
useEffect(() => {
  const handleStepChange = (event: Event) => {
    const stepId = (event.target as Element).id;
    setActiveNodeId(stepId);
  };

  document.addEventListener('impress:stepenter', handleStepChange);
  return () => {
    document.removeEventListener('impress:stepenter', handleStepChange);
  };
}, []);
```

### 5. Toolbar - 工具栏

提供导航控制和设置选项的工具栏组件。

**主要功能:**
- 幻灯片导航（上一张/下一张）
- 自动播放控制
- 主题切换
- MiniMap 显示/隐藏
- 总览模式切换

### 6. ProgressBar - 进度条

显示用户浏览进度的组件。

**实现原理:**
```typescript
// 计算进度百分比
const calculateProgress = (currentId: string): number => {
  const currentIndex = mapData.findIndex(item => item.id === currentId);
  return ((currentIndex + 1) / mapData.length) * 100;
};
```

### 7. UI 组件

#### BlurFade - 模糊淡入动画
提供带有模糊效果的淡入动画，支持视口检测触发。

#### TargetCursor - 自定义光标
提供瞄准框效果的自定义光标，增强交互体验。

## 配置文件说明

### 1. userConfig.ts - 用户配置

```typescript
export const USER_CONFIG = {
  AVATAR_URL: 'your-avatar-url',      // 头像地址
  NAME: 'Your Name',                  // 姓名
  JOB_TITLE: 'Your Job Title',        // 职位
  BIO: [                              // 个人简介（数组形式）
    '你的个人简介第一行',
    '你的个人简介第二行',
  ],
  CONTACT_LINKS: [                    // 联系方式链接
    {
      type: 'github',
      url: 'https://github.com/yourusername',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
  ],
};
```

### 2. projectsData.ts - 项目数据

```typescript
export const projectsData: Project[] = [
  {
    id: 'project-id',                  // 项目唯一标识
    name: 'Project Name',              // 项目名称
    title: 'Display Title',            // 显示标题
    preview: './path/to/preview.gif',  // 预览图片
    position: {                        // 3D 空间位置
      x: 1000,
      y: 500,
      z: 0,
      rotate: 30,                      // 可选：Z轴旋转
      rotateY: 45,                     // 可选：Y轴旋转
    },
    description: 'Project description', // 项目描述
    tech: ['React', 'TypeScript'],     // 技术栈
    links: [                           // 项目链接
      {
        type: 'demo',
        url: 'https://demo.com',
        text: '在线演示',
      },
    ],
    layout: 'standard',                // 布局类型
  },
];
```

### 3. slideIds.ts - 幻灯片 ID

定义所有幻灯片的唯一标识符和位置信息。

### 4. impressConfig.ts - impress.js 配置

```typescript
export const IMPRESS_CONFIG = {
  WIDTH: 1920,           // 画布宽度
  HEIGHT: 1080,          // 画布高度
  MAX_SCALE: 3,          // 最大缩放比例
  MIN_SCALE: 0.5,        // 最小缩放比例
  PERSPECTIVE: 1000,     // 透视距离
  TRANSITION_DURATION: 1000, // 转场动画时长
};
```

## 开发最佳实践

### 1. 组件开发规范

- **使用 TypeScript**: 所有组件都应该有明确的类型定义
- **函数式组件**: 优先使用函数式组件和 Hooks
- **组件文档**: 为每个组件添加详细的 JSDoc 注释
- **性能优化**: 使用 `useCallback` 和 `useMemo` 优化性能

### 2. 样式规范

- **CSS Modules**: 使用 CSS 文件进行样式管理
- **响应式设计**: 确保在各种设备上的良好显示
- **动画性能**: 优先使用 CSS 动画，避免 JavaScript 动画

### 3. 代码组织

- **单一职责**: 每个组件只负责一个功能
- **可复用性**: 提取通用逻辑到自定义 Hooks
- **配置分离**: 将配置信息独立到 constants 目录

### 4. Git 工作流

```bash
# 创建功能分支
git checkout -b feature/new-component

# 提交代码
git add .
git commit -m "feat: add new component"

# 推送分支
git push origin feature/new-component
```

## 性能优化

### 1. 图片优化

- 使用适当的图片格式（WebP、AVIF）
- 实现懒加载
- 提供多种尺寸的图片

### 2. 代码分割

```typescript
// 使用动态导入进行代码分割
const LazyComponent = lazy(() => import('./LazyComponent'));
```

### 3. 内存管理

- 及时清理事件监听器
- 使用 `useCallback` 和 `useMemo` 避免不必要的重渲染
- 合理使用 React.memo

### 4. 网络优化

- 实现 GitHub API 的缓存机制
- 使用 CDN 加速静态资源
- 启用 gzip 压缩

## 部署指南

### 1. 构建生产版本

```bash
pnpm build
```

### 2. 部署到 Vercel

1. 连接 GitHub 仓库
2. 设置构建命令: `pnpm build`
3. 设置输出目录: `dist`
4. 配置环境变量（如需要）

### 3. 部署到 Netlify

1. 拖拽 `dist` 目录到 Netlify
2. 或连接 Git 仓库自动部署

### 4. 自定义服务器部署

```bash
# 构建项目
pnpm build

# 将 dist 目录内容上传到服务器
# 配置 Web 服务器（Nginx/Apache）
```

## 常见问题

### Q: 如何添加新的项目？

A: 在 `src/constants/projectsData.ts` 中添加新的项目配置，包括 ID、位置、描述等信息。

### Q: 如何自定义主题？

A: 修改 CSS 变量或在 Toolbar 组件中添加新的主题配置。

### Q: 如何修改 3D 动画效果？

A: 调整 `src/constants/impressConfig.ts` 中的配置参数，或修改项目的 position 属性。

### Q: GitHub API 限制怎么办？

A: 可以配置 GitHub Personal Access Token 来提高 API 限制。

### Q: 如何优化移动端体验？

A: 检查 CSS 媒体查询，确保触摸事件正确处理，优化动画性能。

### Q: 如何调试 impress.js 相关问题？

A: 使用浏览器开发者工具检查元素的 data 属性，确保 3D 位置配置正确。

---

## 贡献指南

欢迎提交 Issue 和 Pull Request！请确保：

1. 遵循现有的代码风格
2. 添加适当的测试
3. 更新相关文档
4. 提供清晰的提交信息

---

**Happy Coding! 🚀**