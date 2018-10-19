import React from "react";

const Repo = props => (
  <tr>
    <td>
      <a href={props.repo.html_url}>{props.repo.name}</a>
    </td>
    <td>{props.repo.description}</td>
    <td>{props.repo.stargazers_count}</td>
  </tr>
);

export default Repo;
