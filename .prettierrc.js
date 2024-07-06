module.exports = {
  printWidth: 200,
  tabWidth: 2,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindConfig: "./tailwind.config.ts",
  importOrder: ["^\\u0000", "^@?\\w", "^[./]"],
  importOrderSeparation: true,
  importSortOrder: ["asc", "desc"],
};
