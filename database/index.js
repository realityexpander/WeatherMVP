const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/fetcher");

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  _id: Number,
  name: String,
  description: String,
  html_url: String,
  owner: String,
  created_at: String,
  stargazers_count: Number
});

let Repo = mongoose.model("Repo", repoSchema);

let save = (repo, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  const newRepo = {
    _id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    owner: repo.owner.login,
    created_at: repo.created_at,
    stargazers_count: repo.stargazers_count
  };

  console.log(`newRepo: ${newRepo}`);

  Repo.findOneAndUpdate(
    { _id: newRepo._id },
    newRepo,
    { upsert: true },
    (err, repo) => {
      if (err) {
        console.log(err);
        callback(err, null);
      } else {
        callback(null, repo);
      }
    }
  );
};

let retrieve = callback => {
  Repo.find()
    .sort({ stargazers_count: -1 })
    .limit(25)
    .exec((err, repos) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, repos);
      }
    });
};

module.exports.retrieve = retrieve;
module.exports.save = save;
