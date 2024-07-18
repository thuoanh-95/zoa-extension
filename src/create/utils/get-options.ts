/* eslint no-param-reassign: ["off"] */
import inquirer from "inquirer";
import chalk from "chalk";
import { projectFramework } from "../../config/constant";

const moreOptionsText = chalk.italic(`\t- Including Tailwind CSS`);
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
    when: (opts) => opts.package == "zmp-ui",
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
  // Template
  {
    type: "list",
    name: "cssPreProcessor",
    when: (opts) => opts.newProject,
    message: "Do you want to setup CSS Pre-Processor",
    default: false,
    choices: [
      {
        name: "No, i am good with CSS",
        value: false,
      },
      {
        name: "Less",
        value: "less",
      },
      {
        name: "SCSS (SASS)",
        value: "scss",
      },
      {
        name: "Stylus",
        value: "stylus",
      },
    ],
  },
  // Template
  {
    type: "list",
    name: "template",
    when: (opts) => opts.package === "zmp-ui",
    message: "Choose starter template:",
    choices: [
      {
        name: "Blank",
        value: "blank",
      },
      {
        name: "Single View",
        value: "single-view",
      },
    ],
  },
  // Color
  {
    type: "list",
    name: "themingCustomColor",
    when: (opts) => opts.newProject && opts.package !== "zmp-ui",
    message: "Do you want to specify custom theme color?",
    choices: [
      {
        name: "No, use default color theme",
        value: false,
      },
      {
        name: "Yes, i want to specify my brand color",
        value: true,
      },
    ],
  },
  {
    type: "input",
    name: "themingColor",
    message: "Enter custom theme color in HEX format (e.g. ff0000)",
    when: (opts) => opts.themingCustomColor === true,
    validate(input) {
      return new Promise((resolve, reject) => {
        const num = input.replace(/#/g, "");
        if (num.length === 3 || num.length === 6) resolve(true);
        else reject(new Error("It doesn't look like a correct HEX number"));
      });
    },
    filter(input) {
      return input.replace(/#/g, "");
    },
  },
  {
    type: "list",
    name: "moreOptions",
    when: (opts) => opts.newProject,
    message: `More Options?\n${moreOptionsText}`,
    default: false,
    choices: [
      {
        name: "No, I want to complete initializing process now",
        value: false,
      },
      {
        name: "Yes, I want to get more options",
        value: true,
      },
    ],
  },

  {
    type: "list",
    name: "includeTailwind",
    when: (opts) => opts.moreOptions,
    message: "Do you want to include Tailwind CSS?",
    default: true,
    choices: [
      {
        name: "Yes, I want to iclude Tailwind CSS",
        value: true,
      },
      {
        name: "No",
        value: false,
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
    if (options.package === "zmp-ui") {
      options.stateManagement = "recoil";
    }
    delete options.themingCustomColor;
    delete options.themingColor;
    delete options.themingIconFonts;
    delete options.useUIKits;
    delete options.moreOptions;

    return Promise.resolve(options);
  });
}
