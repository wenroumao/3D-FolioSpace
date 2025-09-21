# FolioSpace API 文档

## 📋 目录

- [组件 API](#组件-api)
- [配置 API](#配置-api)
- [类型定义](#类型定义)
- [工具函数](#工具函数)
- [事件系统](#事件系统)
- [GitHub API 集成](#github-api-集成)

## 组件 API

### TitleSlide

标题幻灯片组件，展示个人信息和简介。

```typescript
const TitleSlide: React.FC = () => JSX.Element
```

**特性:**
- 自动从 `USER_CONFIG` 读取配置
- 支持 BlurFade 动画效果
- 响应式设计
- 社交链接集成

**使用示例:**
```tsx
import TitleSlide from './components/TitleSlide/TitleSlide';

function App() {
  return <TitleSlide />;
}
```

---

### ProjectSlide

项目幻灯片组件，为每个项目创建 3D 空间中的展示页面。

```typescript
interface ProjectSlideProps {
  project: Project;
}

const ProjectSlide: React.FC<ProjectSlideProps>
```

**Props:**

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| project | Project | ✅ | 项目数据对象 |

**使用示例:**
```tsx
import ProjectSlide from './components/ProjectSlide/ProjectSlide';
import { projectsData } from './constants/projectsData';

function App() {
  return (
    <>
      {projectsData.map((project) => (
        <ProjectSlide key={project.id} project={project} />
      ))}
    </>
  );
}
```

---

### ProjectCard

项目卡片组件，展示项目的详细信息。

```typescript
interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps>
```

**Props:**

| 属性 | 类型 | 必需 | 描述 |
|------|------|------|------|
| project | Project | ✅ | 项目数据对象 |

**特性:**
- 支持两种布局模式（standard/reverse）
- GitHub API 集成
- 懒加载图片
- 响应式设计
- 性能优化（useCallback, useMemo）

**使用示例:**
```tsx
import ProjectCard from './components/ProjectCard/ProjectCard';

const project = {
  id: 'example',
  name: 'Example Project',
  // ... 其他项目属性
};

function Example() {
  return <ProjectCard project={project} />;
}
```

---

### MiniMap

导航地图组件，提供项目导航功能。

```typescript
const MiniMap: React.FC = () => JSX.Element
```

**特性:**
- 实时显示当前位置
- 支持点击快速跳转
- 自动滚动到当前项目
- 显示浏览进度
- 响应 impress.js 事件

**事件监听:**
- `impress:stepenter`: 幻灯片切换事件

**使用示例:**
```tsx
import MiniMap from './components/MiniMap/MiniMap';

function App() {
  return (
    <div>
      {/* 其他组件 */}
      <MiniMap />
    </div>
  );
}
```

---

### Toolbar

工具栏组件，提供导航控制和设置选项。

```typescript
const Toolbar: React.FC = () => JSX.Element
```

**功能:**
- 幻灯片导航（上一张/下一张/总览）
- 自动播放控制
- 主题切换（浅色/深色）
- MiniMap 显示/隐藏控制

**主题支持:**
- `light`: 浅色主题
- `dark`: 深色主题

**使用示例:**
```tsx
import Toolbar from './components/Toolbar/Toolbar';

function App() {
  return (
    <div>
      {/* 其他组件 */}
      <Toolbar />
    </div>
  );
}
```

---

### ProgressBar

进度条组件，显示用户在幻灯片中的浏览进度。

```typescript
const ProgressBar: React.FC = () => JSX.Element
```

**特性:**
- 实时更新进度
- 平滑动画效果
- 响应 impress.js 事件

**使用示例:**
```tsx
import ProgressBar from './components/ProgressBar/ProgressBar';

function App() {
  return (
    <div>
      <ProgressBar />
      {/* 其他组件 */}
    </div>
  );
}
```

---

### OverviewSlide

总览幻灯片组件，提供项目的全景视图。

```typescript
const OverviewSlide: React.FC = () => JSX.Element
```

**特性:**
- 空的幻灯片容器
- 用于 impress.js 缩放效果
- 显示所有项目的全景视图

---

### BlurFade

模糊淡入动画组件，提供带有模糊效果的淡入动画。

```typescript
interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

const BlurFade: React.FC<BlurFadeProps>
```

**Props:**

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| children | ReactNode | - | 子组件内容 |
| className | string | - | 自定义CSS类名 |
| variant | object | - | 自定义动画变体 |
| duration | number | 0.4 | 动画持续时间（秒） |
| delay | number | 0 | 动画延迟时间（秒） |
| yOffset | number | 6 | Y轴偏移量（像素） |
| inView | boolean | false | 是否启用视口检测 |
| inViewMargin | string | "-50px" | 视口检测边距 |
| blur | string | "6px" | 模糊效果强度 |

**使用示例:**
```tsx
import { BlurFade } from './components/ui/blur-fade';

function Example() {
  return (
    <BlurFade delay={0.2} inView>
      <div>内容将带有模糊淡入效果</div>
    </BlurFade>
  );
}
```

---

### TargetCursor

自定义光标组件，提供瞄准框效果的光标。

```typescript
interface TargetCursorProps {
  targetSelector?: string;
  hideDefaultCursor?: boolean;
  spinDuration?: number;
  spinEase?: string;
}

const TargetCursor: React.FC<TargetCursorProps>
```

**Props:**

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| targetSelector | string | '.cursor-target' | 目标元素选择器 |
| hideDefaultCursor | boolean | true | 是否隐藏默认光标 |
| spinDuration | number | - | 旋转动画持续时间 |
| spinEase | string | - | 旋转动画缓动函数 |

**使用示例:**
```tsx
import TargetCursor from './components/ui/target-cursor';

function App() {
  return (
    <div>
      {/* 其他组件 */}
      <TargetCursor 
        targetSelector=".cursor-target"
        hideDefaultCursor={true}
        spinDuration={2}
      />
    </div>
  );
}
```

## 配置 API

### USER_CONFIG

用户配置对象，定义个人信息和联系方式。

```typescript
interface UserConfig {
  AVATAR_URL: string;
  NAME: string;
  JOB_TITLE: string;
  BIO: string[];
  CONTACT_LINKS: ContactLink[];
}

interface ContactLink {
  type: string;
  url: string;
  icon: string;
  text: string;
}
```

**配置示例:**
```typescript
export const USER_CONFIG: UserConfig = {
  AVATAR_URL: 'https://example.com/avatar.jpg',
  NAME: 'Your Name',
  JOB_TITLE: 'Your Job Title',
  BIO: [
    '个人简介第一行',
    '个人简介第二行',
  ],
  CONTACT_LINKS: [
    {
      type: 'github',
      url: 'https://github.com/username',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
  ],
};
```

---

### IMPRESS_CONFIG

impress.js 配置对象，定义 3D 演示的基本参数。

```typescript
interface ImpressConfig {
  WIDTH: number;
  HEIGHT: number;
  MAX_SCALE: number;
  MIN_SCALE: number;
  PERSPECTIVE: number;
  TRANSITION_DURATION: number;
}
```

**配置示例:**
```typescript
export const IMPRESS_CONFIG: ImpressConfig = {
  WIDTH: 1920,
  HEIGHT: 1080,
  MAX_SCALE: 3,
  MIN_SCALE: 0.5,
  PERSPECTIVE: 1000,
  TRANSITION_DURATION: 1000,
};
```

---

### SLIDE_IDS

幻灯片 ID 常量定义。

```typescript
export const SLIDE_IDS = {
  TITLE: 'title',
  HomeProfile: 'HomeProfile',
  HOMEPAGE: 'homepage',
  // ... 其他幻灯片 ID
} as const;

export type SlideId = (typeof SLIDE_IDS)[keyof typeof SLIDE_IDS];
```

---

### SLIDE_POSITIONS

特殊幻灯片位置配置。

```typescript
export const SLIDE_POSITIONS = {
  TITLE: { x: 0, y: 0, z: 0 },
  OVERVIEW: { x: 0, y: 0, z: 0, scale: 4.5 },
} as const;
```

## 类型定义

### Project

项目数据类型定义。

```typescript
interface Project {
  id: string;
  name: string;
  title: string;
  preview: string;
  position: Position3D;
  description: string;
  tech: string[];
  links: ProjectLink[];
  layout: 'standard' | 'reverse';
}

interface Position3D {
  x: number;
  y: number;
  z?: number;
  rotate?: number;
  rotateY?: number;
}

interface ProjectLink {
  type: 'demo' | 'code' | 'docs';
  url: string;
  text: string;
  githubRepo?: string;
}
```

### GitHubRepoInfo

GitHub 仓库信息类型。

```typescript
interface GitHubRepoInfo {
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  description: string;
}
```

## 工具函数

### formatCount

格式化数字显示。

```typescript
function formatCount(count: number): string
```

**参数:**
- `count`: 要格式化的数字

**返回值:**
- 格式化后的字符串（如：1.2k, 5.6M）

**使用示例:**
```typescript
formatCount(1234); // "1.2k"
formatCount(1234567); // "1.2M"
```

---

### formatDate

格式化日期显示。

```typescript
function formatDate(dateString: string): string
```

**参数:**
- `dateString`: ISO 日期字符串

**返回值:**
- 格式化后的日期字符串

**使用示例:**
```typescript
formatDate('2023-12-01T10:00:00Z'); // "2023年12月1日"
```

## 事件系统

### impress.js 事件

项目使用 impress.js 的事件系统进行幻灯片导航。

#### impress:stepenter

当进入新幻灯片时触发。

```typescript
document.addEventListener('impress:stepenter', (event) => {
  const stepId = (event.target as Element).id;
  console.log('进入幻灯片:', stepId);
});
```

#### impress:stepleave

当离开幻灯片时触发。

```typescript
document.addEventListener('impress:stepleave', (event) => {
  const stepId = (event.target as Element).id;
  console.log('离开幻灯片:', stepId);
});
```

### 自定义事件

#### minimap:toggle

切换 MiniMap 显示状态。

```typescript
// 触发事件
const event = new CustomEvent('minimap:toggle');
document.dispatchEvent(event);

// 监听事件
document.addEventListener('minimap:toggle', () => {
  console.log('MiniMap 状态切换');
});
```

## GitHub API 集成

### 获取仓库信息

```typescript
async function fetchGitHubRepoInfo(repo: string): Promise<GitHubRepoInfo | null>
```

**参数:**
- `repo`: GitHub 仓库名称（格式：owner/repo）

**返回值:**
- Promise<GitHubRepoInfo | null>

**使用示例:**
```typescript
const repoInfo = await fetchGitHubRepoInfo('SimonAKing/FolioSpace');
if (repoInfo) {
  console.log('Star 数:', repoInfo.stargazers_count);
}
```

### API 限制处理

GitHub API 有请求限制，项目实现了以下策略：

1. **缓存机制**: 缓存 API 响应结果
2. **错误处理**: 优雅处理 API 失败
3. **降级显示**: API 失败时隐藏相关信息

### 配置 Personal Access Token

为了提高 API 限制，可以配置 GitHub Personal Access Token：

```typescript
// 在环境变量中设置
GITHUB_TOKEN=your_personal_access_token

// 在代码中使用
const headers = {
  'Authorization': `token ${process.env.GITHUB_TOKEN}`,
};
```

---

## 最佳实践

### 1. 组件使用

- 使用 TypeScript 确保类型安全
- 为所有 Props 提供默认值
- 使用 React.memo 优化性能
- 合理使用 useCallback 和 useMemo

### 2. 配置管理

- 将所有配置集中在 constants 目录
- 使用 TypeScript 接口定义配置结构
- 提供配置验证和默认值

### 3. 事件处理

- 及时清理事件监听器
- 使用 passive 选项优化性能
- 避免内存泄漏

### 4. 错误处理

- 为所有异步操作添加错误处理
- 提供用户友好的错误信息
- 实现降级方案

---

**API 文档持续更新中... 📚**