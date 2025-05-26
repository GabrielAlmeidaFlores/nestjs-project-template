module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Prohibits if statement blocks from having more than 10 lines',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
  },
  create(context) {
    return {
      IfStatement(node) {
        if (node.consequent && node.consequent.type === 'BlockStatement') {
          const block = node.consequent;
          const lineCount = block.loc.end.line - block.loc.start.line + 1;

          if (lineCount > 10) {
            context.report({
              node,
              message: `O bloco 'if' tem ${lineCount} linhas, o que excede o limite de 10 linhas permitido.`,
            });
          }
        }
      },
    };
  },
};
