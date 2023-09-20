export default {
  "{src,tests}/**/*.{js,ts,tsx}": ["eslint --fix"],
  "{src,tests}/**/*": ["prettier --write"],
};
