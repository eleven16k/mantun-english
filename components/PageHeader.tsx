/**
 * PageHeader — 全站右侧视图统一标题三件套（对齐拼读馆参考稿）：
 * 黄贴纸 badge（歪头 -2°，hover 回正）+ 900 黑体大标题 + 灰色副标。
 * badge 是装饰性大写英文短标（硬编码即可）；title/sub 走 i18n。
 */
export function PageHeader({
  badge,
  title,
  sub,
  className = "mb-5",
}: {
  badge: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="page-badge">{badge}</span>
      <h1 className="page-h1">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
    </div>
  );
}
