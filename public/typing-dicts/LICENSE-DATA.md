# 数据与内容许可（Data & Content License）

本仓库的**代码**以 Apache-2.0 协议发布（见根目录 LICENSE）。
本目录（`public/typing-dicts/`）及仓库内其他**词书/词典数据文件**以
**CC BY-SA 4.0** 协议发布——代码与数据协议分层，互不覆盖。

## 词书与词典数据的来源

- 词条底料来自 [ECDICT](https://github.com/skywind3000/ECDICT)（MIT 协议），
  经管线脚本（`scripts/gen-typing-wordbook.mjs` / `gen-lexicon.mjs` /
  `gen-vocab-lists.mjs`）过滤、分级与再加工：剔除停用词/粗俗词/曲折形、
  剥离领域释义、统一截断宽度。
- 例句由 LLM 生成（`scripts/gen-examples.mjs`），面向中国中小学生校准难度。
- 粗俗/不当词已通过黑名单零容忍剔除，词书对未成年人开放使用。

## 按 CC BY-SA 4.0 使用词书数据时

- **署名**：请注明「漫豚英语 mt-teach 词书数据 · 基于 ECDICT (MIT) 整理」
- **相同方式共享**：衍生词书数据需同样以 CC BY-SA 4.0 发布
- 免费使用、转写、商用均可，无需额外授权
