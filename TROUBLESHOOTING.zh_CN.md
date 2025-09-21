# FolioSpace 故障排除指南

## 📋 目录

- [常见问题](#常见问题)
- [安装问题](#安装问题)
- [开发环境问题](#开发环境问题)
- [构建问题](#构建问题)
- [部署问题](#部署问题)
- [性能问题](#性能问题)
- [浏览器兼容性](#浏览器兼容性)
- [GitHub API 问题](#github-api-问题)
- [样式问题](#样式问题)
- [调试技巧](#调试技巧)

## 常见问题

### Q: 项目无法启动，显示端口被占用

**问题描述**: 运行 `pnpm dev` 时提示端口 3001 被占用

**解决方案**:

1. **查找占用端口的进程**:
   ```bash
   # Windows
   netstat -ano | findstr :3001
   
   # macOS/Linux
   lsof -i :3001
   ```

2. **终止占用进程**:
   ```bash
   # Windows (替换 PID 为实际进程ID)
   taskkill /PID <PID> /F
   
   # macOS/Linux
   kill -9 <PID>
   ```

3. **使用其他端口**:
   ```bash
   pnpm dev --port 3002
   ```

### Q: 项目预览图片不显示

**问题描述**: 项目卡片中的预览图片显示为空白或加载失败

**可能原因**:
- 图片路径错误
- 图片文件不存在
- 图片格式不支持
- 图片文件过大

**解决方案**:

1. **检查图片路径**:
   ```typescript
   // 确保路径正确
   preview: './src/assets/project1.gif'  // ✅ 正确
   preview: './assets/project1.gif'      // ❌ 错误
   ```

2. **验证图片文件**:
   - 确认文件存在于指定路径
   - 检查文件名大小写是否匹配
   - 确认文件格式（支持 .jpg, .png, .gif, .webp）

3. **优化图片大小**:
   ```bash
   # 使用工具压缩图片
   npm install -g imagemin-cli
   imagemin src/assets/*.{jpg,png} --out-dir=src/assets/optimized
   ```

### Q: GitHub 统计信息不显示

**问题描述**: 项目卡片中的 GitHub 星数、Fork 数等信息显示为 0 或加载失败

**解决方案**:

1. **检查仓库配置**:
   ```typescript
   {
     type: 'code',
     url: 'https://github.com/username/repo',
     githubRepo: 'username/repo', // 确保格式正确
   }
   ```

2. **检查网络连接**:
   - 确认可以访问 GitHub API
   - 检查是否被防火墙阻止

3. **配置 GitHub Token**（可选）:
   ```bash
   # .env.local
   GITHUB_TOKEN=your_personal_access_token
   ```

### Q: 3D 导航不流畅或卡顿

**问题描述**: 在幻灯片之间切换时出现卡顿或动画不流畅

**解决方案**:

1. **检查硬件加速**:
   - 确保浏览器启用了硬件加速
   - Chrome: 设置 → 高级 → 系统 → 使用硬件加速

2. **优化项目数量**:
   ```typescript
   // 减少同时渲染的项目数量
   const MAX_PROJECTS = 8; // 建议不超过10个
   ```

3. **调整动画性能**:
   ```css
   .step {
     will-change: transform;
     transform: translateZ(0); /* 强制硬件加速 */
   }
   ```

## 安装问题

### 依赖安装失败

**问题**: `pnpm install` 执行失败

**解决方案**:

1. **清理缓存**:
   ```bash
   pnpm store prune
   rm -rf node_modules
   rm pnpm-lock.yaml
   pnpm install
   ```

2. **检查 Node.js 版本**:
   ```bash
   node --version  # 需要 >= 16.0.0
   pnpm --version  # 需要 >= 7.0.0
   ```

3. **使用其他包管理器**:
   ```bash
   # 如果 pnpm 有问题，可以使用 npm
   npm install
   npm run dev
   ```

### 权限问题

**问题**: 在 Windows 上安装依赖时出现权限错误

**解决方案**:

1. **以管理员身份运行**:
   - 右键点击命令提示符
   - 选择"以管理员身份运行"

2. **配置 npm 权限**:
   ```bash
   npm config set prefix %APPDATA%\npm
   ```

## 开发环境问题

### 热重载不工作

**问题**: 修改代码后页面不自动刷新

**解决方案**:

1. **检查文件监听**:
   ```bash
   # 增加文件监听限制
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

2. **检查防火墙设置**:
   - 确保端口 3001 未被防火墙阻止

3. **重启开发服务器**:
   ```bash
   # 停止服务器 (Ctrl+C)
   pnpm dev
   ```

### TypeScript 类型错误

**问题**: TypeScript 编译错误或类型检查失败

**解决方案**:

1. **更新类型定义**:
   ```bash
   pnpm add -D @types/react @types/react-dom
   ```

2. **检查 tsconfig.json**:
   ```json
   {
     "compilerOptions": {
       "strict": true,
       "skipLibCheck": true,
       "esModuleInterop": true
     }
   }
   ```

3. **忽略特定错误**:
   ```typescript
   // @ts-ignore
   const impressApi = (window as any).impress();
   ```

## 构建问题

### 构建失败

**问题**: `pnpm build` 执行失败

**解决方案**:

1. **检查内存使用**:
   ```bash
   # 增加 Node.js 内存限制
   NODE_OPTIONS="--max-old-space-size=4096" pnpm build
   ```

2. **清理构建缓存**:
   ```bash
   rm -rf dist
   rm -rf node_modules/.cache
   pnpm build
   ```

3. **检查环境变量**:
   ```bash
   # 确保环境变量正确设置
   echo $NODE_ENV
   ```

### 静态资源路径错误

**问题**: 构建后静态资源无法加载

**解决方案**:

1. **配置 publicPath**:
   ```javascript
   // rsbuild.config.mjs
   export default {
     output: {
       assetPrefix: '/your-app-name/',
     },
   };
   ```

2. **检查相对路径**:
   ```typescript
   // 使用相对路径
   preview: './src/assets/image.jpg'
   ```

## 部署问题

### GitHub Pages 部署失败

**问题**: 部署到 GitHub Pages 后页面空白或资源加载失败

**解决方案**:

1. **配置 homepage**:
   ```json
   // package.json
   {
     "homepage": "https://username.github.io/repository-name"
   }
   ```

2. **使用 gh-pages 部署**:
   ```bash
   pnpm add -D gh-pages
   pnpm build
   npx gh-pages -d dist
   ```

### Vercel 部署问题

**问题**: Vercel 部署后出现 404 错误

**解决方案**:

1. **配置 vercel.json**:
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

2. **检查构建命令**:
   ```json
   // package.json
   {
     "scripts": {
       "build": "rsbuild build"
     }
   }
   ```

### Netlify 部署问题

**问题**: Netlify 部署后样式丢失或功能异常

**解决方案**:

1. **配置 _redirects**:
   ```
   # public/_redirects
   /*    /index.html   200
   ```

2. **设置环境变量**:
   - 在 Netlify 控制台设置必要的环境变量
   - 如 `GITHUB_TOKEN`

## 性能问题

### 页面加载缓慢

**问题**: 首次加载时间过长

**解决方案**:

1. **图片优化**:
   ```bash
   # 压缩图片
   npm install -g imagemin-cli
   imagemin src/assets/*.{jpg,png,gif} --out-dir=src/assets/compressed
   ```

2. **代码分割**:
   ```typescript
   // 使用动态导入
   const LazyComponent = React.lazy(() => import('./LazyComponent'));
   ```

3. **启用缓存**:
   ```javascript
   // rsbuild.config.mjs
   export default {
     output: {
       filename: {
         js: '[name].[contenthash:8].js',
       },
     },
   };
   ```

### 内存泄漏

**问题**: 长时间使用后浏览器变慢或崩溃

**解决方案**:

1. **清理事件监听器**:
   ```typescript
   useEffect(() => {
     const handleResize = () => {
       // 处理逻辑
     };
     
     window.addEventListener('resize', handleResize);
     
     return () => {
       window.removeEventListener('resize', handleResize);
     };
   }, []);
   ```

2. **优化状态管理**:
   ```typescript
   // 避免不必要的状态更新
   const memoizedValue = useMemo(() => {
     return expensiveCalculation(data);
   }, [data]);
   ```

## 浏览器兼容性

### IE 浏览器不支持

**问题**: Internet Explorer 无法正常显示

**解决方案**:

1. **添加 polyfills**:
   ```bash
   pnpm add core-js
   ```

   ```typescript
   // src/index.tsx
   import 'core-js/stable';
   ```

2. **显示不支持提示**:
   ```html
   <!-- public/index.html -->
   <!--[if IE]>
   <div class="ie-warning">
     此网站不支持 Internet Explorer，请使用现代浏览器访问。
   </div>
   <![endif]-->
   ```

### Safari 兼容性问题

**问题**: Safari 浏览器中动画效果异常

**解决方案**:

1. **添加 webkit 前缀**:
   ```css
   .animated-element {
     -webkit-transform: translateZ(0);
     transform: translateZ(0);
     -webkit-backface-visibility: hidden;
     backface-visibility: hidden;
   }
   ```

2. **检查 CSS 属性支持**:
   ```css
   @supports (backdrop-filter: blur(10px)) {
     .glass-effect {
       backdrop-filter: blur(10px);
     }
   }
   ```

## GitHub API 问题

### API 限制

**问题**: GitHub API 请求过多导致限制

**解决方案**:

1. **配置个人访问令牌**:
   ```bash
   # .env.local
   GITHUB_TOKEN=ghp_your_token_here
   ```

2. **实现缓存机制**:
   ```typescript
   const cache = new Map();
   
   const fetchGitHubData = async (repo: string) => {
     if (cache.has(repo)) {
       return cache.get(repo);
     }
     
     const data = await fetch(`https://api.github.com/repos/${repo}`);
     cache.set(repo, data);
     return data;
   };
   ```

### CORS 错误

**问题**: 跨域请求被阻止

**解决方案**:

1. **使用代理**:
   ```javascript
   // rsbuild.config.mjs
   export default {
     server: {
       proxy: {
         '/api': {
           target: 'https://api.github.com',
           changeOrigin: true,
           pathRewrite: { '^/api': '' },
         },
       },
     },
   };
   ```

## 样式问题

### CSS 样式不生效

**问题**: 自定义样式无法覆盖默认样式

**解决方案**:

1. **检查 CSS 优先级**:
   ```css
   /* 增加选择器权重 */
   .project-card.custom-style {
     background-color: red !important;
   }
   ```

2. **使用 CSS Modules**:
   ```typescript
   import styles from './Component.module.css';
   
   <div className={styles.customClass}>
   ```

### 响应式布局问题

**问题**: 移动端显示异常

**解决方案**:

1. **添加 viewport meta 标签**:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **使用相对单位**:
   ```css
   .container {
     width: 100%;
     max-width: 1200px;
     padding: 0 1rem;
   }
   ```

## 调试技巧

### 开发者工具使用

1. **React Developer Tools**:
   - 安装 React DevTools 浏览器扩展
   - 检查组件状态和 props

2. **性能分析**:
   ```javascript
   // 性能监控
   console.time('render');
   // 渲染逻辑
   console.timeEnd('render');
   ```

3. **网络请求调试**:
   - 使用浏览器 Network 面板
   - 检查 API 请求和响应

### 日志记录

```typescript
// 开发环境日志
const isDev = process.env.NODE_ENV === 'development';

const log = {
  info: (message: string, data?: any) => {
    if (isDev) {
      console.log(`[INFO] ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    if (isDev) {
      console.error(`[ERROR] ${message}`, error);
    }
  },
};
```

### 错误边界

```typescript
// src/components/ErrorBoundary.tsx
class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if ((this.state as any).hasError) {
      return <h1>出现了错误，请刷新页面重试。</h1>;
    }

    return this.props.children;
  }
}
```

## 获取帮助

如果以上解决方案都无法解决你的问题，可以通过以下方式获取帮助：

### 1. 检查官方文档
- [React 官方文档](https://react.dev/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Rsbuild 官方文档](https://rsbuild.dev/)

### 2. 社区支持
- [Stack Overflow](https://stackoverflow.com/)
- [GitHub Issues](https://github.com/facebook/react/issues)
- [React 中文社区](https://react.docschina.org/)

### 3. 调试清单

在寻求帮助前，请确保已经：

- [ ] 检查了控制台错误信息
- [ ] 尝试了重启开发服务器
- [ ] 清理了缓存和 node_modules
- [ ] 检查了网络连接
- [ ] 验证了配置文件
- [ ] 测试了在不同浏览器中的表现

### 4. 问题报告模板

```markdown
## 问题描述
简要描述遇到的问题

## 复现步骤
1. 执行了什么操作
2. 期望的结果
3. 实际的结果

## 环境信息
- 操作系统: 
- Node.js 版本: 
- 浏览器版本: 
- 项目版本: 

## 错误信息
粘贴完整的错误信息或截图

## 已尝试的解决方案
列出已经尝试过的解决方法
```

---

**记住：大多数问题都有解决方案，保持耐心，仔细阅读错误信息，逐步排查问题！🔧**