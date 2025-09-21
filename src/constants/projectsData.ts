// 导入项目预览图片资源
import animatedGalleryPreview from '../assets/images.gif';
import folioSpacePreview from '../assets/folio_space.gif';
import HomeProfilePreview from '../assets/HomeProfile.gif';
import homepagePreview from '../assets/wenroumao.gif';
import italkingPreview from '../assets/italking.png';
import scrcpyGUIPreview from '../assets/scrcpy-gui.gif';
import termFolioGif from '../assets/music.gif';
import thinkingPreview from '../assets/wechat.png';
// 导入项目类型定义
import { Project } from '../types/project';
// 导入幻灯片ID常量
import { SLIDE_IDS } from './slideIds';

/**
 * 项目数据配置
 * 包含所有展示项目的详细信息，包括位置、描述、技术栈、链接等
 */
export const projectsData: Project[] = [
    {
    id: SLIDE_IDS.HOMEPAGE,
    name: 'HomePage',
    title: 'HomePage - 现代化个人主页',
    preview: homepagePreview,
    position: { x: 1200, y: 800, z: 200, rotateY: 30 },
    description:
      '一个现代化且优雅的个人主页，具有流体动画背景、响应式设计和流畅的页面过渡效果',
    tech: ['WebGL', '个人博客', 'Web应用', '个人主页'],
    links: [
      { type: 'demo', url: 'https://wenroumao.com', text: '在线演示' },
      // {
      //   type: 'code',
      //   url: 'https://github.com/SimonAKing/HomePage',
      //   text: 'GitHub源码',
      //   githubRepo: 'SimonAKing/HomePage',
      // },
    ],
    layout: 'reverse',
  },
  {
    // 项目唯一标识符
    id: SLIDE_IDS.HomeProfile,
    // 项目名称
    name: 'HomeProfile',
    // 显示标题
    title: 'HomeProfile - 通过爬虫获取信息的个人博客平台',
    // 项目预览图片
    preview: HomeProfilePreview,
    // 3D空间中的位置和旋转角度
    position: { x: 1500, y: 0, z: 0, rotateY: 0 },
    // 项目描述
    description:
      '一个基于 vue 的个人博客平台，通过爬虫获取 平台 中的内容并展示为博客文章',
    // 技术标签
    tech: ['博客系统', '爬虫', 'HOME'],
    // 相关链接
    links: [
      {
        type: 'demo',
        url: 'https://home.wenroumao.com',
        text: '在线演示',
      },
      // {
      //   type: 'code',
      //   url: 'https://github.com/SimonAKing/HomeProfile',
      //   text: 'GitHub源码',
      //   githubRepo: 'SimonAKing/HomeProfile',
      // },
    ],
    // 布局类型
    layout: 'standard',
  },
  {
    id: SLIDE_IDS.GALLERY,
    name: 'Live Photo',
    title: 'Live Photo - 动画相册',
    preview: animatedGalleryPreview,
    position: { x: 0, y: 1500, z: 400, rotateY: 90 },
    description: '一个美观且现代化的照片相册，支持苹果高斯模糊以及实况照片的功能,很漂亮',
    tech: [ '相册应用', 'Web展示', '图片展示'],
    links: [
      {
        type: 'demo',
        url: 'https://blog.wenroumao.com/album/',
        text: '在线演示',
      },
      // {
      //   type: 'code',
      //   url: 'https://github.com/SimonAKing/AnimatedGallery',
      //   text: 'GitHub源码',
      //   githubRepo: 'SimonAKing/AnimatedGallery',
      // },
    ],
    layout: 'standard',
  },
  {
    id: SLIDE_IDS.TERMFOLIO,
    name: 'Music',
    title: 'Music - Web端音乐作品集',
    preview: termFolioGif,
    position: { x: -1060, y: 1060, z: 600, rotateY: 135 },
    description: '这是音乐馆,展示了我收藏的歌曲,你可以在这 Listen 到我收藏的音乐',
    tech: ['音乐', '作品集', 'web端'],
    links: [
      { type: 'demo', url: 'https://blog.wenroumao.com/music/?id=2887240194&server=netease', text: '在线演示' },
      // {
      //   type: 'code',
      //   url: 'https://github.com/SimonAKing/TermFolio',
      //   text: 'GitHub源码',
      //   githubRepo: 'SimonAKing/TermFolio',
      // },
    ],
    layout: 'reverse',
  },
  // {
  //   id: SLIDE_IDS.THINKING,
  //   name: '思考的价值',
  //   title: '思考的价值 - 知识分享平台',
  //   preview: thinkingPreview,
  //   position: { x: -1500, y: 0, z: 800, rotateY: 180 },
  //   description:
  //     '我们每天都会接收到过载的信息，然而明月与砾同囊，其中的优质信息往往会被淹没。[思考的价值] 由此而来，分享内容不限，偏向于 LLMs、科技的方向',
  //   tech: ['讨论平台', '知识分享', '内容创作'],
  //   links: [
  //     {
  //       type: 'demo',
  //       url: 'https://thinking.simonaking.com/',
  //       text: '了解更多',
  //     },
  //   ],
  //   layout: 'standard',
  // },
  // {
  //   id: SLIDE_IDS.SCRCPY,
  //   name: 'Scrcpy-GUI',
  //   title: 'Scrcpy-GUI - Android屏幕镜像工具',
  //   preview: scrcpyGUIPreview,
  //   position: { x: -1060, y: -1060, z: 1000, rotateY: 225 },
  //   description: '一个简单美观的Scrcpy图形界面应用程序，让Android屏幕镜像变得更加简单易用',
  //   tech: ['Electron', 'Scrcpy', '跨平台应用'],
  //   links: [
  //     {
  //       type: 'demo',
  //       url: 'https://github.com/SimonAKing/scrcpy-gui/releases',
  //       text: '下载应用',
  //     },
  //     {
  //       type: 'code',
  //       url: 'https://github.com/SimonAKing/scrcpy-gui',
  //       text: 'GitHub源码',
  //       githubRepo: 'SimonAKing/scrcpy-gui',
  //     },
  //   ],
  //   layout: 'reverse',
  // },
  // {
  //   id: SLIDE_IDS.ITALKING,
  //   name: 'ITalking',
  //   title: 'ITalking - 语音社交平台',
  //   preview: italkingPreview,
  //   position: { x: 0, y: -1500, z: 1200, rotateY: 270 },
  //   description:
  //     '一个语音社交平台，连接陌生人以缓解孤独感，让用户能够自信地表达自己，基于WebRTC技术实现实时语音通信',
  //   tech: ['WebRTC', '全栈开发', 'P2P通信'],
  //   links: [
  //     {
  //       type: 'demo',
  //       url: 'https://github.com/SimonAKing/ITalking/blob/master/CONTRIBUTING.md',
  //       text: '部署试用',
  //     },
  //     {
  //       type: 'code',
  //       url: 'https://github.com/SimonAKing/ITalking',
  //       text: 'GitHub源码',
  //       githubRepo: 'SimonAKing/ITalking',
  //     },
  //   ],
  //   layout: 'reverse',
  // },
  // {
  //   id: SLIDE_IDS.PROJECTS,
  //   name: 'FolioSpace',
  //   title: 'FolioSpace - 3D作品集展示平台',
  //   preview: folioSpacePreview,
  //   position: { x: 1060, y: -1060, z: 1400, rotateY: 315 },
  //   description:
  //     '一个现代化且优雅的个人作品集网站，具有流畅的3D动画效果和响应式设计，为项目展示提供沉浸式体验',
  //   tech: ['作品集', 'Web应用', '3D动画'],
  //   links: [
  //     {
  //       type: 'demo',
  //       url: 'https://simonaking.com/projects',
  //       text: '在线演示',
  //     },
  //     {
  //       type: 'code',
  //       url: 'https://github.com/SimonAKing/FolioSpace',
  //       text: 'GitHub源码',
  //       githubRepo: 'SimonAKing/FolioSpace',
  //     },
  //   ],
  //   layout: 'standard',
  // },
];

/**
 * 导航地图数据配置
 * 用于MiniMap组件显示项目导航信息
 */
export const mapData = [
  {
    id: SLIDE_IDS.TITLE,
    name: '介绍',
    icon: 'fas fa-home',
  },
    {
    id: SLIDE_IDS.HOMEPAGE,
    name: '个人主页',
    icon: 'fas fa-home',
  },
  {
    id: SLIDE_IDS.HomeProfile,
    name: 'HomeProfile',
    icon: 'fab fa-twitter',
  },
  {
    id: SLIDE_IDS.GALLERY,
    name: '动画相册',
    icon: 'fas fa-images',
  },
  {
    id: SLIDE_IDS.TERMFOLIO,
    name: '终端作品集',
    icon: 'fas fa-terminal',
  },
  // {
  //   id: SLIDE_IDS.THINKING,
  //   name: '思考的价值',
  //   icon: 'fas fa-brain',
  // },
  // {
  //   id: SLIDE_IDS.SCRCPY,
  //   name: 'Scrcpy-GUI',
  //   icon: 'fas fa-mobile-alt',
  // },
  // {
  //   id: SLIDE_IDS.ITALKING,
  //   name: 'ITalking',
  //   icon: 'fas fa-robot',
  // },
  // {
  //   id: SLIDE_IDS.PROJECTS,
  //   name: 'FolioSpace',
  //   icon: 'fas fa-layer-group',
  // },
  // {
  //   id: SLIDE_IDS.OVERVIEW,
  //   name: '总览',
  //   icon: 'fas fa-th-large',
  // },
];
