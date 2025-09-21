# FolioSpace 自定义配置指南

## 📋 目录

- [快速开始](#快速开始)
- [个人信息配置](#个人信息配置)
- [项目数据配置](#项目数据配置)
- [主题自定义](#主题自定义)
- [布局配置](#布局配置)
- [动画效果配置](#动画效果配置)
- [响应式设计](#响应式设计)
- [高级自定义](#高级自定义)
- [部署配置](#部署配置)

## 快速开始

FolioSpace 提供了灵活的配置系统，让你可以轻松自定义个人作品集。所有配置文件都位于 `src/constants/` 目录下。

### 基本配置步骤

1. **个人信息配置** - 修改 `userConfig.ts`
2. **项目数据配置** - 修改 `projectsData.ts`
3. **主题样式配置** - 修改 CSS 文件
4. **构建和部署** - 运行构建命令

## 个人信息配置

### 配置文件位置

`src/constants/userConfig.ts`

### 基本信息设置

```typescript
export const USER_CONFIG = {
  // 头像设置
  AVATAR_URL: 'https://your-domain.com/avatar.jpg',
  
  // 基本信息
  NAME: 'Your Name',
  JOB_TITLE: 'Your Job Title',
  
  // 个人简介（支持多行）
  BIO: [
    '🚀 全栈开发工程师，专注于现代Web技术',
    '💡 热爱创新，追求极致的用户体验',
    '🌟 开源贡献者，技术分享爱好者',
  ],
  
  // 联系方式链接
  CONTACT_LINKS: [
    {
      type: 'github',
      url: 'https://github.com/yourusername',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
    {
      type: 'linkedin',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'fab fa-linkedin',
      text: 'LinkedIn',
    },
    {
      type: 'email',
      url: 'mailto:your.email@example.com',
      icon: 'fas fa-envelope',
      text: 'Email',
    },
    {
      type: 'website',
      url: 'https://your-website.com',
      icon: 'fas fa-globe',
      text: 'Website',
    },
  ],
};
```

### 头像配置选项

#### 1. 使用在线图片
```typescript
AVATAR_URL: 'https://your-domain.com/avatar.jpg'
```

#### 2. 使用本地图片
```typescript
// 将图片放在 src/assets/ 目录下
import avatarImage from '../assets/avatar.jpg';

AVATAR_URL: avatarImage
```

#### 3. 使用 Gravatar
```typescript
AVATAR_URL: 'https://www.gravatar.com/avatar/your-hash?s=200'
```

### 社交链接配置

支持的链接类型和对应图标：

| 类型 | 图标类 | 描述 |
|------|--------|------|
| github | `fab fa-github` | GitHub 个人主页 |
| linkedin | `fab fa-linkedin` | LinkedIn 个人资料 |
| twitter | `fab fa-twitter` | Twitter 个人主页 |
| email | `fas fa-envelope` | 邮箱联系方式 |
| website | `fas fa-globe` | 个人网站 |
| blog | `fas fa-blog` | 个人博客 |
| youtube | `fab fa-youtube` | YouTube 频道 |
| instagram | `fab fa-instagram` | Instagram 账号 |

### 自定义社交链接

```typescript
{
  type: 'custom',
  url: 'https://your-custom-platform.com',
  icon: 'fas fa-custom-icon', // 使用 Font Awesome 图标
  text: '自定义平台',
}
```

## 项目数据配置

### 配置文件位置

`src/constants/projectsData.ts`

### 项目配置结构

```typescript
export const projectsData: Project[] = [
  {
    // 基本信息
    id: 'unique-project-id',           // 唯一标识符
    name: 'Project Name',              // 项目名称
    title: 'Project Display Title',    // 显示标题
    
    // 预览图片
    preview: './src/assets/project-preview.gif',
    
    // 3D 空间位置
    position: {
      x: 1000,        // X轴位置
      y: 500,         // Y轴位置
      z: 0,           // Z轴位置（可选）
      rotate: 30,     // Z轴旋转角度（可选）
      rotateY: 45,    // Y轴旋转角度（可选）
    },
    
    // 项目描述
    description: '项目的详细描述，支持较长的文本内容...',
    
    // 技术栈标签
    tech: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    
    // 项目链接
    links: [
      {
        type: 'demo',
        url: 'https://your-demo.com',
        text: '在线演示',
      },
      {
        type: 'code',
        url: 'https://github.com/username/repo',
        text: 'GitHub源码',
        githubRepo: 'username/repo', // 用于获取GitHub统计信息
      },
    ],
    
    // 布局类型
    layout: 'standard', // 'standard' 或 'reverse'
  },
];
```

### 3D 位置配置指南

#### 基本定位原则

```typescript
// 标题页位置（原点）
{ x: 0, y: 0, z: 0 }

// 项目分布建议
const positions = {
  project1: { x: 1000, y: 0, z: 0 },      // 右侧
  project2: { x: 0, y: 1000, z: 0 },      // 下方
  project3: { x: -1000, y: 0, z: 0 },     // 左侧
  project4: { x: 0, y: -1000, z: 0 },     // 上方
  project5: { x: 1000, y: 1000, z: 500 }, // 右下前方
};
```

#### 旋转效果配置

```typescript
// Z轴旋转（平面旋转）
rotate: 45,    // 顺时针旋转45度

// Y轴旋转（3D翻转）
rotateY: 30,   // 绕Y轴旋转30度

// 组合旋转效果
position: {
  x: 1000,
  y: 500,
  z: 200,
  rotate: 15,
  rotateY: 45,
}
```

### 项目链接类型

| 类型 | 描述 | 示例 |
|------|------|------|
| demo | 在线演示 | 部署的网站链接 |
| code | 源代码 | GitHub 仓库链接 |
| docs | 文档 | 项目文档链接 |
| download | 下载 | 应用下载链接 |
| video | 视频 | 演示视频链接 |

### GitHub 集成配置

```typescript
{
  type: 'code',
  url: 'https://github.com/username/repo',
  text: 'GitHub源码',
  githubRepo: 'username/repo', // 必需：用于API调用
}
```

启用 GitHub 集成后，系统会自动获取：
- ⭐ Star 数量
- 🍴 Fork 数量
- 📝 主要编程语言
- 📅 最后更新时间

### 预览图片配置

#### 1. 使用 GIF 动画
```typescript
preview: './src/assets/project-demo.gif'
```

#### 2. 使用静态图片
```typescript
preview: './src/assets/project-screenshot.jpg'
```

#### 3. 使用在线图片
```typescript
preview: 'https://your-cdn.com/project-preview.png'
```

#### 图片优化建议
- **尺寸**: 建议 800x600 像素
- **格式**: GIF（动画）或 WebP（静态）
- **大小**: 控制在 2MB 以内
- **比例**: 保持 4:3 或 16:9

## 主题自定义

### CSS 变量配置

FolioSpace 使用 CSS 变量系统，支持动态主题切换。

#### 主要颜色变量

```css
:root {
  /* 主色调 */
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
  
  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-tertiary: #f1f5f9;
  
  /* 文字颜色 */
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  
  /* 边框颜色 */
  --border-color: #e2e8f0;
  --border-hover: #cbd5e1;
  
  /* 阴影 */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}

/* 深色主题 */
[data-theme="dark"] {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-muted: #94a3b8;
  
  --border-color: #334155;
  --border-hover: #475569;
}
```

#### 自定义主题色

```css
/* 蓝色主题 */
:root {
  --primary-color: #3b82f6;
  --primary-hover: #2563eb;
}

/* 绿色主题 */
:root {
  --primary-color: #10b981;
  --primary-hover: #059669;
}

/* 紫色主题 */
:root {
  --primary-color: #8b5cf6;
  --primary-hover: #7c3aed;
}

/* 橙色主题 */
:root {
  --primary-color: #f59e0b;
  --primary-hover: #d97706;
}
```

### 组件样式自定义

#### 标题页样式

```css
/* src/components/TitleSlide/TitleSlide.css */

.title-slide {
  /* 背景渐变 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* 自定义字体 */
  font-family: 'Inter', 'Helvetica Neue', sans-serif;
}

.profile-name {
  /* 文字效果 */
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  /* 动画效果 */
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 20px rgba(255, 107, 107, 0.5); }
  to { text-shadow: 0 0 30px rgba(78, 205, 196, 0.8); }
}
```

#### 项目卡片样式

```css
/* src/components/ProjectCard/ProjectCard.css */

.project-card {
  /* 玻璃态效果 */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  /* 悬停效果 */
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```

### 字体配置

#### 1. 使用 Google Fonts

```html
<!-- public/index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

```css
/* src/App.css */
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

#### 2. 使用本地字体

```css
@font-face {
  font-family: 'CustomFont';
  src: url('./assets/fonts/CustomFont.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'CustomFont', sans-serif;
}
```

## 布局配置

### 项目卡片布局

FolioSpace 支持两种项目卡片布局：

#### 1. 标准布局 (standard)
```
┌─────────────┬─────────────┐
│             │             │
│   项目信息   │   预览图片   │
│             │             │
└─────────────┴─────────────┘
```

#### 2. 反向布局 (reverse)
```
┌─────────────┬─────────────┐
│             │             │
│   预览图片   │   项目信息   │
│             │             │
└─────────────┴─────────────┘
```

### 响应式断点配置

```css
/* 移动设备 */
@media (max-width: 768px) {
  .project-card {
    flex-direction: column;
  }
}

/* 平板设备 */
@media (min-width: 769px) and (max-width: 1024px) {
  .project-card {
    max-width: 90%;
  }
}

/* 桌面设备 */
@media (min-width: 1025px) {
  .project-card {
    max-width: 1200px;
  }
}
```

## 动画效果配置

### impress.js 配置

```typescript
// src/constants/impressConfig.ts

export const IMPRESS_CONFIG = {
  // 画布尺寸
  WIDTH: 1920,
  HEIGHT: 1080,
  
  // 缩放范围
  MAX_SCALE: 3,
  MIN_SCALE: 0.5,
  
  // 3D 效果
  PERSPECTIVE: 1000,
  
  // 动画时长
  TRANSITION_DURATION: 1000, // 毫秒
};
```

### 自定义转场动画

```css
/* 自定义转场效果 */
.impress-enabled .step {
  transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

/* 淡入效果 */
.step {
  opacity: 0;
}

.step.present {
  opacity: 1;
}

/* 缩放效果 */
.step.future {
  transform: scale(0.8);
}

.step.present {
  transform: scale(1);
}
```

### BlurFade 动画配置

```typescript
// 快速淡入
<BlurFade delay={0.1} duration={0.3}>
  <Component />
</BlurFade>

// 慢速淡入
<BlurFade delay={0.5} duration={0.8} yOffset={20}>
  <Component />
</BlurFade>

// 自定义动画变体
<BlurFade 
  variant={{
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }}
>
  <Component />
</BlurFade>
```

## 响应式设计

### 移动端优化

#### 1. 触摸手势支持

```typescript
// 在 Toolbar 组件中启用触摸导航
const handleTouchStart = (e: TouchEvent) => {
  // 触摸开始逻辑
};

const handleTouchEnd = (e: TouchEvent) => {
  // 触摸结束逻辑
};
```

#### 2. 移动端布局调整

```css
@media (max-width: 768px) {
  .title-slide {
    padding: 2rem 1rem;
  }
  
  .project-card {
    flex-direction: column;
    margin: 1rem;
  }
  
  .toolbar {
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
  }
}
```

### 平板端优化

```css
@media (min-width: 769px) and (max-width: 1024px) {
  .project-card {
    max-width: 90%;
    margin: 2rem auto;
  }
  
  .minimap {
    width: 300px;
  }
}
```

## 高级自定义

### 添加新的幻灯片类型

#### 1. 创建新组件

```typescript
// src/components/CustomSlide/CustomSlide.tsx

interface CustomSlideProps {
  id: string;
  position: Position3D;
  content: any;
}

const CustomSlide: React.FC<CustomSlideProps> = ({ id, position, content }) => {
  return (
    <div
      id={id}
      className="step custom-slide"
      data-x={position.x}
      data-y={position.y}
      data-z={position.z}
    >
      {/* 自定义内容 */}
    </div>
  );
};
```

#### 2. 注册到应用

```typescript
// src/App.tsx

import CustomSlide from './components/CustomSlide/CustomSlide';

function App() {
  return (
    <div id="impress">
      <TitleSlide />
      {projectsData.map(project => (
        <ProjectSlide key={project.id} project={project} />
      ))}
      <CustomSlide 
        id="custom"
        position={{ x: 2000, y: 0, z: 0 }}
        content={customContent}
      />
      <OverviewSlide />
    </div>
  );
}
```

### 自定义导航逻辑

```typescript
// src/hooks/useCustomNavigation.ts

export const useCustomNavigation = () => {
  const goToSlide = (slideId: string) => {
    const impressApi = (window as any).impress();
    impressApi.goto(slideId);
  };
  
  const nextSlide = () => {
    const impressApi = (window as any).impress();
    impressApi.next();
  };
  
  const prevSlide = () => {
    const impressApi = (window as any).impress();
    impressApi.prev();
  };
  
  return { goToSlide, nextSlide, prevSlide };
};
```

### 添加自定义动画

```typescript
// src/components/ui/custom-animation.tsx

import { motion } from 'framer-motion';

interface CustomAnimationProps {
  children: React.ReactNode;
  animationType: 'slide' | 'fade' | 'scale';
}

const CustomAnimation: React.FC<CustomAnimationProps> = ({ 
  children, 
  animationType 
}) => {
  const variants = {
    slide: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 }
    },
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scale: {
      hidden: { scale: 0.8, opacity: 0 },
      visible: { scale: 1, opacity: 1 }
    }
  };
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants[animationType]}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};
```

## 部署配置

### 环境变量配置

```bash
# .env.local

# GitHub API Token (可选，用于提高API限制)
GITHUB_TOKEN=your_github_token

# 网站基础URL
PUBLIC_URL=https://your-domain.com

# 分析工具ID
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### 构建优化配置

```javascript
// rsbuild.config.mjs

export default {
  html: {
    template: './public/index.html',
  },
  output: {
    distPath: {
      root: 'dist',
    },
  },
  performance: {
    chunkSplit: {
      strategy: 'split-by-experience',
    },
  },
  tools: {
    rspack: {
      optimization: {
        splitChunks: {
          chunks: 'all',
        },
      },
    },
  },
};
```

### CDN 配置

```typescript
// 使用 CDN 加速静态资源

const CDN_BASE = 'https://your-cdn.com';

export const ASSET_CONFIG = {
  IMAGES: `${CDN_BASE}/images`,
  FONTS: `${CDN_BASE}/fonts`,
  ICONS: `${CDN_BASE}/icons`,
};
```

---

## 配置检查清单

在完成自定义配置后，请检查以下项目：

### ✅ 基本配置
- [ ] 个人信息已更新
- [ ] 头像图片已设置
- [ ] 社交链接已配置
- [ ] 项目数据已添加

### ✅ 视觉效果
- [ ] 主题色彩已自定义
- [ ] 字体样式已设置
- [ ] 动画效果已调整
- [ ] 响应式布局已测试

### ✅ 功能测试
- [ ] 所有链接可正常访问
- [ ] GitHub API 集成正常
- [ ] 导航功能正常
- [ ] 移动端体验良好

### ✅ 性能优化
- [ ] 图片已优化
- [ ] 代码已压缩
- [ ] CDN 已配置
- [ ] 缓存策略已设置

---

**配置完成后，运行 `pnpm build` 构建项目，然后部署到你的服务器！🚀**