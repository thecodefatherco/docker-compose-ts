// import { } from "js-yaml"
import Bun from "bun";
import { compileFromFile } from "json-schema-to-typescript";

const compiled = await compileFromFile(
  "./compose-spec/schema/compose-spec.json",
  {
    enableConstEnums: true,
    declareExternallyReferenced: true,
    format: true,
  },
);

await Bun.write("types/compose-spec.d.ts", compiled);
