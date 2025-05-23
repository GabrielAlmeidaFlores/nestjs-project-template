module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow multiple exports per file.',
      category: 'Best Practices',
    },
    fixable: null,
    schema: [],
    messages: {
      singleExport: 'Files should only contain a single export.',
    },
  },
  create(context) {
    return {
      Program(node) {
        const exportDeclarations = node.body.filter(
          (n) =>
            n.type === 'ExportNamedDeclaration' ||
            n.type === 'ExportDefaultDeclaration'
        );

        let exportCount = 0;

        for (const decl of exportDeclarations) {
          const d = decl.declaration;

          if (!d) {
            exportCount++;
            continue;
          }

          switch (d.type) {
            case 'FunctionDeclaration':
            case 'ClassDeclaration':
            case 'TSTypeAliasDeclaration':
            case 'TSInterfaceDeclaration':
            case 'VariableDeclaration':
              exportCount++;
              break;
          }
        }

        if (exportCount > 1) {
          context.report({
            node,
            messageId: 'singleExport',
          });
        }
      },
    };
  },
};
