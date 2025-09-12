const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'restrict-constructor-parameter-order',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce constructor parameter order: super params first (only pass-through), then no modifier → public → protected → private',
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
      }

      if (param.modifiers && param.modifiers.length > 0) {
        for (const mod of param.modifiers) {
          if (mod.type === 'Modifier') {
            switch (mod.kind) {
              case 'public':
                return 1;
              case 'protected':
                return 2;
              case 'private':
                return 3;
              default:
                break;
            }
          }
        }
      }

      return 0; 
    }

    function getParamName(param) {
      if (param.type === 'Identifier') return param.name;

      if (param.type === 'TSParameterProperty') {
        const p = param.parameter;
        if (p.type === 'Identifier') return p.name;
        if (p.type === 'AssignmentPattern' && p.left.type === 'Identifier') {
          return p.left.name;
        }
      }

      if (param.type === 'AssignmentPattern' && param.left.type === 'Identifier') {
        return param.left.name;
      }

      if (param.type === 'RestElement' && param.argument.type === 'Identifier') {
        return param.argument.name;
      }

      return '';
    }

    function getParamNameSet(params) {
      return new Set(params.map(getParamName).filter(Boolean));
    }

    function getSuperPassThroughArgs(node, paramNameSet) {
      if (!node.value.body || !node.value.body.body) return [];

      const superCall = node.value.body.body.find(
        (stmt) =>
          stmt.type === 'ExpressionStatement' &&
          stmt.expression.type === 'CallExpression' &&
          stmt.expression.callee.type === 'Super',
      );

      if (!superCall) return [];

      return superCall.expression.arguments
        .map((arg) => (arg.type === 'Identifier' ? arg.name : null))
        .filter((name) => !!name && paramNameSet.has(name));
    }

    return {
      MethodDefinition(node) {
        if (node.kind !== 'constructor') return;

        const params = node.value.params || [];
        const paramInfos = params.map((param) => ({
          node: param,
          name: getParamName(param),
          rank: getModifierRank(param),
        }));
        const paramNameSet = getParamNameSet(params);
        const superArgs = getSuperPassThroughArgs(node, paramNameSet);

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
