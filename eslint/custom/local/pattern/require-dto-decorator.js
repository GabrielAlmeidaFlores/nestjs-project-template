const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-dto-decorator',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure RequestDto and ResponseDto classes use their respective decorators',
      recommended: 'error',
    },
    schema: [],
    messages: {
      missingRequestDto:
        'Classes ending with "RequestDto" must be decorated with @RequestDto().',
      missingResponseDto:
        'Classes ending with "ResponseDto" must be decorated with @ResponseDto().',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        if (!node.id?.name) return;

        const className = node.id.name;
        const decorators = node.decorators ?? [];

        const hasDecorator = (name) =>
          decorators.some(
            (decorator) =>
              decorator.expression.type === 'CallExpression' &&
              decorator.expression.callee.type === 'Identifier' &&
              decorator.expression.callee.name === name,
          );

        if (className.endsWith('RequestDto') && !hasDecorator('RequestDto')) {
          context.report({
            node,
            messageId: 'missingRequestDto',
          });
        }

        if (className.endsWith('ResponseDto') && !hasDecorator('ResponseDto')) {
          context.report({
            node,
            messageId: 'missingResponseDto',
          });
        }
      },
    };
  },
});
