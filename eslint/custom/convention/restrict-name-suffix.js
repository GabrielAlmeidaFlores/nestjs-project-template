module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Require interfaces to end with "Interface", all type aliases to end with "Type", and enums to end with "Enum"',
      category: 'Best Practices',
    },
    fixable: null,
    schema: [],
    messages: {
      interfaceSuffix: 'Interface name should end with "Interface".',
      typeSuffix: 'Type alias name should end with "Type".',
      enumSuffix: 'Enum name should end with "Enum".',
    },
  },
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
};
