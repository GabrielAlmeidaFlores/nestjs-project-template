const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-valid-error-constructor',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure that classes indirectly extending BaseError have a valid public constructor with proper parameters and a super(message) call.',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    schema: [],
    messages: {
      missingConstructor: 'Error class must have a valid public constructor.',
      invalidConstructorParams:
        'Constructor must have no parameters or a single "props" parameter of object type.',
      missingSuperCall: 'Constructor must call super(message).',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();

    function isIndirectlyExtendingBaseError(node) {
      const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
      const symbol = typeChecker.getSymbolAtLocation(tsNode.name);
      if (!symbol) return false;

      let currentType = typeChecker.getDeclaredTypeOfSymbol(symbol);
      let baseChain = currentType.getBaseTypes?.() || [];

      const directBase = baseChain[0];
      if (!directBase || directBase.symbol?.getName() === 'BaseError') {
        return false;
      }

      while (baseChain.length > 0) {
        const nextBase = baseChain[0];
        if (nextBase.symbol?.getName() === 'BaseError') return true;
        baseChain = nextBase.getBaseTypes?.() || [];
      }

      return false;
    }

    return {
      ClassDeclaration(node) {
        if (!isIndirectlyExtendingBaseError(node)) return;

        const constructor = node.body.body.find(
          (m) => m.type === 'MethodDefinition' && m.kind === 'constructor',
        );

        if (!constructor || constructor.accessibility !== 'public') {
          context.report({ node, messageId: 'missingConstructor' });
          return;
        }

        const params = constructor.value.params;
        if (
          params.length > 1 ||
          (params.length === 1 &&
            (params[0].type !== 'Identifier' || params[0].name !== 'props'))
        ) {
          context.report({
            node: constructor,
            messageId: 'invalidConstructorParams',
          });
          return;
        }

        const bodyStatements = constructor.value.body?.body || [];
        const hasSuperCall = bodyStatements.some(
          (stmt) =>
            stmt.type === 'ExpressionStatement' &&
            stmt.expression.type === 'CallExpression' &&
            stmt.expression.callee.type === 'Super',
        );

        if (!hasSuperCall) {
          context.report({ node: constructor, messageId: 'missingSuperCall' });
        }
      },
    };
  },
});
