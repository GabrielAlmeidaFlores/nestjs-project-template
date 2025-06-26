const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-response-dto-to-extend-base-buildable-blank-dto',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Classes decorated with @ResponseDto must extend BaseBuildableBlankDto',
      recommended: 'error',
    },
    schema: [],
    messages: {
      mustExtend:
        'Class decorated with @ResponseDto must extend BaseBuildableBlankDto.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const decorators = node.decorators ?? [];

        const hasResponseDtoDecorator = decorators.some((decorator) => {
          const expr = decorator.expression;
          return (
            expr.type === 'CallExpression' &&
            expr.callee.type === 'Identifier' &&
            expr.callee.name === 'ResponseDto'
          );
        });

        if (!hasResponseDtoDecorator) return;

        const superClass = node.superClass;
        const isExtendingCorrectBase =
          superClass &&
          superClass.type === 'Identifier' &&
          superClass.name === 'BaseBuildableBlankDto';

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
