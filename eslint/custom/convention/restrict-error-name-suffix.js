const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-error-suffix',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require classes extending Error (directly or indirectly) to end with "Error"',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    messages: {
      classErrorSuffix: 'Class extending Error should end with "Error".',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const service = ESLintUtils.getParserServices(context);
    const checker = service.program.getTypeChecker();

    function inheritsError(type) {
      if (!type.symbol) return false;
      const name = type.symbol.getName();
      if (name === 'Error') return true;
      const bases = type.getBaseTypes() || [];
      return bases.some(inheritsError);
    }

    function isErrorSubclass(node) {
      const tsNode = service.esTreeNodeToTSNodeMap.get(node);
      const type = checker.getTypeAtLocation(tsNode);
      return inheritsError(type);
    }

    return {
      ClassDeclaration(node) {
        const name = node.id && node.id.name;
        if (!name) return;

        if (isErrorSubclass(node) && !name.endsWith('Error')) {
          context.report({
            node: node.id,
            messageId: 'classErrorSuffix',
          });
        }
      },
    };
  },
});
