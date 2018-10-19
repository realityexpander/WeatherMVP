import React from "react";
import Repo from "./Repo.jsx";

const RepoList = props => (
  <div>
    <h4> Repo List Component </h4>
    <table>
      <tbody>
        {props.repos[0]
          ? props.repos.map((repo, i) => <Repo repo={repo} key={i} />)
          : ""}
      </tbody>
    </table>
  </div>
);

export default RepoList;
