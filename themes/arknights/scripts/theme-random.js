const crypto = require("crypto");

hexo.extend.helper.register("post_style", function (post) {
  const config = hexo.theme.config;
  const fixedSlugs = config.fixed_main_style || [];
  const pool = config.style_pool || [];
  const mainAccent = config.main_accent || "#f0a030";
  const mainBadge = config.main_badge || "罗德岛 · PRTS";

  const slug = post.slug || post.title || "";

  // 检查是否为固定主线风格的文章
  for (const fs of fixedSlugs) {
    if (slug === fs || post.title === fs) {
      return { accent: mainAccent, badge: mainBadge, isMain: true };
    }
  }

  // 随机选取
  if (pool.length === 0) {
    return { accent: mainAccent, badge: mainBadge, isMain: true };
  }

  // 基于文章 slug 的确定性随机（同一篇文章总是同一风格）
  const hash = crypto.createHash("md5").update(slug).digest("hex");
  const idx = parseInt(hash.substring(0, 8), 16) % pool.length;
  const style = pool[idx];
  return {
    accent: style.accent || mainAccent,
    badge: style.badge || mainBadge,
    isMain: false,
  };
});
