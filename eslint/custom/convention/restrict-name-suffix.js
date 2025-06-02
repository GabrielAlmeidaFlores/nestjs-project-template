const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'enforce-type-naming-suffixes',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require interfaces to end with "Interface", all type aliases to end with "Type", and enums to end with "Enum"',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    fixable: null,
    schema: [],
    messages: {
      interfaceSuffix: 'Interface name should end with "Interface".',
      typeSuffix: 'Type alias name should end with "Type".',
      enumSuffix: 'Enum name should end with "Enum".',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        const name = node.id.name;
        if (!name.endsWith('Interface')) {
          context.report({
            node: node.id,
            messageId: 'interfaceSuffix',
          });
        }
      },
      TSTypeAliasDeclaration(node) {
        const name = node.id.name;
        if (!name.endsWith('Type')) {
          context.report({
            node: node.id,
            messageId: 'typeSuffix',
          });
        }
      },
      TSEnumDeclaration(node) {
        const name = node.id.name;
        if (!name.endsWith('Enum')) {
          context.report({
            node: node.id,
            messageId: 'enumSuffix',
          });
        }
      },
    };
  },
});
