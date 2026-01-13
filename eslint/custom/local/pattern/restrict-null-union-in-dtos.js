const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'restrict-null-union-in-dtos',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Prohibit union types with null in DTO files (request.dto.ts and response.dto.ts)',
      recommended: 'error',
    },
    schema: [],
    messages: {
      nullUnionInDto:
        'Union types with null are not allowed in DTO files. Use optional properties instead of "{{type}} | null".',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();
    
    const isDtoFile =
      filename.endsWith('.request.dto.ts') || filename.endsWith('.response.dto.ts');

    if (!isDtoFile) {
      return {};
    }

    const typeIncludes = (typeNode, kind) =>
      typeNode?.type === 'TSUnionType' &&
      typeNode.types.some((t) => t.type === kind);

    const getTypeString = (typeNode) => {
      if (!typeNode) return '';
      if (typeNode.type === 'TSStringKeyword') return 'string';
      if (typeNode.type === 'TSNumberKeyword') return 'number';
      if (typeNode.type === 'TSBooleanKeyword') return 'boolean';
      if (typeNode.type === 'TSArrayType') return 'array';
      if (typeNode.type === 'TSTypeReference' && typeNode.typeName) {
        return typeNode.typeName.name || 'type';
      }
      return 'type';
    };

    return {
      TSPropertySignature(node) {
        if (!node.typeAnnotation) return;

        const typeNode = node.typeAnnotation.typeAnnotation;
        const includesNull = typeIncludes(typeNode, 'TSNullKeyword');

        if (includesNull) {
          const propName = node.key?.name || 'unknown';
          const nonNullType = typeNode.types.find(
            (t) => t.type !== 'TSNullKeyword',
          );
          const typeStr = getTypeString(nonNullType);

          context.report({
            node: typeNode,
            messageId: 'nullUnionInDto',
            data: {
              type: typeStr,
            },
          });
        }
      },
      PropertyDefinition(node) {
        if (!node.typeAnnotation) return;

        const typeNode = node.typeAnnotation.typeAnnotation;
        const includesNull = typeIncludes(typeNode, 'TSNullKeyword');

        if (includesNull) {
          const propName = node.key?.name || 'unknown';
          const nonNullType = typeNode.types.find(
            (t) => t.type !== 'TSNullKeyword',
          );
          const typeStr = getTypeString(nonNullType);

          context.report({
            node: typeNode,
            messageId: 'nullUnionInDto',
            data: {
              type: typeStr,
            },
          });
        }
      },
    };
  },
});
