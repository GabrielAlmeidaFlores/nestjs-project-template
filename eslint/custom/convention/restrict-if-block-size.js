const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'max-if-block-lines',
  meta: {
    type: 'problem',
    docs: {
      description: "Disallow 'if' statement blocks longer than 25 lines",
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      IfStatement(node) {
        if (node.consequent && node.consequent.type === 'BlockStatement') {
          const block = node.consequent;
          const startLine = block.loc.start.line;
          const endLine = block.loc.end.line;
          const lineCount = endLine - startLine + 1;

          const maxAllowedLines = 25;

          if (lineCount > maxAllowedLines) {
            context.report({
              node,
              message: `The 'if' block contains ${lineCount} lines, which exceeds the maximum allowed limit of ${maxAllowedLines}.`,
            });
          }
        }
      },
    };
  },
});
