import chalk from "chalk";

export function text(text: string, bold?: any, color?: any) {
  if (color && bold) {
    console.log(chalk[color].bold(text));
  } else if (color) {
    console.log(chalk[color](text));
  } else if (bold) {
    console.log(chalk.bold(text));
  } else {
    console.log(text);
  }
}
export function error(text) {
  console.error(chalk.red(text));
}
