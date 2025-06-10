const { ESLintUtils } = require('@typescript-eslint/utils');

const expectedTypeMap = {
  varchar: 'string',
  text: 'string',
  char: 'string',
  uuid: 'string',
  boolean: 'boolean',
  int: 'number',
  integer: 'number',
  tinyint: 'number',
  smallint: 'number',
  bigint: 'string',
  float: 'number',
  double: 'number',
  timestamp: 'Date',
  date: 'Date',
  datetime: 'Date',
  decimal: 'string',
  numeric: 'string',
  json: 'object',
  jsonb: 'object',
};

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'match-column-type-to-ts-type',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensures that the `type` passed to @Column matches the declared TypeScript type (e.g., `decimal` should be typed as string).',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      mismatchedType:
        'Column type "{{columnType}}" expects a TypeScript type of "{{expectedType}}", but found "{{actualType}}".',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!node.decorators || !node.typeAnnotation) return;

        for (const decorator of node.decorators) {
          const expression = decorator.expression;

          if (
            expression.type !== 'CallExpression' ||
            expression.callee.type !== 'Identifier' ||
            expression.callee.name !== 'Column'
          )
            continue;

          const [arg] = expression.arguments;
          if (!arg || arg.type !== 'ObjectExpression') continue;

          const typeProperty = arg.properties.find(
            (p) =>
              p.type === 'Property' &&
              p.key.type === 'Identifier' &&
              p.key.name === 'type' &&
              p.value.type === 'Literal',
          );

          if (!typeProperty) return;

          const columnType = typeProperty.value.value;
          const expectedType = expectedTypeMap[columnType];

          if (!expectedType) return;

          const actualTypeNode = node.typeAnnotation.typeAnnotation;

          const actualType =
            actualTypeNode.type === 'TSUnionType'
              ? actualTypeNode.types.map((t) => t.type).join('|')
              : actualTypeNode.type;

          const tsToLiteralMap = {
            TSStringKeyword: 'string',
            TSNumberKeyword: 'number',
            TSBooleanKeyword: 'boolean',
            TSDateKeyword: 'Date',
            TSObjectKeyword: 'object',
          };

          const resolvedActualType = tsToLiteralMap[actualType] || null;

          if (resolvedActualType && resolvedActualType !== expectedType) {
            context.report({
              node,
              messageId: 'mismatchedType',
              data: {
                columnType,
                expectedType,
                actualType: resolvedActualType,
              },
            });
          }
        }
      },
    };
  },
});
