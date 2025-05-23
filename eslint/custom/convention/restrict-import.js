module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow relative imports',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          patterns: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                group: { type: 'array', items: { type: 'string' } },
                message: { type: 'string' },
              },
            },
          },
        },
      },
    ],
  },

  create(context) {
    const restrictedPatterns = [
      {
        group: ['../', './'],
        message:
          'Relative imports (e.g., using "./" or "../") are not allowed. Please use absolute imports or configure proper paths.',
      },
    ];

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        for (const pattern of restrictedPatterns) {
          for (const groupPattern of pattern.group) {
            if (importPath.startsWith(groupPattern)) {
              context.report({
                node: node.source,
                message: pattern.message,
              });
              break;
            }
          }
        }
      },
    };
  },
};
