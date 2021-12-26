const helpers = {
  extractParams: function (anObject) {
    return Object.keys(anObject)
      .map((key) => {
        if (Array.isArray(anObject[key])) {
          return `${key}=${anObject[key].join(`&${key}=`)}`;
        }
        if (key === "sortBy" || key === "color" || key === "brand")
          return `${key}=${anObject[key]}`;
      })
      .join("&");
  },
};

module.exports.helpers = helpers;
