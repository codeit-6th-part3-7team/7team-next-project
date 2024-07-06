/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-md": "744px",
        "mantine-breakpoint-xl": "1200px",
      },
    },
  },
};

export default config;
