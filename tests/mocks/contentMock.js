const subtracks = require('../../src/enums/subtracks');
const tracks = require('../../src/enums/tracks');

module.exports = [
  {
    name: "QA",
    type: "article",
    duration: "00:04:00",
    creator: "Orange Juice",
    link: "https://medium.com/orangejuicefc/qual-o-papel-do-qa-em-uma-equipe-8e8147be28dd",
    track: tracks.fullstack,
    subTrack: subtracks.basics,
    likes: 42,
    previewData: {
      title: "Qual o papel do QA em uma equipe?",
      description: "Você sabe o que um QA faz? Basta testar o produto? Só vou reportar erros?",
      images: ["someImage"],
      _id: "636ab5b6591b4afd43a66f75",
      __v: 0,
    },
  },
  {
    name: "QA",
    type: "article",
    duration: "00:04:00",
    creator: "Orange Juice",
    link: "https://medium.com/orangejuicefc/qual-o-papel-do-qa-em-uma-equipe-8e8147be28dd",
    track: tracks.fullstack,
    subTrack: subtracks.basics,
  }
];

