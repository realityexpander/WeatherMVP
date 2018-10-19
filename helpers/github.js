const request = require("request");
const config = require("../config.js");

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  const repos = [];
  const options = {
    url: "https://api.github.com/users/" + username + "/repos",
    headers: {
      "User-Agent": "request",
      Authorization: `token ${config.TOKEN}`
    }
  };

  request(options, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      var data = JSON.parse(body);
      // console.log(`data in github request: ${JSON.stringify(data[0])}`);
      data.forEach(repo => repos.push(repo));
      callback(null, repos);
    } else {
      console.log(`There was an error to the request to github: ${err}`);
      callback(err, null);
    }
  });
};

module.exports.getReposByUsername = getReposByUsername;
