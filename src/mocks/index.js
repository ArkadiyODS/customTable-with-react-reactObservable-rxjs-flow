import React from "react";
import { get } from "lodash";

export const mockedGridMeta = {
  fetchUrl: "https://randomuser.me/api?results=10&seed=b45951b2648c0c64",
  columns: [
    {
      title: "Gender",
      visible: true,
      width: 120,
      sortable: true,
      filterable: true,
      order: 3,
      dataPath: "gender",
    },
    {
      title: "Email",
      visible: true,
      sortable: true,
      filterable: true,
      order: 1,
      dataPath: "email",
    },
    {
      title: "First Name",
      visible: true,
      width: 200,
      sortable: true,
      filterable: true,
      order: 2,
      dataPath: "name.first",
    },
    {
      title: "Last Name",
      visible: true,
      width: 200,
      sortable: true,
      filterable: true,
      order: 5,
      dataPath: "name.last",
    },
    {
      title: "Avatar",
      visible: true,
      width: 80,
      sortable: false,
      filterable: false,
      order: 4,
      dataPath: "picture.medium",
      renderer: (config, data) => (
        <img
          alt="avatar"
          style={{ width: "100%" }}
          src={get(data, config.dataPath)}
        />
      ),
    },
  ],
};
