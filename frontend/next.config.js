module.exports = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: ["novalearn.oss-ap-southeast-1.aliyuncs.com"],
  },
  i18n: {
    // These are all the locales you want to support
    // in your application
    locales: ["en-us"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en-us",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: [
        "@svgr/webpack",
        // {
        //   loader: "@svgr/webpack",
        //   options: {
        //     svgoConfig: { plugins: [{ removeViewBox: false }] },
        //   },
        // },
      ],
    });
    config.externals.push("canvas");
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        permanent: false,
        destination: "/student/home",
        has: [
          { type: "cookie", key: "authorized", value: "true" },
          { type: "cookie", key: "role", value: "STUDENT" },
        ],
      },
      {
        source: "/",
        permanent: false,
        destination: "/adult/home",
        has: [
          { type: "cookie", key: "authorized", value: "true" },
          { type: "cookie", key: "role", value: "PARENT" },
        ],
      },
      {
        source: "/",
        permanent: false,
        destination: "/navigator/home",
        has: [
          { type: "cookie", key: "authorized", value: "true" },
          { type: "cookie", key: "role", value: "TEACHER" },
        ],
      },
      {
        source: "/adult/billing",
        permanent: true,
        destination: "/adult/home",
      },
    ];
  },
};
