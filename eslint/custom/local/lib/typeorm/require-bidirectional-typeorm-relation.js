const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-bidirectional-typeorm-relation',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure TypeORM relations are bidirectional using an inverse function (e.g., (entity) => entity.property)',
      recommended: 'error',
    },
    messages: {
      missingInverseSide:
        'Missing inverse side in {{ decoratorName }} relation. You must provide an inverse function: (entity) => entity.someProperty.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const properties = node.body.body;

        for (const property of properties) {
          const decorators = property.decorators;
          if (!decorators || decorators.length === 0) continue;

          for (const decorator of decorators) {
            const expression = decorator.expression;

            if (
              expression.type !== 'CallExpression' ||
              expression.callee.type !== 'Identifier'
            )
              continue;

            const decoratorName = expression.callee.name;

            const relationDecorators = [
              'OneToOne',
              'OneToMany',
              'ManyToOne',
              'ManyToMany',
            ];
            if (!relationDecorators.includes(decoratorName)) continue;

            const args = expression.arguments;
            const hasInverseFunction =
              args.length >= 2 && args[1].type === 'ArrowFunctionExpression';

            if (!hasInverseFunction) {
              context.report({
                node: decorator,
                messageId: 'missingInverseSide',
                data: { decoratorName },
              });
            }
          }
        }
      },
    };
  },
});
