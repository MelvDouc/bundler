# resolve-path-aliases-plugin

Allow ESBuild to resolve path aliases. It also works with Deno.

## Example

```typescript
import * as esbuild from "esbuild";
import { resolvePathAliasesPlugin } from "@melvdouc/esbuild-path-aliases-plugin";
import denoJson from "./deno.json" with { type: "json" };

await esbuild.build({
  bundle: true,
  entryPoints: ["src/app.ts"],
  outfile: "dist/app.bundle.js",
  plugins: [
    resolvePathAliasesPlugin({ importMap: denoJson.imports }),
  ],
});

await esbuild.stop();
```
