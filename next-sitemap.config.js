/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://thunderclaplabs.com",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  autoLastmod: true,
  exclude: ["/globe", "/icon.ico"],
  transform: async (config, path) => {
    const priorityMap = {
      "/": { priority: 1.0, changefreq: "weekly" },
      "/projects": { priority: 0.9, changefreq: "weekly" },
      "/rnd": { priority: 0.9, changefreq: "weekly" },
      "/cloud-seeding": { priority: 0.9, changefreq: "weekly" },
      "/team": { priority: 0.8, changefreq: "monthly" },
      "/contact": { priority: 0.7, changefreq: "monthly" },
      "/gallery": { priority: 0.7, changefreq: "monthly" },
    };

    const overrides = priorityMap[path] ?? {
      priority: 0.6,
      changefreq: "monthly",
    };

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      ...overrides,
    };
  },
};
