import indent from "../../utils/indent";

export default function() {
    return indent(
        0,
        `
        {
            "compilerOptions": {
                "noEmit": true,
                "target": "es6",
                "module": "esnext",
                "noImplicitAny": false,
                "preserveConstEnums": true,
                "jsx": "react",
                "lib": [
                    "dom",
                    "es5",
                    "es6",
                    "es7",
                    "es2017"
                ],
                "allowSyntheticDefaultImports": true,
                "esModuleInterop": true,
                "allowJs": true,
                "skipLibCheck": true,
                "declaration": false,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "forceConsistentCasingInFileNames": true,
                "moduleResolution": "node",
                "noEmitOnError": true,
                "noFallthroughCasesInSwitch": true,
                "noImplicitReturns": true,
                "noImplicitThis": true,
                "noUnusedLocals": false,
                "strict": true,
                "strictFunctionTypes": false,
                "pretty": true,
                "removeComments": true,
                "sourceMap": true,
                "resolveJsonModule": true
            },
            "exclude": [
                "node_modules"
            ],
            "include": [
                "src"
            ]
        }
        `
    )
}