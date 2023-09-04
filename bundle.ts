import { resolvePathAliasesPlugin } from "./mod.ts";
import { build, stop } from "./deps.ts";
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