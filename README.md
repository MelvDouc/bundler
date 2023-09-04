# resolve-path-aliases-plugin

Allow ESBuild to resolve path aliases.

## Example

### deno.json

```json
{
  "imports": {
    "$src/": "./src/"
  }
}
```

### bundle.ts

```typescript
import { build, stop } from "https://deno.land/x/esbuild@v0.19.2/mod.js";
import projectConfig from "./deno.json" assert { type: "json" };

await build({
  bundle: true,
  entryPoints: ["./src/app.ts"],
  outfile: "./dist/app.bundle.js",
  plugins: [
    resolvePathAliasesPlugin({ importMap: projectConfig.imports })
  ]
});
stop();
```
