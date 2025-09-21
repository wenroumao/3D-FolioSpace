// 导入项目类型定义
import { Project } from '../../types/project';
// 导入项目卡片组件
import ProjectCard from '../ProjectCard/ProjectCard';

/**
 * 项目幻灯片组件的属性接口
 */
interface ProjectSlideProps {
  project: Project; // 项目数据对象
}

/**
 * 项目幻灯片组件
 * 为每个项目创建一个3D空间中的幻灯片，包含项目详细信息
 * @param project - 项目数据对象
 */
const ProjectSlide = ({ project }: ProjectSlideProps) => {
  // 从项目数据中解构出位置信息
  const { position } = project;

  // 构建幻灯片的3D位置和旋转属性
  const slideProps: { [key: string]: string | number } = {
    'data-x': position.x,     // 3D空间X轴位置
    'data-y': position.y,     // 3D空间Y轴位置
    'data-z': position.z || 0, // 3D空间Z轴位置，默认为0
  };

  // 如果定义了Z轴旋转角度，则添加到属性中
  if (position.rotate) {
    slideProps['data-rotate'] = position.rotate;
  }
  // 如果定义了Y轴旋转角度，则添加到属性中
  if (position.rotateY) {
    slideProps['data-rotate-y'] = position.rotateY;
  }

  return (
    <div 
      id={project.id}           // 幻灯片唯一标识符
      className="step"          // impress.js必需的CSS类
      {...slideProps}           // 展开3D位置和旋转属性
    >
      {/* 渲染项目卡片组件 */}
      <ProjectCard project={project} />
    </div>
  );
};

export default ProjectSlide;
