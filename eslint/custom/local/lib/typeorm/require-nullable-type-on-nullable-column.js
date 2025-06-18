const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'column-nullable-requires-null',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure that `@Column({ nullable: true })` fields include `null` in their type and vice versa.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      missingNullType:
        'Property is marked as `nullable: true` but its type does not include `null`.',
      missingNullableOption:
        'Property includes `null` in its type but is not marked as `nullable: true`.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        if (!node.decorators || !node.typeAnnotation) return;

        let isNullableTrue = false;
        let hasColumnDecorator = false;

        for (const decorator of node.decorators) {
          const expression = decorator.expression;

          if (
            expression.type !== 'CallExpression' ||
            expression.callee.type !== 'Identifier' ||
            expression.callee.name !== 'Column'
          )
            continue;

          hasColumnDecorator = true;

          const [firstArg] = expression.arguments;
          if (firstArg?.type === 'ObjectExpression') {
            isNullableTrue = firstArg.properties.some(
              (prop) =>
                prop.type === 'Property' &&
                prop.key.type === 'Identifier' &&
                prop.key.name === 'nullable' &&
                prop.value.type === 'Literal' &&
                prop.value.value === true,
            );
          }
        }

        if (!hasColumnDecorator) return;

        const typeNode = node.typeAnnotation.typeAnnotation;

        const includesNull =
          typeNode.type === 'TSUnionType'
            ? typeNode.types.some((t) => t.type === 'TSNullKeyword')
            : typeNode.type === 'TSNullKeyword';

        if (isNullableTrue && !includesNull) {
          context.report({
            node,
            messageId: 'missingNullType',
          });
        }

        if (!isNullableTrue && includesNull) {
          context.report({
            node,
            messageId: 'missingNullableOption',
          });
        }
      },
    };
  },
});
