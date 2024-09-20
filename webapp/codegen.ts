import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "../javagqldemo/src/main/resources/schema/schema.graphqls",
  documents: "src/data/queries/**/*.ts",
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    "src/gql/generated/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo"
      ],
      config: {
        withHooks: true, // Enables React Apollo hooks generation
        withComponent: false, // If you don't want to generate React components
        withHOC: false, // If you don't want to generate higher-order components
      }
    }
  },
};

export default config;