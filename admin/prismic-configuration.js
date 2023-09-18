module.exports = {
  // -- Prismic API endpoint
  // Determines which repository to query and fetch data from
  // Configure your site's access point here
  apiEndpoint: "https://mindworks.prismic.io/api/v2",

  // -- Access Token if the repository is not public
  // Generate a token in your dashboard and configure it here if your repository is private
  accessToken:
    "MC5ZUjNhZ2hRQUFDSUE5T2NL.Pe-_vV3vv73vv73vv73vv73vv70rBu-_vVh577-977-9azLvv70t77-9SWtm77-977-977-9cO-_ve-_vTjvv70i",

  // -- Link resolution rules
  // Manages links to internal Prismic documents
  // Modify as your project grows to handle any new routes you've made

  // If languate included, return this
  // if (doc.type === "page") {
  //   return `/${doc.lang}/${doc.uid}`;
  // }

  linkResolver: function (doc) {
    if (doc.type === "page") {
      return `/${doc.lang}/${doc.uid}`;
    }
    if (doc.type === "case_studies_page") {
      return `/${doc.lang}/case-studies`;
    }
    if (doc.type === "case_study") {
      return `/${doc.lang}/case-studies/${doc.uid}`;
    }
    if (doc.type === "homepage") {
      return `/${doc.lang}`;
    }
    return "/";
  },

  // Additional helper function for Next/Link component
  hrefResolver: function (doc) {
    if (doc.type === "page") {
      return `/${doc.lang}/${doc.uid}`;
    }
    if (doc.type === "case_studies_page") {
      return `/${doc.lang}/case-studies`;
    }
    if (doc.type === "case_study") {
      return `/${doc.lang}/case-studies/${doc.uid}`;
    }
    if (doc.type === "homepage") {
      return `/${doc.lang}`;
    }
    return "/";
  },
};
