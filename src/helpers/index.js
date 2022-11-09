const { getLinkPreview } = require("link-preview-js");

const getPreviewData = async (link) => {
  const scrapedData = await getLinkPreview(link, {
    imagesPropertyType: "og",
    headers: {
      "user-agent": "googlebot", // fetches with googlebot crawler user agent
    },
    timeout: 1000,
  });
  const previewData = {
    title: scrapedData.title,
    description: scrapedData.description,
    images: scrapedData.images,
  };
  return previewData;
};

module.exports = {
  getPreviewData,
};
