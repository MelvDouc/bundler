# resolve-path-aliases-plugin

Allow ESBuild to resolve path aliases.

## Example

### deno.json

```json
{
  "tasks": {
    "bundle": "deno run --allow-read --allow-write --allow-env --allow-run bundle.ts"
  },
  "imports": {
    "$src/": "./src/"
  }
}
```

### bundle.ts

Adjust according to your needs.

```typescript
import { build, stop } from "https://deno.land/x/esbuild@v0.19.2/mod.js";
import { resolvePathAliasesPlugin } from "https://raw.githubusercontent.com/MelvDouc/deno-esbuild-resolve-path-aliases-plugin/main/mod.ts";
import projectConfig from "./deno.json" assert { type: "json" };

await build({
  bundle: true,
  entryPoints: ["./example/src/app.ts"],
  outfile: "./example/dist/app.bundle.js",
  plugins: [
    resolvePathAliasesPlugin({ importMap: projectConfig.imports })
  ]
});
stop();
```

### Command Line

```bash
deno task bundle
```
