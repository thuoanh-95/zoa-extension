import { generateNpmScripts } from "./generate-npm-scripts";

export default function (options) {
  const { name } = options;

  const npmScripts = generateNpmScripts().map((s) => {
    return `* ${s.icon} \`${s.name}\` - ${s.description}`;
  });

  return `

# ${name}

## ZOA CLI Options

ZOA extension created with following options:

\`\`\`
${JSON.stringify(options, null, 2)}
\`\`\`

## NPM Scripts

${npmScripts.join("\n")}
`
    .trim()
    .replace(/[\n]{3,}/, "\n");
}
