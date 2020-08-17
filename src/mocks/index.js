import React from "react";
import { get } from "lodash";

const NumberOfUsers = 100;

export const mockedGridMeta = {
  fetchUrl: `https://randomuser.me/api?results=${NumberOfUsers}&seed=b45951b2648c0c64`,
  dataSourceIdentifier: "email",
  rowsNumber: 5,
  rowHeight: 80,
  columns: [
    {
      title: "Gender",
      visible: true,
      width: 120,
      sortable: true,
      filterable: true,
      dataPath: "gender",
    },
    {
      title: "Email",
      visible: true,
      sortable: true,
      filterable: true,
      dataPath: "email",
    },
    {
      title: "First Name",
      visible: true,
      width: 200,
      sortable: true,
      filterable: true,
      order: 1,
      dataPath: "name.first",
    },
    {
      title: "Last Name",
      visible: true,
      width: 200,
      sortable: true,
      filterable: true,
      order: 3,
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
