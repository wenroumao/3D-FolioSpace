// 导入幻灯片ID和位置配置
import { SLIDE_IDS, SLIDE_POSITIONS } from '../../constants/slideIds';
// 导入用户配置信息
import { USER_CONFIG } from '../../constants/userConfig';
// 导入模糊淡入动画组件
import { BlurFade } from '../ui/blur-fade';
// 导入样式文件
import './TitleSlide.css';

/**
 * 标题幻灯片组件
 * 展示个人介绍、头像、简介和社交链接的首页幻灯片
 */
const TitleSlide = () => {
  /**
   * 处理社交链接点击事件
   * @param url - 链接地址
   * @param type - 链接类型
   */
  const handleSocialClick = (url: string, type: string) => {
    // 在新窗口中打开链接，增加安全性
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /**
   * 处理下一步导航点击事件
   * @param e - 鼠标点击事件
   */
  const handleNext = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault(); // 阻止默认行为
    e.stopPropagation(); // 阻止事件冒泡
    // 如果impress.js已初始化，则导航到下一张幻灯片
    if (window.impress) {
      window.impress().next()
    }
  };

  return (
    <div
      id={SLIDE_IDS.TITLE} // 幻灯片唯一标识符
      className="step title-slide" // CSS类名，step是impress.js必需的
      data-x={SLIDE_POSITIONS.TITLE.x} // 3D空间X轴位置
      data-y={SLIDE_POSITIONS.TITLE.y} // 3D空间Y轴位置
      data-z={SLIDE_POSITIONS.TITLE.z} // 3D空间Z轴位置
    >
      <div className="profile-container">
        {/* 头部区域：包含问候语和头像 */}
        <div className="header-section">
          {/* 问候语部分，带有淡入动画 */}
          <BlurFade delay={0.2} inView>
            <div className="greeting-section">
              <h1 className="profile-name">
                Hey 👋, I'm <span className="cursor-target">Wenrou Mao</span>!
              </h1>
            </div>
          </BlurFade>
          {/* 头像部分，带有淡入动画 */}
          <BlurFade delay={0.1} inView>
            <div className="avatar-section">
              <img
                src={USER_CONFIG.AVATAR_URL} // 头像图片地址
                alt={`${USER_CONFIG.NAME} Avatar`} // 无障碍访问描述
                className="profile-avatar cursor-target" // 头像样式类
              />
              {/* 在线状态指示器 */}
              <div className="status-indicator"></div>
            </div>
          </BlurFade>
        </div>

        {/* 个人简介区域 */}
        <div className="bio-section">
          {/* 遍历用户配置中的简介行，每行都有独立的淡入动画 */}
          {USER_CONFIG.BIO.map((line, index) => (
            <BlurFade key={index} delay={0.4 + index * 0.1} inView>
              <p className="bio-line">{line}</p>
            </BlurFade>
          ))}
        </div>

        {/* 社交链接区域 */}
        <BlurFade delay={0.7} inView>
          <div className="social-links">
            {/* 遍历用户配置中的联系方式链接 */}
            {USER_CONFIG.CONTACT_LINKS.map((link, index) => (
              <button
                key={index}
                onClick={() => handleSocialClick(link.url || '', link.type)} // 点击处理函数
                className={`social-link cursor-target ${link.type === 'wechat' ? 'wechat' : ''}`} // 动态CSS类
                // title={link.text} // 悬停提示文本（已注释）
              >
                <i className={link.icon}></i> {/* 社交平台图标 */}
              </button>
            ))}
          </div>
        </BlurFade>

        {/* 滚动提示区域 */}
        <BlurFade delay={0.9} inView>
          <div className="scroll-hint" onClick={handleNext}>
            <i className="fas fa-chevron-down"></i> {/* 向下箭头图标 */}
            <span>探索我的作品</span> {/* 提示文本 */}
          </div>
        </BlurFade>
      </div>
    </div>
  );
};

export default TitleSlide;
