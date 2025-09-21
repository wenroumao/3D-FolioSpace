// 导入React钩子函数和memo优化组件
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
// 导入GitHub令牌配置
import { GITHUB_TOKEN } from '../../constants/userConfig';
// 导入项目相关类型定义
import { GitHubRepoInfo, Link, Project } from '../../types/project';
// 导入样式文件
import './ProjectCard.css';

/**
 * 格式化数字显示
 * @param count - 需要格式化的数字
 * @returns 格式化后的字符串（如1000 -> 1.0k）
 */
const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

/**
 * 格式化日期显示
 * @param dateString - ISO日期字符串
 * @returns 本地化的日期字符串
 */
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * GitHub统计信息组件
 * 显示仓库的语言、创建时间等信息
 */
const GitHubStats = memo(
  ({
    repoInfo,
    loading,
  }: {
    repoInfo: GitHubRepoInfo | null; // GitHub仓库信息
    loading: boolean; // 加载状态
  }) => {
    return (
      <div className={`github-stats animate`}>
        {loading ? (
          // 加载中状态
          <div className="loading-stats">
            <i className="fas fa-spinner fa-spin"></i>
            <span>Loading repository info...</span>
          </div>
        ) : repoInfo ? (
          // 显示仓库元信息
          <div className="repo-meta">
            {repoInfo.language && (
              <div className="meta-item cursor-target">
                <span>{repoInfo.language}</span> {/* 编程语言 */}
              </div>
            )}
            <div className="meta-item cursor-target">
              <span>Created {formatDate(repoInfo.createdAt)}</span> {/* 创建时间 */}
            </div>
          </div>
        ) : (
          // 无法获取仓库信息时的提示
          <div className="no-repo-info">
            <i className="fas fa-info-circle"></i>
            <span>GitHub repository info unavailable</span>
          </div>
        )}
      </div>
    );
  },
);

// 设置组件显示名称用于调试
GitHubStats.displayName = 'GitHubStats';

/**
 * 项目链接组件
 * 显示项目的演示链接和代码链接
 */
const ProjectLinks = memo(
  ({
    links,
    repoInfo,
    loading,
  }: {
    links: Link[]; // 项目链接数组
    repoInfo: GitHubRepoInfo | null; // GitHub仓库信息
    loading: boolean; // 加载状态
  }) => (
    <div className={`project-links ${loading ? 'animate' : ''}`}>
      {links.map((link: Link, index: number) => (
        <a
          key={index}
          href={link.url} // 链接地址
          className={`project-link cursor-target ${link.type === 'demo' ? '' : 'secondary'}`}
          target="_blank" // 新窗口打开
          rel="noopener noreferrer" // 安全属性
        >
          <i
            className={
              link.type === 'demo'
                ? 'fas fa-external-link-alt' // 演示链接图标
                : 'fab fa-github' // GitHub链接图标
            }
          ></i>
          {link.text} {/* 链接文本 */}
          {repoInfo && link.type === 'code' && (
            // 显示GitHub星标数
            <span className="star-count">
              <i className="fas fa-star"></i>
              {formatCount(repoInfo.stars)}
            </span>
          )}
        </a>
      ))}
    </div>
  ),
);

// 设置组件显示名称用于调试
ProjectLinks.displayName = 'ProjectLinks';

/**
 * 项目卡片组件
 * 显示单个项目的详细信息，包括标题、描述、技术栈、GitHub信息和链接
 */
const ProjectCard = memo(({ project }: { project: Project }) => {
  // 判断是否为反向布局
  const isReverse = project.layout === 'reverse';
  // GitHub仓库信息状态
  const [repoInfo, setRepoInfo] = useState<GitHubRepoInfo | null>(null);
  // 加载状态
  const [loading, setLoading] = useState(true);

  // 从项目链接中查找GitHub仓库信息
  const githubRepo = project.links.find(
    (link) => link.type === 'code' && link.githubRepo,
  )?.githubRepo;

  /**
   * 获取GitHub仓库信息
   */
  useEffect(() => {
    (async () => {
      // 如果没有GitHub仓库信息，直接结束加载
      if (!githubRepo) {
        setLoading(false);
        return;
      }
      try {
        // 调用GitHub API获取仓库信息
        const response = await fetch(
          `https://api.github.com/repos/${githubRepo}`,
          {
            headers: {
              Authorization: `bearer ${GITHUB_TOKEN.replaceAll("?", "")}`, // GitHub访问令牌
              Accept: 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        // 设置仓库信息
        setRepoInfo({
          stars: data.stargazers_count || 0, // 星标数
          forks: data.forks_count || 0, // 分叉数
          issues: data.open_issues_count || 0, // 开放问题数
          language: data.language || '', // 主要编程语言
          license: data.license?.name || null, // 许可证
          createdAt: data.created_at, // 创建时间
          updatedAt: data.updated_at, // 更新时间
        });
      } catch (error) {
        console.error('Failed to fetch GitHub repo info:', error);
        // 设置默认值以防API调用失败
        setRepoInfo({
          stars: 0,
          forks: 0,
          issues: 0,
          language: '',
          license: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /**
   * 技术标签组件（使用useMemo优化性能）
   */
  const techTags = useMemo(
    () => (
      <div className={`project-tech ${loading ? 'animate' : ''}`}>
        {project.tech.map((tech: string, index: number) => (
          <span key={index} className="tech-tag cursor-target">
            {tech} {/* 技术名称 */}
          </span>
        ))}
      </div>
    ),
    [project.tech, loading],
  );

  /**
   * 项目信息区域组件（使用useCallback优化性能）
   */
  const InfoSection = useCallback(
    () => (
      <div className="project-info">
        {/* 项目标题 */}
        <h2 className={`cursor-target ${loading ? 'animate' : ''}`}>
          {project.title}
        </h2>
        {/* 项目描述 */}
        <p className={`project-description ${loading ? 'animate' : ''}`}>
          {project.description}
        </p>
        {/* 技术标签 */}
        {techTags}

        {/* GitHub统计信息（仅当有GitHub仓库时显示） */}
        {githubRepo && <GitHubStats repoInfo={repoInfo} loading={loading} />}

        {/* 项目链接 */}
        <ProjectLinks
          links={project.links}
          repoInfo={repoInfo}
          loading={loading}
        />
      </div>
    ),
    [
      project.title,
      project.description,
      techTags,
      repoInfo,
      loading,
      project.links,
    ],
  );

  /**
   * 项目预览区域组件（使用useCallback优化性能）
   */
  const PreviewSection = useCallback(
    () => (
      <div
        className={`project-preview cursor-target ${loading ? 'animate' : ''}`}
      >
        <img
          className="project-image"
          src={project.preview} // 项目预览图片
          alt={project.title} // 图片替代文本
          loading="lazy" // 懒加载优化
        />
      </div>
    ),
    [project.preview, project.title],
  );

  return (
    <div className="project-card"> {/* 项目卡片容器 */}
      {isReverse ? (
        // 反向布局：预览在左，信息在右
        <>
          <PreviewSection />
          <InfoSection />
        </>
      ) : (
        // 正常布局：信息在左，预览在右
        <>
          <InfoSection />
          <PreviewSection />
        </>
      )}
    </div>
  );
});

// 设置组件显示名称用于调试
ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
