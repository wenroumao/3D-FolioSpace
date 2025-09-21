// 导入React钩子函数
import { useEffect, useRef, useState } from 'react';
// 导入项目数据映射
import { mapData } from '../../constants/projectsData';
// 导入幻灯片ID常量
import { SLIDE_IDS } from '../../constants/slideIds';
// 导入样式文件
import './Toolbar.css';

/**
 * 工具栏组件
 * 提供幻灯片导航、自动播放、主题切换、小地图等功能
 * 包含前进、后退、总览、自动播放、小地图显示/隐藏、主题切换等按钮
 */
const Toolbar = () => {
  // 自动播放状态
  const [isAutoplay, setIsAutoplay] = useState(false);
  // 小地图可见性状态
  const [isMiniMapVisible, setIsMiniMapVisible] = useState(false);
  // 主题状态（浅色/深色）
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  // 自动播放定时器引用
  const autoplayTimerRef = useRef<number | null>(null);
  // 自动播放间隔时间（毫秒）
  const autoplayIntervalRef = useRef<number>(3000);

  /**
   * 初始化主题设置
   * 从localStorage读取保存的主题设置并应用
   */
  useEffect(() => {
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  /**
   * 组件卸载时清理定时器
   */
  useEffect(() => {
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, []);

  /**
   * 监听小地图切换事件
   */
  useEffect(() => {
    /**
     * 处理小地图切换事件
     */
    const handleMiniMapToggle = () => {
      setIsMiniMapVisible((prev) => !prev);
    };

    // 添加小地图切换事件监听器
    window.addEventListener('toggleMiniMap', handleMiniMapToggle);

    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener('toggleMiniMap', handleMiniMapToggle);
    };
  }, []);

  /**
   * 应用主题设置
   * @param newTheme - 新的主题类型
   */
  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    // 设置根元素的主题属性
    root.setAttribute('data-theme', newTheme);
    // 保存主题设置到localStorage
    localStorage.setItem('theme', newTheme);

    // 根据主题设置颜色
    const themeColor = newTheme === 'light' ? '#F0F2FF' : '#0A0A0F';
    // 获取各种主题颜色相关的meta标签
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const metaAppleStatusBar = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
    const metaMsNavButton = document.querySelector('meta[name="msapplication-navbutton-color"]');

    // 更新各种meta标签的颜色设置
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', themeColor);
    }
    if (metaAppleStatusBar) {
      metaAppleStatusBar.setAttribute('content', themeColor);
    }
    if (metaMsNavButton) {
      metaMsNavButton.setAttribute('content', themeColor);
    }
  };

  /**
   * 获取当前幻灯片索引
   * @returns 当前幻灯片在mapData中的索引
   */
  const getCurrentSlideIndex = (): number => {
    // 查找当前激活的幻灯片元素
    const activeSlide =
      document.querySelector('.step.present') ||
      document.querySelector('.step.active');
    if (activeSlide) {
      const currentId = activeSlide.id;
      // 在mapData中查找对应的索引
      return mapData.findIndex((item) => item.id === currentId);
    }
    return 0;
  };

  /**
   * 跳转到下一张幻灯片
   */
  const goToNextSlide = () => {
    const currentIndex = getCurrentSlideIndex();
    // 计算下一张幻灯片索引（循环）
    const nextIndex = (currentIndex + 1) % mapData.length;
    const nextSlideId = mapData[nextIndex].id;

    // 使用impress.js API跳转到指定幻灯片
    if (window.impress) {
      window.impress().goto(nextSlideId);
    }
  };

  /**
   * 开始自动播放
   */
  const startAutoplay = () => {
    // 清除现有定时器
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    // 设置新的定时器
    autoplayTimerRef.current = setInterval(() => {
      goToNextSlide();
    }, autoplayIntervalRef.current);
  };

  /**
   * 停止自动播放
   */
  const stopAutoplay = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  };

  /**
   * 处理上一张幻灯片按钮点击
   */
  const handlePrev = () => {
    if (window.impress) {
      window.impress().prev();
    }
  };

  /**
   * 处理下一张幻灯片按钮点击
   */
  const handleNext = () => {
    if (window.impress) {
      window.impress().next();
    }
  };

  /**
   * 处理总览按钮点击
   */
  const handleOverview = () => {
    if (window.impress) {
      window.impress().goto(SLIDE_IDS.OVERVIEW);
    }
  };

  /**
   * 切换自动播放状态
   */
  const toggleAutoplay = () => {
    const newAutoplayState = !isAutoplay;
    setIsAutoplay(newAutoplayState);

    if (newAutoplayState) {
      startAutoplay();
      console.log('Autoplay enabled');
    } else {
      stopAutoplay();
      console.log('Autoplay disabled');
    }
  };

  /**
   * 切换小地图显示状态
   */
  const toggleMiniMap = () => {
    // 派发自定义事件通知其他组件
    const event = new CustomEvent('toggleMiniMap');
    window.dispatchEvent(event);
  };

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  /**
   * 获取主题图标类名
   * @returns 对应主题的图标类名
   */
  const getThemeIcon = () => {
    return theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  };

  /**
   * 获取主题切换按钮的提示文本
   * @returns 主题切换提示文本
   */
  const getThemeTitle = () => {
    return theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
  };

  return (
    <div className="toolbar"> {/* 工具栏容器 */}
      {/* 上一张幻灯片按钮 */}
      <button
        className="toolbar-btn cursor-target"
        onClick={handlePrev}
        data-tooltip="Previous"
      >
        <i className="fas fa-chevron-left"></i>
      </button>
      {/* 下一张幻灯片按钮 */}
      <button
        className="toolbar-btn cursor-target"
        onClick={handleNext}
        data-tooltip="Next"
      >
        <i className="fas fa-chevron-right"></i>
      </button>
      {/* 自动播放切换按钮 */}
      <button
        className={`toolbar-btn cursor-target ${isAutoplay ? 'autoplay-active' : ''}`}
        onClick={toggleAutoplay}
        data-tooltip={isAutoplay ? 'Pause autoplay' : 'Start autoplay'}
      >
        <i className={`fas ${isAutoplay ? 'fa-pause' : 'fa-play'}`}></i>
        {isAutoplay && <div className="autoplay-indicator"></div>} {/* 自动播放指示器 */}
      </button>
      {/* 总览按钮 */}
      <button
        className="toolbar-btn cursor-target"
        onClick={handleOverview}
        data-tooltip="Overview"
      >
        <i className="fas fa-th-large"></i>
      </button>
      {/* 小地图切换按钮 */}
      <button
        className={`toolbar-btn cursor-target ${isMiniMapVisible ? 'minimap-active' : ''}`}
        onClick={toggleMiniMap}
        data-tooltip={isMiniMapVisible ? 'Hide minimap' : 'Show minimap'}
      >
        <i className="fas fa-map"></i>
        {isMiniMapVisible && <div className="minimap-indicator"></div>} {/* 小地图激活指示器 */}
      </button>
      {/* 主题切换按钮 */}
      <button
        className="toolbar-btn theme-btn cursor-target"
        onClick={toggleTheme}
        data-tooltip={getThemeTitle()}
      >
        <i className={getThemeIcon()}></i>
        <div className="theme-indicator"></div> {/* 主题指示器 */}
      </button>
    </div>
  );
};

export default Toolbar;
