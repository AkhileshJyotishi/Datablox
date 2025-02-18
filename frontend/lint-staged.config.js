module.exports = {
  "*.+(js|jsx|ts|tsx|json|css|scss|md|mdx)": ["prettier . --write"],
  "*.+(js|jsx|ts|tsx)": ["eslint --fix"],
}
