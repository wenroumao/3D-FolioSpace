// 导入React钩子函数
import { useEffect, useRef, useState } from 'react';
// 导入地图数据配置
import { mapData } from '../../constants/projectsData';
// 导入幻灯片ID配置
import { SLIDE_IDS } from '../../constants/slideIds';
// 导入样式文件
import './MiniMap.css';

/**
 * 导航项组件的属性接口
 */
interface NavItemProps {
  node: (typeof mapData)[0]; // 地图节点数据
  isActive: boolean;         // 是否为当前活动项
  onClick: () => void;       // 点击事件处理函数
}

/**
 * 导航项组件
 * 渲染单个导航项，包含图标和名称
 */
const NavItem: React.FC<NavItemProps> = ({ node, isActive, onClick }) => {
  // 根据是否活动状态动态设置CSS类名
  const itemClass = `nav-item ${isActive ? 'active' : ''}`;

  return (
    <div className={itemClass} onClick={onClick} data-step-id={node.id}>
      {/* 导航项图标 */}
      <span className="nav-icon">
        <i className={node.icon}></i>
      </span>
      {/* 导航项文本 */}
      <span className="nav-text">{node.name}</span>
    </div>
  );
};

/**
 * 迷你地图组件
 * 提供项目导航功能，显示当前位置和进度，支持快速跳转
 */
const MiniMap = () => {
  // 控制地图显示/隐藏状态
  const [isVisible, setIsVisible] = useState(false);
  // 当前活动的节点ID
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(
    location.hash.slice(1)
      ? (location.hash.slice(1) as string).replace('/', '')
      : SLIDE_IDS.TITLE,
  );
  // 迷你地图容器的引用
  const miniMapRef = useRef<HTMLDivElement>(null);
  // 导航内容容器的引用
  const navContentRef = useRef<HTMLDivElement>(null);

  /**
   * 监听幻灯片切换事件
   * 当用户切换幻灯片时，更新活动节点ID
   */
  useEffect(() => {
    const handleStepChange = (event: Event) => {
      const stepId = (event.target as Element).id;
      setActiveNodeId(stepId);
    };

    // 添加impress.js的步骤进入事件监听器
    document.addEventListener('impress:stepenter', handleStepChange);

    // 清理函数：移除事件监听器
    return () => {
      document.removeEventListener('impress:stepenter', handleStepChange);
    };
  }, []);

  /**
   * 自动滚动到当前活动项目
   * 当活动节点或可见性状态改变时触发
   */
  useEffect(() => {
    if (!navContentRef.current || !isVisible) return;

    const activeElement = navContentRef.current.querySelector(
      `[data-step-id="${activeNodeId}"]`,
    ) as HTMLElement;
    if (activeElement) {
      const container = navContentRef.current;
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;
      const scrollTop = container.scrollTop;

      // 计算元素是否在可视区域内
      const isElementVisible =
        elementTop >= scrollTop &&
        elementTop + elementHeight <= scrollTop + containerHeight;

      // 如果元素不在可视区域内，则滚动到该元素
      if (!isElementVisible) {
        scrollToActiveItem();
      }
    }
  }, [activeNodeId, isVisible]);

  /**
   * 处理导航节点点击事件
   * @param nodeId - 目标节点ID
   */
  const handleNodeClick = (nodeId: string) => {
    const currentIndex = mapData.findIndex((item) => item.id === activeNodeId);
    const targetIndex = mapData.findIndex((item) => item.id === nodeId);

    // 更新活动节点ID
    setActiveNodeId(nodeId);

    if (window.impress) {
      // 如果距离较远，添加平滑过渡效果
      const distance = Math.abs(targetIndex - currentIndex);
      if (distance > 1) {
        // 对于远距离跳转，使用较慢的过渡
        const impressInstance = window.impress();
        const originalDuration = document
          .getElementById('impress')
          ?.getAttribute('data-transition-duration');
        document
          .getElementById('impress')
          ?.setAttribute('data-transition-duration', '1500');

        impressInstance.goto(nodeId);

        // 恢复原始过渡时间
        setTimeout(() => {
          if (originalDuration) {
            document
              .getElementById('impress')
              ?.setAttribute('data-transition-duration', originalDuration);
          }
        }, 1500);
      } else {
        // 短距离跳转使用默认过渡时间
        window.impress().goto(nodeId);
      }
    }
  };

  /**
   * 滚动到活动项目的函数
   * 将当前活动的导航项滚动到容器中央
   */
  const scrollToActiveItem = () => {
    if (!navContentRef.current) return;

    const activeElement = navContentRef.current.querySelector(
      `[data-step-id="${activeNodeId}"]`,
    ) as HTMLElement;
    if (activeElement) {
      const container = navContentRef.current;
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.offsetHeight;

      // 计算滚动位置，使活动元素居中显示
      const targetScrollTop =
        elementTop - containerHeight / 2 + elementHeight / 2;

      // 平滑滚动
      container.scrollTo({
        top: Math.max(0, targetScrollTop),
        behavior: 'smooth',
      });
    }
  };

  /**
   * 监听迷你地图切换事件
   * 响应工具栏中的地图切换按钮
   */
  useEffect(() => {
    const handleToggleMiniMap = () => {
      const newVisibleState = !isVisible;
      setIsVisible(newVisibleState);

      // 如果地图变为可见，延迟滚动到活动项
      if (newVisibleState) {
        setTimeout(() => {
          scrollToActiveItem();
        }, 500); // 等待显示动画完成
      }
    };

    // 添加自定义事件监听器
    window.addEventListener('toggleMiniMap', handleToggleMiniMap);

    // 清理函数：移除事件监听器
    return () => {
      window.removeEventListener('toggleMiniMap', handleToggleMiniMap);
    };
  }, [isVisible]);

  /**
   * 获取导航上下文信息
   * @returns 包含当前索引的对象
   */
  const getNavigationContext = () => {
    const currentIndex = mapData.findIndex((item) => item.id === activeNodeId);
    return { currentIndex };
  };

  /**
   * 获取可见的导航项
   * @returns 所有地图数据项
   */
  const getVisibleItems = () => {
    return mapData;
  };

  // 获取当前导航上下文
  const { currentIndex } = getNavigationContext();

  return (
    <div
      className={`nav-list ${isVisible ? 'visible' : 'hidden'}`} // 动态CSS类控制显示/隐藏
      id="miniMap"
      ref={miniMapRef}
    >
      {/* 导航头部：显示地图图标和进度信息 */}
      <div className="nav-header">
        <span>
          <i className="fas fa-map"></i> {/* 地图图标 */}
          <span className="nav-progress">
            {currentIndex + 1}/{mapData.length} {/* 当前进度 */}
          </span>
        </span>
      </div>

      {/* 导航内容区域：显示所有导航项 */}
      <div className="nav-content" ref={navContentRef}>
        {getVisibleItems().map((node) => (
          <NavItem
            key={node.id}
            node={node}
            isActive={activeNodeId === node.id} // 判断是否为活动项
            onClick={() => handleNodeClick(node.id)} // 点击处理函数
          />
        ))}
      </div>
    </div>
  );
};

export default MiniMap;
