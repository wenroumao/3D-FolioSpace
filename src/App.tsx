import { useEffect } from 'react';
import './App.css';
// 导入各个组件
import MiniMap from './components/MiniMap/MiniMap';
import OverviewSlide from './components/OverviewSlide/OverviewSlide';
import ProgressBar from './components/ProgressBar/ProgressBar';
import ProjectSlide from './components/ProjectSlide/ProjectSlide';
import TitleSlide from './components/TitleSlide/TitleSlide';
import Toolbar from './components/Toolbar/Toolbar';
import TargetCursor from './components/ui/target-cursor';
// 导入配置和数据
import { IMPRESS_CONFIG } from './constants/impressConfig';
import { projectsData } from './constants/projectsData';
import { SLIDE_IDS } from './constants/slideIds';

/**
 * 主应用组件
 * 负责初始化3D演示环境，管理幻灯片状态和事件监听
 */
function App() {
  useEffect(() => {
    // 标记是否处于总览模式
    let isOverviewMode = false;

    /**
     * 处理幻灯片进入事件
     * 当用户导航到新的幻灯片时触发
     * @param event - 幻灯片进入事件
     */
    const handleStepEnter = (event: Event) => {
      const currentStepId = (event.target as Element).id;

      // 如果进入总览页面
      if (currentStepId === SLIDE_IDS.OVERVIEW) {
        isOverviewMode = true;
        resetAllStepsOpacity(); // 重置所有幻灯片透明度
      } else {
        isOverviewMode = false;
        updateSlideOpacity(currentStepId); // 更新当前幻灯片透明度
      }
    };

    /**
     * 处理幻灯片离开事件
     * 当用户离开当前幻灯片时触发
     * @param event - 幻灯片离开事件
     */
    const handleStepLeave = (event: Event) => {
      if (!isOverviewMode) {
        const leavingStepId = (event.target as Element).id;
        const leavingStep = document.getElementById(leavingStepId);
        
        // 为离开的幻灯片添加过渡动画
        if (leavingStep && leavingStepId !== SLIDE_IDS.OVERVIEW) {
          leavingStep.classList.add('transitioning');
          // 1秒后移除过渡类
          setTimeout(() => {
            leavingStep.classList.remove('transitioning');
          }, 1000);
        }
      }
    };

    /**
     * 更新幻灯片透明度
     * 高亮当前活跃的幻灯片，淡化其他幻灯片
     * @param activeStepId - 当前活跃的幻灯片ID
     */
    const updateSlideOpacity = (activeStepId: string) => {
      // 如果是总览页面，不进行透明度更新
      if (activeStepId === SLIDE_IDS.OVERVIEW) {
        return;
      }

      const allSteps = document.querySelectorAll('.step');

      allSteps.forEach((step) => {
        const stepElement = step as HTMLElement;

        // 移除过渡类
        stepElement.classList.remove('transitioning');

        if (stepElement.id === activeStepId) {
          // 当前活跃幻灯片：完全不透明，可交互
          stepElement.style.opacity = '1';
          stepElement.style.transition = 'opacity 0.8s ease-out';
          stepElement.style.pointerEvents = 'auto';
        } else {
          // 非活跃幻灯片：半透明，不可交互
          stepElement.style.opacity = '0.4';
          stepElement.style.transition = 'opacity 0.6s ease-out';
          stepElement.style.pointerEvents = 'none';
        }
      });
    };

    /**
     * 重置所有幻灯片透明度
     * 在总览模式下使所有幻灯片完全可见
     */
    const resetAllStepsOpacity = () => {
      const allSteps = document.querySelectorAll(
        `.step:not(#${SLIDE_IDS.OVERVIEW})`,
      );

      allSteps.forEach((step) => {
        const stepElement = step as HTMLElement;
        // 所有幻灯片完全不透明，可交互
        stepElement.style.opacity = '1';
        stepElement.style.transition = 'opacity 0.3s ease';
        stepElement.style.pointerEvents = 'auto';
      });
    };

    /**
     * 处理总览模式变化
     * 监听impress元素的class变化来判断是否进入/退出总览模式
     */
    const handleOverviewChange = () => {
      const impressElement = document.getElementById('impress');
      if (impressElement) {
        isOverviewMode = impressElement.classList.contains(
          'impress-on-overview',
        );

        if (isOverviewMode) {
          resetAllStepsOpacity(); // 总览模式：显示所有幻灯片
        } else {
          // 非总览模式：只高亮当前活跃幻灯片
          const activeStep = document.querySelector('.step.active');
          if (activeStep) {
            updateSlideOpacity(activeStep.id);
          }
        }
      }
    };

    /**
     * 更新Impress.js画布尺寸
     * 根据当前窗口大小动态调整画布尺寸
     */
    const updateImpressDimensions = () => {
      const impressElement = document.getElementById('impress');
      if (impressElement) {
        impressElement.setAttribute('data-width', IMPRESS_CONFIG.WIDTH);
        impressElement.setAttribute('data-height', IMPRESS_CONFIG.HEIGHT);
      }
    };

    /**
     * 处理窗口大小变化
     * 当窗口大小改变时重新计算画布尺寸
     */
    const handleResize = () => {
      updateImpressDimensions();
    };

    /**
     * 初始化透明度设置
     * 页面加载时设置初始的幻灯片透明度状态
     */
    const initializeOpacity = () => {
      const activeStep = document.querySelector('.step.active');
      if (activeStep) {
        updateSlideOpacity(activeStep.id);
      }
    };

    // 添加事件监听器
    document.addEventListener('impress:stepenter', handleStepEnter);
    document.addEventListener('impress:stepleave', handleStepLeave);
    window.addEventListener('resize', handleResize);

    // 监听impress元素的class变化以检测总览模式
    const impressElement = document.getElementById('impress');
    let observer: MutationObserver | null = null;

    if (impressElement) {
      observer = new MutationObserver(handleOverviewChange);
      observer.observe(impressElement, {
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    // 初始化Impress.js
    if (window.impress) {
      window.impress().init();
    }

    // 执行初始化设置
    initializeOpacity();
    updateImpressDimensions();

    // 清理函数：移除事件监听器和观察器
    return () => {
      document.removeEventListener('impress:stepenter', handleStepEnter);
      document.removeEventListener('impress:stepleave', handleStepLeave);
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className="App">
      {/* 进度条组件 */}
      <ProgressBar />

      {/* Impress.js 3D演示容器 */}
      <div
        id="impress"
        data-transition-duration={IMPRESS_CONFIG.TRANSITION_DURATION}
        data-max-scale={IMPRESS_CONFIG.MAX_SCALE}
        data-min-scale={IMPRESS_CONFIG.MIN_SCALE}
        data-perspective={IMPRESS_CONFIG.PERSPECTIVE}
        data-width={IMPRESS_CONFIG.WIDTH}
        data-height={IMPRESS_CONFIG.HEIGHT}
      >
        {/* 标题幻灯片 */}
        <TitleSlide />

        {/* 动态渲染所有项目幻灯片 */}
        {projectsData.map((project) => (
          <ProjectSlide key={project.id} project={project} />
        ))}

        {/* 总览幻灯片 */}
        <OverviewSlide />
      </div>

      {/* 导航小地图 */}
      <MiniMap />
      
      {/* 工具栏 */}
      <Toolbar />

      {/* 自定义光标 */}
      <TargetCursor spinDuration={2} hideDefaultCursor={true} />
    </div>
  );
}

export default App;
