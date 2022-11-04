const seeder = require("mongoose-seed");
const data = require("./contentData");

const BASE_URL = "mongodb://localhost:27017/orangeEvolution";

seeder.connect(BASE_URL, () => {
  seeder.loadModels(["../ContentModel"]);
  seeder.clearModels(["Content"]);
  seeder.populateModels(data, (err, done) => {
    if (err) {
      return console.error(err);
    }
    seeder.disconnect();
    return console.log("seed done", done);
  });
});
