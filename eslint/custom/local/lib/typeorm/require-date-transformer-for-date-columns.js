const { ESLintUtils } = require('@typescript-eslint/utils');

const DATE_COLUMN_TYPES = new Set(['date', 'datetime']);

function isColumnDecoratorCall(node) {
  return (
    node.expression &&
    node.expression.type === 'CallExpression' &&
    node.expression.callee &&
    node.expression.callee.type === 'Identifier' &&
    node.expression.callee.name === 'Column'
  );
}

function getObjectProperty(objectExpression, propertyName) {
  return objectExpression.properties.find((property) => {
    if (property.type !== 'Property') {
      return false;
    }
    if (property.key.type === 'Identifier') {
      return property.key.name === propertyName;
    }
    if (property.key.type === 'Literal') {
      return property.key.value === propertyName;
    }
    return false;
  });
}

function getLiteralStringValue(node) {
  if (!node) {
    return null;
  }
  if (node.type === 'Literal' && typeof node.value === 'string') {
    return node.value;
  }
  return null;
}

function isDateTransformer(node) {
  if (!node) {
    return false;
  }
  if (node.type === 'Identifier') {
    return node.name === 'DateTransformer';
  }
  return false;
}

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-date-transformer-for-date-columns',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require DateTransformer on TypeORM Column definitions with type date or datetime',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      missingTransformer:
        'Columns with type "{{type}}" must include transformer: DateTransformer.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      Decorator(node) {
        if (!isColumnDecoratorCall(node)) {
          return;
        }

        const args = node.expression.arguments;
        if (!args || args.length === 0) {
          return;
        }

        const firstArg = args[0];
        if (firstArg.type !== 'ObjectExpression') {
          return;
        }

        const typeProperty = getObjectProperty(firstArg, 'type');
        const typeValue = typeProperty
          ? getLiteralStringValue(typeProperty.value)
          : null;

        if (!typeValue || !DATE_COLUMN_TYPES.has(typeValue)) {
          return;
        }

        const transformerProperty = getObjectProperty(firstArg, 'transformer');
        const transformerValue = transformerProperty
          ? transformerProperty.value
          : null;

        if (!isDateTransformer(transformerValue)) {
          context.report({
            node: transformerProperty ?? typeProperty,
            messageId: 'missingTransformer',
            data: { type: typeValue },
          });
        }
      },
    };
  },
});
