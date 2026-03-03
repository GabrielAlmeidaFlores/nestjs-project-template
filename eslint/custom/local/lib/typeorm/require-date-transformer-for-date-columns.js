const { ESLintUtils } = require('@typescript-eslint/utils');

const COLUMN_TYPE_TO_TRANSFORMER = {
  date: 'DateOnlyTransformer',
  datetime: 'DateTransformer',
  timestamp: 'DateTransformer',
};

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

function getTransformerName(node) {
  if (!node) {
    return null;
  }
  if (node.type === 'Identifier') {
    return node.name;
  }
  return null;
}

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-date-transformer-for-date-columns',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require correct date transformer on TypeORM Column definitions (DateOnlyTransformer for date, DateTransformer for datetime/timestamp)',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      missingTransformer:
        'Columns with type "{{type}}" must include transformer: {{requiredTransformer}}.',
      wrongTransformer:
        'Columns with type "{{type}}" must use {{requiredTransformer}}, not {{actualTransformer}}. Use DateOnlyTransformer for DATE columns (YYYY-MM-DD) and DateTransformer for DATETIME/TIMESTAMP columns.',
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

        const requiredTransformer = COLUMN_TYPE_TO_TRANSFORMER[typeValue];
        if (!requiredTransformer) {
          return;
        }

        const transformerProperty = getObjectProperty(firstArg, 'transformer');
        const transformerValue = transformerProperty
          ? transformerProperty.value
          : null;

        const actualTransformer = getTransformerName(transformerValue);

        if (!actualTransformer) {
          context.report({
            node: transformerProperty ?? typeProperty,
            messageId: 'missingTransformer',
            data: { type: typeValue, requiredTransformer },
          });
          return;
        }

        if (actualTransformer !== requiredTransformer) {
          context.report({
            node: transformerProperty,
            messageId: 'wrongTransformer',
            data: {
              type: typeValue,
              requiredTransformer,
              actualTransformer,
            },
          });
        }
      },
    };
  },
});
