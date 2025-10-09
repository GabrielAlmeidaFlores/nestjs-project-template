const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-matching-dto-property-decorators',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Classes decorated with @RequestDto or @ResponseDto must use corresponding property decorators only.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      invalidDecoratorUsage:
        'Property decorator "{{decorator}}" is not allowed in a class decorated with "{{dtoType}}".',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const decorators = node.decorators || [];

        const isRequestDto = decorators.some(
          (dec) =>
            dec.expression.type === 'CallExpression' &&
            dec.expression.callee.type === 'Identifier' &&
            dec.expression.callee.name === 'RequestDto',
        );

        const isResponseDto = decorators.some(
          (dec) =>
            dec.expression.type === 'CallExpression' &&
            dec.expression.callee.type === 'Identifier' &&
            dec.expression.callee.name === 'ResponseDto',
        );

        if (!isRequestDto && !isResponseDto) return;

        const expectedPrefix = isRequestDto ? 'RequestDto' : 'ResponseDto';
        const dtoType = isRequestDto ? 'RequestDto' : 'ResponseDto';

        for (const member of node.body.body) {
          if (member.type !== 'PropertyDefinition' || !member.decorators) {
            continue;
          }

          for (const dec of member.decorators) {
            const expr = dec.expression;
            if (
              expr.type === 'CallExpression' &&
              expr.callee.type === 'Identifier'
            ) {
              const name = expr.callee.name;
              if (!name.startsWith(expectedPrefix)) {
                context.report({
                  node: dec,
                  messageId: 'invalidDecoratorUsage',
                  data: {
                    decorator: name,
                    dtoType,
                  },
                });
              }
            }
          }
        }
      },
    };
  },
});
