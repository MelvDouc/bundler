import {
  join,
  ESBuildPlugin
} from "./deps.ts";

const resolvePathAliasesPlugin = ({ importMap }: { importMap: Record<string, string>; }): ESBuildPlugin => {
  const imports = Object.entries(importMap);
  const cache = new Map<string, string>();

  return {
    name: "resolve-path-aliases",
    setup: (build) => {
      build.onResolve({ filter: /\.tsx?$/ }, async ({ path }) => {
        if (!cache.has(path)) {
          const entry = imports.find(([alias]) => path.startsWith(alias));
          cache.set(path, join(Deno.cwd(), entry ? path.replace(entry[0], entry[1]) : path));
        }

        return { path: cache.get(path) };
      });
    }
  };
};

export default resolvePathAliasesPlugin;