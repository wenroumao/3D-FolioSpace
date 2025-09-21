// 导入React钩子函数
import { useEffect, useState } from 'react';
// 导入样式文件
import './ProgressBar.css';

/**
 * 进度条组件
 * 显示用户在幻灯片演示中的浏览进度
 * 根据当前幻灯片位置动态更新进度条宽度
 */
const ProgressBar = () => {
  // 进度百分比状态，范围0-100
  const [progress, setProgress] = useState(0);

  /**
   * 监听幻灯片切换事件并更新进度
   */
  useEffect(() => {
    /**
     * 处理幻灯片切换事件
     * @param event - impress.js的步骤进入事件
     */
    const handleStepChange = (event: Event) => {
      // 获取所有幻灯片元素
      const allSteps = Array.from(document.querySelectorAll('.step'));
      // 找到当前幻灯片在所有幻灯片中的索引
      const currentStep = allSteps.indexOf(event.target as Element);
      // 计算进度百分比（最后一张幻灯片为100%）
      const progressPercentage = (currentStep / (allSteps.length - 1)) * 100;
      // 更新进度状态
      setProgress(progressPercentage);
    };

    // 添加impress.js的步骤进入事件监听器
    document.addEventListener('impress:stepenter', handleStepChange);

    // 清理函数：移除事件监听器
    return () => {
      document.removeEventListener('impress:stepenter', handleStepChange);
    };
  }, []);

  return (
    <div
      className="progress-bar"        // 进度条样式类
      id="progress"                   // 进度条唯一标识符
      style={{ width: `${progress}%` }} // 动态设置进度条宽度
    />
  );
};

export default ProgressBar;
