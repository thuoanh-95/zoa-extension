/* eslint no-param-reassign: ["off"] */

import inquirer from "inquirer";

export default function getDeployOptions() {
  const questions = [
    {
      type: "input",
      name: "description",
      message: "Enter description: ",
      validate(input) {
        return new Promise((resolve, reject) => {
          if (!input) reject(new Error("Description is required"));
          else resolve(true);
        });
      },
    },
  ];
  return inquirer.prompt(questions).then((options) => {
    return Promise.resolve(options);
  });
}
