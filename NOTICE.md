# NOTICE — 致谢与数据来源（Apache-2.0 附录）

本产品（漫豚英语学生端 mt-teach-app）在开发过程中参考与使用了以下开源成果：

## 词库数据

- **ECDICT**（https://github.com/skywind3000/ECDICT ，MIT License）
  词书/词典数据的词条底料来源（音标、释义、分级标签、词频）。
  经管线过滤、分级与再加工后以 CC BY-SA 4.0 发布（见
  public/typing-dicts/LICENSE-DATA.md）。

## 机制与设计致谢

- **TypeWords**（https://github.com/zyronon/TypeWords ，GPL-3.0）
  「抽卡打字」题型的交互设计（打字升星、错词修复、复习调度）参考了其
  产品机制——未复制其任何代码。GPL-3.0 的传染性因此不适用于本仓库。

## 隐私与安全

- 本仓库不含任何密钥、用户数据或生产配置（.env.local 不入库）。
- 服务端（mt-teach-api）不在本仓库内。
