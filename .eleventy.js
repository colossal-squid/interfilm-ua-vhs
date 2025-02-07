module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  let isProduction = process.env.ELEVENTY_ENV === "production";
  return {
    pathPrefix: isProduction === "production" ? "/interfilm-ua-vhs/" : "/",
    dir: {
      input: "src",
      output: "dist"
    }
  };
};
