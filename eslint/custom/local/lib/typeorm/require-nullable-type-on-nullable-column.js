const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'column-nullable-requires-null',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure properties with `@Column({ nullable: true })` include `null` in their type.',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      missingNullType:
        'Property is marked as `nullable: true` but its type does not include `null`.',
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

          const [firstArg] = expression.arguments;
          if (!firstArg || firstArg.type !== 'ObjectExpression') continue;

          const nullableProperty = firstArg.properties.find(
            (prop) =>
              prop.type === 'Property' &&
              prop.key.type === 'Identifier' &&
              prop.key.name === 'nullable' &&
              prop.value.type === 'Literal' &&
              prop.value.value === true,
          );

          if (!nullableProperty) continue;

          const typeNode = node.typeAnnotation.typeAnnotation;

          const includesNull =
            typeNode.type === 'TSUnionType' &&
            typeNode.types.some((t) => t.type === 'TSNullKeyword');

          if (!includesNull) {
            context.report({
              node,
              messageId: 'missingNullType',
            });
          }
        }
      },
    };
  },
});
