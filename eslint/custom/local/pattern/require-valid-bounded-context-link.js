const path = require('path');
const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-valid-bounded-context-link',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure cross-bounded-context entities are typed as Guid | Entity and not used directly.',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      invalidCrossContextUsage:
        'Entity "{{name}}" is from a different bounded context and must be typed as "Guid | {{name}}".',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();
    const sourceFilePath = context.getFilename();

    function getBoundedContextFromPath(filePath) {
      const parts = filePath.split(path.sep);
      const entityIndex = parts.indexOf('entity');
      if (entityIndex === -1) return null;
      return parts[entityIndex + 1]; // ex: "customer"
    }

    const currentContext = getBoundedContextFromPath(sourceFilePath);
    if (!currentContext) return {};

    const importedEntities = {};

    return {
      ImportDeclaration(node) {
        const importPath = node.source.value;
        if (typeof importPath !== 'string') return;

        const importContext = getBoundedContextFromPath(importPath);
        if (!importContext) return;

        for (const specifier of node.specifiers) {
          if (
            specifier.type !== 'ImportSpecifier' &&
            specifier.type !== 'ImportDefaultSpecifier'
          )
            continue;

          const importedName = specifier.local.name;
          importedEntities[importedName] = {
            name: importedName,
            boundedContext: importContext,
          };
        }
      },

      TSTypeAnnotation(node) {
        const annotation = node.typeAnnotation;

        if (annotation.type !== 'TSTypeReference') return;

        const typeName = annotation.typeName;
        if (!typeName || typeName.type !== 'Identifier') return;

        const imported = importedEntities[typeName.name];
        if (!imported) return;

        if (imported.boundedContext !== currentContext) {
          // Check if union type is missing (should be Guid | ImportedEntity)
          const parent = node.parent;
          if (
            parent.type !== 'TSUnionType' &&
            parent.typeAnnotation?.type !== 'TSUnionType'
          ) {
            context.report({
              node,
              messageId: 'invalidCrossContextUsage',
              data: {
                name: imported.name,
              },
            });
          }
        }
      },
    };
  },
});
