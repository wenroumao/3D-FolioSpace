# FolioSpace

[中文版本](README.zh_CN.md)

![preview](./src/assets/folio_space.gif)
> **📱 Author's FolioSpace**: [https://simonaking.com/](https://simonaking.com/) - See FolioSpace in action

FolioSpace is a 3D project showcase tool that helps you create an online portfolio with smooth transition animations.

## 🚀 Key Features

1. 🎭 **3D Presentation Effects**
   - Smooth 3D transition animations based on impress.js
   - Immersive project browsing experience
   - Support for keyboard, mouse, and touch operations

2. 🗺️ **Smart Navigation**
   - Innovative MiniMap navigation system
   - Real-time display of current position and browsing progress
   - Click to quickly jump to any project

3. 📱 **Responsive Design**
   - Perfect adaptation to desktop, tablet, and mobile devices
   - Touch-friendly interactive design
   - Elegant animations and transition effects

4. 🌐 **GitHub Integration**
   - Real-time fetching and displaying GitHub project star counts
   - Automatic project information synchronization
   - Support for multiple link types (demo, source code, documentation, etc.)

## 📝 Usage Guide

### Adding New Projects

1. Add project configuration in `src/constants/projectsData.ts`
2. Prepare project preview images and resources
3. Configure project 3D position and display information
4. Build and deploy updates

### Project Configuration Example

```typescript
{
  id: 'my-project',
  name: 'Project Name',
  title: 'Display Title',
  icon: 'fas fa-star',
  status: 'completed', // or 'in-progress'
  position: { x: 1000, y: 500, z: 0 },
  description: 'Project description...',
  tech: ['React', 'TypeScript'],
  links: [
    { type: 'demo', url: 'https://demo.com', text: 'Live Demo' },
    { type: 'code', url: 'https://github.com', text: 'Source Code' }
  ],
  layout: 'standard', // or 'reverse'
  image: './src/assets/project-preview.gif'
}
```

### 🎮 Interaction Methods

- **Keyboard**: Space key/arrow keys for navigation
- **Mouse**: Click buttons or map nodes
- **Touch**: Swipe gesture support
- **Map**: Click nodes for quick navigation

## 📁 Project Structure

```
FolioSpace/
├── src/                    # Main source code
│   ├── components/         # React components
│   │   ├── MiniMap/       # Navigation map component
│   │   ├── OverviewSlide/ # Overview slide
│   │   ├── ProgressBar/   # Progress bar component
│   │   ├── ProjectCard/   # Project card component
│   │   ├── ProjectSlide/  # Project detail slide
│   │   ├── TitleSlide/    # Title slide
│   │   ├── Toolbar/       # Toolbar component
│   │   └── ui/            # Common UI components
│   ├── constants/         # Configuration files
│   │   ├── impressConfig.ts  # impress.js configuration
│   │   ├── projectsData.ts   # Project data
│   │   ├── slideIds.ts       # Slide IDs
│   │   └── userConfig.ts     # User configuration
│   ├── types/             # TypeScript type definitions
│   │   ├── global.d.ts    # Global types
│   │   ├── project.ts     # Project types
│   │   └── userConfig.ts  # User configuration types
│   ├── assets/            # Static resources
│   ├── App.tsx            # Main app component
│   └── index.tsx          # App entry point
├── public/                # Public files
│   └── index.html         # HTML template
├── rsbuild.config.mjs     # Build configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies
```

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
# or
pnpm install
```

### Development Mode

```bash
npm run dev
# or
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the development environment

### Build Project

```bash
npm run build
# or
pnpm build
```

## 🎨 Main Components

### TitleSlide
Project title page displaying personal information and bio.

### OverviewSlide
Project overview page showing thumbnails and statistics of all projects.

### ProjectSlide
Detailed display page for individual projects, including project description, tech stack, links, etc.

### MiniMap
Innovative project map feature:
- Real-time display of current position
- Clickable quick navigation
- Support for expanding large map
- Animated focus effects

### ProgressBar
Progress bar component showing browsing progress.

### Toolbar
Toolbar providing navigation controls and setting options.

## 🔧 Custom Configuration

### User Information Configuration

Configure personal information in `src/constants/userConfig.ts`:

```typescript
export const USER_CONFIG = {
  AVATAR_URL: 'your-avatar-url',
  NAME: 'Your Name',
  JOB_TITLE: 'Your Job Title',
  BIO: [
    'Your first bio line',
    'Your second bio line',
    'Your third bio line',
  ],
  CONTACT_LINKS: [
    {
      type: 'github',
      url: 'https://github.com/yourusername',
      icon: 'fab fa-github',
      text: 'GitHub',
    },
    // More contact links...
  ],
};
```

### Project Data Configuration

Add your projects in `src/constants/projectsData.ts`:

```typescript
export const PROJECTS_DATA = [
  {
    id: 'project-1',
    name: 'Project Name',
    title: 'Project Title',
    icon: 'fas fa-star',
    status: 'completed',
    position: { x: 1000, y: 500, z: 0 },
    description: 'Detailed project description...',
    tech: ['React', 'TypeScript', 'Node.js'],
    links: [
      { type: 'demo', url: 'https://demo.com', text: 'Live Demo' },
      { type: 'code', url: 'https://github.com', text: 'Source Code' },
    ],
    image: './src/assets/project-preview.gif',
    layout: 'standard'
  },
  // More projects...
];
```

## 🤝 Contributing

Issues and Pull Requests are welcome!

---

<div align="center">

**Thank you for your attention and support!**

If you like this project, don't forget to give it a ⭐!

Made with ❤️ by [SimonAKing](https://github.com/SimonAKing)

</div>