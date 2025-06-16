const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'enforce-constructor-param-order',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce constructor parameter order: super params first, then no modifier → public → protected → private',
      category: 'Best Practices',
      recommended: true,
      suggestion: false,
    },
    fixable: null,
    schema: [],
    messages: {
      incorrectOrder:
        'Constructor parameters should be ordered: super parameters first, then no modifier → public → protected → private.',
      superMismatch:
        'Constructor parameters for super call should come first and in the same order.',
    },
  },

  defaultOptions: [],

  create(context) {
    function getModifierRank(param) {
      if (param.type === 'TSParameterProperty') {
        switch (param.accessibility) {
          case 'public':
            return 1;
          case 'protected':
            return 2;
          case 'private':
            return 3;
          default:
            return 0;
        }
      } else if (param.modifiers && param.modifiers.length > 0) {
        for (const mod of param.modifiers) {
          if (mod.type === 'Modifier') {
            switch (mod.kind) {
              case 'public':
                return 1;
              case 'protected':
                return 2;
              case 'private':
                return 3;
            }
          }
        }
      }
      return 0;
    }

    function getParamName(param) {
      if (param.type === 'Identifier') {
        return param.name;
      } else if (param.type === 'TSParameterProperty') {
        if (param.parameter.type === 'Identifier') {
          return param.parameter.name;
        }
      }
      return '';
    }

    function getSuperArguments(node) {
      if (!node.value.body || !node.value.body.body) return [];

      const superCall = node.value.body.body.find(
        (stmt) =>
          stmt.type === 'ExpressionStatement' &&
          stmt.expression.type === 'CallExpression' &&
          stmt.expression.callee.type === 'Super',
      );

      if (!superCall) return [];

      return superCall.expression.arguments
        .map((arg) => {
          if (arg.type === 'Identifier') {
            return arg.name;
          }
          return null;
        })
        .filter(Boolean);
    }

    return {
      MethodDefinition(node) {
        if (node.kind !== 'constructor') return;

        const params = node.value.params || [];
        const superArgs = getSuperArguments(node);

        const paramInfos = params.map((param) => ({
          node: param,
          name: getParamName(param),
          rank: getModifierRank(param),
        }));

        for (let i = 0; i < superArgs.length; i++) {
          if (!paramInfos[i] || paramInfos[i].name !== superArgs[i]) {
            context.report({
              node: paramInfos[i]?.node || node,
              messageId: 'superMismatch',
            });
            return;
          }
        }

        const afterSuper = paramInfos.slice(superArgs.length);

        for (let i = 1; i < afterSuper.length; i++) {
          if (afterSuper[i].rank < afterSuper[i - 1].rank) {
            context.report({
              node: afterSuper[i].node,
              messageId: 'incorrectOrder',
            });
            return;
          }
        }
      },
    };
  },
});
