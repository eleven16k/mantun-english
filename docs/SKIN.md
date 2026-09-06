# Lexi Skin — "Playful Prep" 设计系统

> 从句游官网（juyouenglish.com）计算样式抽象而来的设计语言，2026-09 实施于学生端。
> 分支 `feat/juyou-skin`。令牌名保持 Gizmo 皮肤时代的语义层不变，只换值 —— 旧用法零改动。

## 设计语言一句话

奶油纸面 + 墨线描边 + 硬阴影浮起：像一沓印着游戏卡牌的米色卡纸，
所有可点的东西都是「实体按钮」——按下去会陷、悬停会浮。

## 令牌（app/globals.css `:root` / `.dark`）

### 色彩

| 语义 | 亮色 | 暗色 | 用途 | 来源（句游计算值） |
|---|---|---|---|---|
| `--bg-app` | `#FFFBEB` 奶油 | `#131316` | 全局底色 | body bg `rgb(255 251 235)` |
| `--bg-surface` | `#FFFFFF` | `#202023` | 卡片 | `.demo .card` 白卡 |
| `--bg-canvas` | `#F1F5F9` | `#333338` | 托盘/胶囊 | `.demo .inner` 词槽托盘 |
| `--bg-action` | `#0F172A` 墨 | `#FAFAFA` | 主行动按钮 | `.game a` 立即注册体验 |
| `--bg-brand(-hover)` | `#4D96FF` / `#2563EB` | `#4D96FF` / `#6AA9FF` | 品牌/链接/主按钮 | `.start` `rgb(77 150 255)`、hover `rgb(37 99 235)` |
| `--bg-brand-subtle` | `#DBEAFE` | `#1E3A8A` | 品牌浅底 | courses 蓝色图标砖 |
| `--bg-gold-emphasis` | `#F4C430` 标签黄 | `#FACC15` | 强调徽章/Study CTA | `.features label` `rgb(244 196 48)`；CTA 黄 `#FFD93D` |
| `--text-brand` | `#2563EB` | `#6AA9FF` | 品牌文字 | h1 蓝字 `rgb(37 99 235)` |
| `--text-hearts` | `#EF4444` 红 | `#F87171` | 体力红心 | mac 点 `rgb(255 107 107)` |
| `--text-positive` | `#15803D` | `#4ADE80` | 正确/升级 | 答案绿 `rgb(107 203 119)` 加深保对比 |
| `--text-gold` | `#A16207` | `#FACC15` | 金币文字 | — |
| `--border-subtle` | `#E2E8F0` | `#333338` | 卡片描边 | `.courses li` 4px `rgb(241 245 249)` 语义等价 |
| `--border-brand` / `--border-focus` | `#4D96FF` | 同 | 品牌/焦点边 | — |
| `--ink` | `#0F172A` | `#FAFAFA` | 签名描边色 | 句游一切 `2px solid #0f172a` |

辅助别名（tailwind.config.ts）：`accent` = 标签黄（`bg-accent`）。

### 字体

- 栈：`"Noto Sans SC" → Inter（本地回退）→ system-ui`，layout.tsx 以 Google Fonts
  `<link>` 引入 variable 100–900（离线/失败自动回 Inter，无构建期网络依赖）。
- `font-booster`（标题/大数字）与 `font-inter` 都前置 Noto；标题一律
  `font-extrabold`(800)/900，句游 h1 的 900 黑体感。

### 阴影与描边（签名三件套）

```css
--shadow-lift:        0 4px 0 0 rgba(0,0,0,.1);   /* 静态硬阴影 */
--shadow-lift-hover:  0 6px 0 0 rgba(0,0,0,.1);   /* 悬停加深 */
/* 过渡统一 all .15s linear（句游全站节奏） */
```

## 签名工具类（globals.css，`game-` 前缀）

| 类 | 效果 | 句游原型 |
|---|---|---|
| `.game-chunky` | 2px 墨边 + 硬阴影（组合用） | `.register` 徽章描边 |
| `.game-btn` | 墨边 + 底边 4px + 硬阴影 + hover 浮 2px + active 陷 2px，radius 1rem，font-weight 900 | `.groups a` 免费开始学习 |
| `.game-card` | 白底 + 3px subtle 边 + hover 变墨边上浮 | `.features li` |
| `.game-badge` | 标签黄胶囊 + 墨边 + rotate(-2deg)，hover 回正 | `.title label` THREE MODES |
| `.game-chip` | 词卡 chip：白底 + 2px 边（底 4px）+ hover 蓝边蓝字上浮 | `.demo .inner button span` |

注意：`game-*` 定义在 `@tailwind utilities` 之后，同特异性时**会覆盖** Tailwind
工具类（如颜色/圆角）——组合时以 game-* 为准，需要覆写请用任意值或调整顺序。

## 应用位置（当前落点）

- **全局自动**：令牌换值覆盖 ≈90% 界面；`.g-card/.g-card-hero` 加 2px 纸边
- **AppShell**：品牌块（game-chunky）、Study CTA（game-btn + bg-accent 黄，文字固定
  `#0f172a` 不随暗色翻转）、顶栏渐变改用 `var(--bg-app)`
- **Dashboard**：每日计划卡（border-2 subtle）、开始计划按钮（game-btn + bg-brand）
- **QuizScreen**：选项 chip（game-chip / 对错反馈加 `border-b-4`）、提交与继续按钮
  （game-btn + bg-action）、PRO 徽章（game-badge）
- **ResultsScreen**：等级色/彩带数组紫→蓝黄、再来一局（game-btn）
- **ShopScreen**：Dark Mode 商品紫→蓝
- **share canvas**：紫渐变→蓝渐变（#4d96ff→#1e3a8a），QR 墨色

## 有意保留（非品牌色）

- 金币金、奖牌金银铜、`DECK_COLORS` 粉彩砖、scenarios 通话遮罩深色 —— 功能/氛围色
- quiz 选项置灰 `opacity-30 line-through` —— e2e 依赖 `button.opacity-30`
- Booster/Inter 本地字体文件（回退，不删）

## 扩展约定

新组件优先只用「语义令牌 + game-* 工具类」组合，不再引入新的硬编码色。
主行动按钮 = `game-btn` + `bg-action`（墨）或 `bg-brand`（蓝）；强调激励 =
`bg-accent` 黄 + 固定墨字；徽章 = `game-badge`。
