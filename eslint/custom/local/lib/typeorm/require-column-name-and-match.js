const { ESLintUtils } = require('@typescript-eslint/utils');

function camelToSnakeCase(str) {
  return str.replace(/([A-Z])/g, '_$1').toLowerCase();
}

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-join-column-name-match',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure @JoinColumn uses a "name" that matches the property name in snake_case with _id suffix.',
      recommended: 'error',
    },
    messages: {
      missingName: 'The @JoinColumn decorator must include a "name" property.',
      nameMismatch:
        'The @JoinColumn "name" should be "{{ expected }}" to match the property name.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const properties = node.body.body;

        for (const property of properties) {
          if (!property.decorators || !property.key?.name) continue;

          const propertyName = property.key.name;
          const expectedName = `${camelToSnakeCase(propertyName)}_id`;

          for (const decorator of property.decorators) {
            const expression = decorator.expression;

            if (
              expression.type !== 'CallExpression' ||
              expression.callee.type !== 'Identifier' ||
              expression.callee.name !== 'JoinColumn'
            ) {
              continue;
            }

            const [optionsArg] = expression.arguments;

            if (!optionsArg || optionsArg.type !== 'ObjectExpression') {
              context.report({
                node: decorator,
                messageId: 'missingName',
              });
              continue;
            }

            const nameProperty = optionsArg.properties.find(
              (prop) =>
                prop.type === 'Property' &&
                prop.key.type === 'Identifier' &&
                prop.key.name === 'name',
            );

            if (!nameProperty) {
              context.report({
                node: decorator,
                messageId: 'missingName',
              });
              continue;
            }

            const nameValue =
              nameProperty.value.type === 'Literal'
                ? nameProperty.value.value
                : null;

            if (typeof nameValue === 'string' && nameValue !== expectedName) {
              context.report({
                node: nameProperty.value,
                messageId: 'nameMismatch',
                data: { expected: expectedName },
              });
            }
          }
        }
      },
    };
  },
});
