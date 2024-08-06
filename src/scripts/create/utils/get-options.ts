/* eslint no-param-reassign: ["off"] */
import inquirer from "inquirer";
import chalk from "chalk";
import { projectFramework } from "../../../config/constant";


const questions = [
  {
    type: "list",
    name: "newProject",
    message: "What action you want to do?",
    choices: [
      { name: "Create a new ZOA Extension project", value: true },
      { name: "Using ZOA Extension to deploy only", value: false },
    ],
  },
  {
    type: "input",
    name: "name",
    message: "App (project) name:",
    default: "My App",
    validate(input) {
      return new Promise((resolve, reject) => {
        if (!input) reject(new Error("App name is required"));
        else resolve(true);
      });
    },
  },

  {
    type: "list",
    name: "framework",
    message: "What type of framework/library do you prefer?",
    choices: [
      {
        name: "ReactJS",
        value: projectFramework.REACT,
      },
      {
        name: "React Typescript",
        value: projectFramework.REACT_TYPESCRIPT,
      },
    ],
  },
];

export default function getOptions() {
  const listQuestion = questions;
  return inquirer.prompt(listQuestion).then((options) => {
    options.theming = {
      customColor: options.themingCustomColor,
      color:
        options.themingCustomColor && options.themingColor
          ? `#${options.themingColor}`
          : "#007aff",
      darkTheme: false,
      iconFonts: options.themingIconFonts,
      fillBars: false,
      useUiKits: options.useUIKits,
    };
    options.customBuild = false;
    options.includeTailwind = options.moreOptions && options.includeTailwind;
    if (!options.stateManagement) {
      options.stateManagement = "store";
    }

    delete options.themingCustomColor;
    delete options.themingColor;
    delete options.themingIconFonts;
    delete options.useUIKits;
    delete options.moreOptions;

    return Promise.resolve(options);
  });
}
