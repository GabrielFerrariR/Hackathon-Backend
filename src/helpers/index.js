const { getLinkPreview } = require("link-preview-js");

const previewDataErrors = [
  "Attention Required!", "Error",
];

const formatString = (str) => (str
  ? previewDataErrors.reduce((acc, cur) => (str.startsWith(cur) ? "None" : acc), str)
  : "None");

const getPreviewData = async (link) => {
  try {
    const scrapedData = await getLinkPreview(link, {
      imagesPropertyType: "og",
      headers: {
        "user-agent": "googlebot", // fetches with googlebot crawler user agent
      },
      timeout: 10000,
    });

    const previewData = {
      title: formatString(scrapedData.title),
      description: formatString(scrapedData.description),
      images: scrapedData.images,
    };

    return previewData;
  } catch (error) {
    return { title: "None", description: "None", images: ["None"] };
  }
};

module.exports = {
  getPreviewData,
};
