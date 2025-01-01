import { join } from "@std/path";
import type * as esbuild from "esbuild";
import type { ImportMap, PathAliasesPluginParams } from "$/src/types.ts";

const PLUGIN_NAME = "resolve-path-aliases";

export default function plugin(params: PathAliasesPluginParams): esbuild.Plugin {
  const baseUrl = params.root ?? Deno.cwd();
  const cache = new Map<string, string>();

  return {
    name: PLUGIN_NAME,
    setup: (build) => {
      build.onResolve({ filter: /\.tsx?$/ }, (options) => {
        if (options.kind !== "import-statement")
          return null;

        if (cache.has(options.path))
          return { path: cache.get(options.path) as string };

        const relativePath = replaceAlias(options.path, params.importMap);
        const resolved = join(baseUrl, relativePath);
        cache.set(options.path, resolved);
        return { path: resolved };
      });
    }
  };
}

function replaceAlias(path: string, importMap: ImportMap): string {
  let bestMatch: string = path;
  let bestLength = -Infinity; // Look for the longest alias match.

  for (const alias in importMap) {
    if (path.startsWith(alias) && alias.length > bestLength) {
      const value = importMap[alias];
      bestMatch = path.replace(alias, value);
      bestLength = alias.length;
    }
  }

  return bestMatch;
}