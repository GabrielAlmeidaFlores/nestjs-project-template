const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-dto-to-extend-base-buildable-object',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Classes decorated with @RequestDto or @ResponseDto must extend BaseBuildableObject',
      recommended: 'error',
    },
    schema: [],
    messages: {
      mustExtend:
        'Class decorated with @RequestDto or @ResponseDto must extend BaseBuildableObject.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const decorators = node.decorators ?? [];

        const hasDtoDecorator = decorators.some((decorator) => {
          const expr = decorator.expression;
          return (
            expr.type === 'CallExpression' &&
            expr.callee.type === 'Identifier' &&
            (expr.callee.name === 'RequestDto' || expr.callee.name === 'ResponseDto')
          );
        });

        if (!hasDtoDecorator) return;

        const superClass = node.superClass;
        const isExtendingCorrectBase =
          superClass &&
          superClass.type === 'Identifier' &&
          superClass.name === 'BaseBuildableObject';

        if (!isExtendingCorrectBase) {
          context.report({
            node,
            messageId: 'mustExtend',
          });
        }
      },
    };
  },
});