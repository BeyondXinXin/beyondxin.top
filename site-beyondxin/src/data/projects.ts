export type ProjectCategory =
  | 'dev'
  | 'desktop'
  | 'medical'
  | 'ai'
  | 'game'
  | 'cpp'
  | 'go'
  | 'typescript'
  | 'gdscript'

export type ProjectIcon =
  | 'robot'
  | 'box'
  | 'medical'
  | 'monitor'
  | 'window'
  | 'file'
  | 'share'
  | 'type'
  | 'palette'
  | 'git'
  | 'music'
  | 'ai'
  | 'leaf'

export interface Project {
  name: string
  description: string
  categories: ProjectCategory[]
  icon: ProjectIcon
  primaryUrl: string
  githubUrl?: string
}

export const projects: Project[] = [
  {
    name: '机械臂控制仿真',
    description: '从运动学、轨迹规划到 3D 可视化的机器人仿真与控制系统。',
    categories: ['medical', 'cpp'],
    icon: 'robot',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/机械臂控制仿真.html',
  },
  {
    name: 'NixVis',
    description: '轻量的 Nginx 日志分析与可视化工具。',
    categories: ['dev', 'go'],
    icon: 'box',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/NixVis.html',
    githubUrl: 'https://github.com/BeyondXinXin/nixvis',
  },
  {
    name: 'KissDicomViewer',
    description: '一个开源的医学影像本地浏览器。',
    categories: ['medical', 'desktop', 'cpp'],
    icon: 'medical',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/KISSDicomViewer.html',
    githubUrl: 'https://github.com/BeyondXinXin/KISS_Dicom_Viewer',
  },
  {
    name: 'PortPilot',
    description: '让本地 Web 服务被手机、另一台电脑或互联网访问。',
    categories: ['dev', 'go'],
    icon: 'monitor',
    primaryUrl: 'https://github.com/BeyondXinXin/PortPilot',
    githubUrl: 'https://github.com/BeyondXinXin/PortPilot',
  },
  {
    name: 'ContextMenuManager11',
    description: 'Windows 11 右键菜单管理器。',
    categories: ['dev', 'desktop', 'go'],
    icon: 'window',
    primaryUrl: 'https://github.com/BeyondXinXin/ContextMenuManager11',
    githubUrl: 'https://github.com/BeyondXinXin/ContextMenuManager11',
  },
  {
    name: 'CharsetFlow',
    description: '文件编码检测与批量转换工具。',
    categories: ['dev', 'desktop', 'go'],
    icon: 'file',
    primaryUrl: 'https://github.com/BeyondXinXin/CharsetFlow',
    githubUrl: 'https://github.com/BeyondXinXin/CharsetFlow',
  },
  {
    name: 'EgressProbe',
    description: '网络出口与代理环境检测工具。',
    categories: ['dev', 'go'],
    icon: 'share',
    primaryUrl: 'https://github.com/BeyondXinXin/EgressProbe',
    githubUrl: 'https://github.com/BeyondXinXin/EgressProbe',
  },
  {
    name: 'DeepSeekHarnessBox',
    description: '一键部署与运行 DeepSeek Harness 环境的 Windows 工具。',
    categories: ['dev', 'desktop', 'ai', 'go'],
    icon: 'box',
    primaryUrl: 'https://github.com/BeyondXinXin/deepseek-harness-box',
    githubUrl: 'https://github.com/BeyondXinXin/deepseek-harness-box',
  },
  {
    name: '末法守灵录：觉醒之夜',
    description: '一款类吸血鬼 Rogue-like 小游戏。',
    categories: ['game', 'gdscript'],
    icon: 'box',
    primaryUrl: 'https://github.com/BeyondXinXin/GodotPlayground',
    githubUrl: 'https://github.com/BeyondXinXin/GodotPlayground',
  },
  {
    name: '迟令：烽火驿道',
    description: '以“军令会迟到”为核心机制的回合制战棋与卡牌构筑游戏。',
    categories: ['game', 'gdscript'],
    icon: 'box',
    primaryUrl: 'https://github.com/BeyondXinXin/GodotPlayground',
    githubUrl: 'https://github.com/BeyondXinXin/GodotPlayground',
  },
  {
    name: '文字动效助手',
    description: '根据字幕文件生成简洁的文字旋转视频。',
    categories: ['desktop', 'cpp'],
    icon: 'type',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/文字动效助手.html',
    githubUrl: 'https://github.com/BeyondXinXin/TextAnimationHelper',
  },
  {
    name: 'YiHangPavilion',
    description: '一个个人定制的工作台，简洁、高效。',
    categories: ['typescript'],
    icon: 'palette',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/YiHangPavilion.html',
    githubUrl: 'https://github.com/BeyondXinXin/YiHangPavilion',
  },
  {
    name: 'RepoReporter',
    description: '仓库监视器，同时支持 SVN 和 Git。',
    categories: ['dev', 'desktop', 'cpp'],
    icon: 'git',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/RepoReporter.html',
    githubUrl: 'https://github.com/BeyondXinXin/RepoReporter',
  },
  {
    name: 'SonicRhythm',
    description: '一个基于 Qt 6 的音频可视化 Demo。',
    categories: ['desktop', 'cpp'],
    icon: 'music',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/SonicRhythm.html',
  },
  {
    name: 'AI.xyz',
    description: '一个面向开发者的桌面 AI 客户端。',
    categories: ['ai', 'desktop', 'cpp'],
    icon: 'ai',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/AI.xyz.html',
  },
  {
    name: '禅',
    description: '工作学习时帮助集中注意力。',
    categories: ['desktop', 'cpp'],
    icon: 'leaf',
    primaryUrl: 'https://notes.beyondxin.com/我的项目/禅.html',
  },
]
