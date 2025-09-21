// 导入React钩子函数
import { useCallback, useEffect, useRef, useState } from 'react';
// 导入样式文件
import './target-cursor.css';

/**
 * 目标光标组件的属性接口
 */
interface TargetCursorProps {
  targetSelector?: string;    // 目标元素选择器，默认为'.cursor-target'
  hideDefaultCursor?: boolean; // 是否隐藏默认光标，默认为true
  spinDuration?: number;      // 旋转动画持续时间
  spinEase?: string;          // 旋转动画缓动函数
}

/**
 * 目标光标组件
 * 提供自定义光标效果，当鼠标悬停在目标元素上时显示瞄准框效果
 * 支持跟随鼠标移动和目标元素高亮显示
 */
const TargetCursor = ({
  targetSelector = '.cursor-target',
  hideDefaultCursor = true,
}: TargetCursorProps) => {
  // 光标DOM元素引用
  const cursorRef = useRef<HTMLDivElement | null>(null);
  // 光标位置状态
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  // 是否正在瞄准目标状态
  const [isTargeting, setIsTargeting] = useState(false);
  // 目标元素边界信息
  const [targetBounds, setTargetBounds] = useState<DOMRect | null>(null);
  // 光标是否可见状态
  const [isVisible, setIsVisible] = useState(false);

  /**
   * 移动光标位置
   * @param x - X轴坐标
   * @param y - Y轴坐标
   */
  const moveCursor = useCallback((x: number, y: number) => {
    setCursorPos({ x, y });
  }, []);

  /**
   * 设置事件监听器和光标行为
   */
  useEffect(() => {
    // 保存原始光标样式
    const originalCursor = document.body.style.cursor;
    // 如果需要隐藏默认光标，则设置为none
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    // 当前活动的目标元素
    let activeTarget: HTMLElement | null = null;

    /**
     * 鼠标移动事件处理函数
     * @param e - 鼠标事件对象
     */
    const moveHandler = (e: MouseEvent) => {
      // 更新光标位置
      moveCursor(e.clientX, e.clientY);
      // 如果光标不可见，则设置为可见
      if (!isVisible) {
        setIsVisible(true);
      }
    };

    /**
     * 鼠标进入元素事件处理函数
     * @param e - 鼠标事件对象
     */
    const enterHandler = (e: MouseEvent) => {
      const directTarget = e.target as HTMLElement;

      // 查找所有匹配目标选择器的父元素
      const allTargets: HTMLElement[] = [];
      let current: HTMLElement | null = directTarget;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) {
          allTargets.push(current);
        }
        current = current.parentElement;
      }

      // 获取最近的目标元素
      const target = allTargets[0] || null;
      if (!target) return;

      // 如果已经是活动目标，则不重复处理
      if (activeTarget === target) return;

      // 设置新的活动目标
      activeTarget = target;
      setIsTargeting(true);
      setTargetBounds(target.getBoundingClientRect());

      /**
       * 鼠标离开目标元素的处理函数
       */
      const leaveHandler = () => {
        activeTarget = null;
        setIsTargeting(false);
        setTargetBounds(null);
        target.removeEventListener('mouseleave', leaveHandler);
      };

      // 添加鼠标离开事件监听器
      target.addEventListener('mouseleave', leaveHandler);
    };

    // 添加全局事件监听器
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseover', enterHandler, { passive: true });

    // 清理函数：移除事件监听器并恢复原始光标
    return () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseover', enterHandler);
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, moveCursor, hideDefaultCursor, isVisible]);

  /**
   * 计算瞄准框四个角的位置
   * @returns 四个角的相对位置坐标，如果没有目标则返回null
   */
  const getCornerPositions = () => {
    if (!targetBounds) return null;

    // 角标大小和边框宽度
    const cornerSize = 12;
    const borderWidth = 3;

    return {
      // 左上角位置
      topLeft: {
        x: targetBounds.left - cursorPos.x - borderWidth,
        y: targetBounds.top - cursorPos.y - borderWidth,
      },
      // 右上角位置
      topRight: {
        x: targetBounds.right - cursorPos.x + borderWidth - cornerSize,
        y: targetBounds.top - cursorPos.y - borderWidth,
      },
      // 右下角位置
      bottomRight: {
        x: targetBounds.right - cursorPos.x + borderWidth - cornerSize,
        y: targetBounds.bottom - cursorPos.y + borderWidth - cornerSize,
      },
      // 左下角位置
      bottomLeft: {
        x: targetBounds.left - cursorPos.x - borderWidth,
        y: targetBounds.bottom - cursorPos.y + borderWidth - cornerSize,
      },
    };
  };

  // 获取角标位置
  const cornerPositions = getCornerPositions();

  return (
    <div
      ref={cursorRef}
      className="target-cursor" // 光标容器样式类
      style={{
        // 根据鼠标位置定位光标，居中对齐
        transform: `translate(${cursorPos.x}px, ${cursorPos.y}px) translate(-50%, -50%)`,
        // 根据可见状态设置透明度
        opacity: isVisible ? 1 : 0,
        // 透明度变化的过渡动画
        transition: 'opacity 0.2s ease',
      }}
    >
      {/* 光标中心点，非瞄准状态时旋转 */}
      <div
        className={`target-cursor-center ${!isTargeting ? 'spinning' : ''}`}
      />
      {/* 左上角标 */}
      <div
        className="target-cursor-corner target-cursor-corner--top-left"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.topLeft.x}px, ${cornerPositions.topLeft.y}px)`
              : undefined,
        }}
      />
      {/* 右上角标 */}
      <div
        className="target-cursor-corner target-cursor-corner--top-right"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.topRight.x}px, ${cornerPositions.topRight.y}px)`
              : undefined,
        }}
      />
      {/* 右下角标 */}
      <div
        className="target-cursor-corner target-cursor-corner--bottom-right"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.bottomRight.x}px, ${cornerPositions.bottomRight.y}px)`
              : undefined,
        }}
      />
      {/* 左下角标 */}
      <div
        className="target-cursor-corner target-cursor-corner--bottom-left"
        style={{
          transform:
            isTargeting && cornerPositions
              ? `translate(${cornerPositions.bottomLeft.x}px, ${cornerPositions.bottomLeft.y}px)`
              : undefined,
        }}
      />
    </div>
  );
};

export default TargetCursor;
