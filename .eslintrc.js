module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard", "plugin:react/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    /*
      work around for
      https://github.com/pmndrs/react-three-fiber/discussions/2487
    */
    "react/no-unknown-property": ["off", { ignore: ["js"] }],
  },
};
