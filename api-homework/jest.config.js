module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testMatch: ["**/src/test/**/*.test.ts"],
  setupFiles: ["<rootDir>/src/test/setup.ts"],
  verbose: true,
};
