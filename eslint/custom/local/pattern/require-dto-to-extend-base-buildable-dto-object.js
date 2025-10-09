const { ESLintUtils } = require('@typescript-eslint/utils');
const ts = require('typescript');

function isDtoDecorator(decorator) {
  const expr = decorator.expression;
  return (
    expr &&
    expr.type === 'CallExpression' &&
    expr.callee &&
    expr.callee.type === 'Identifier' &&
    (expr.callee.name === 'RequestDto' || expr.callee.name === 'ResponseDto')
  );
}

function getSimpleNameFromSymbol(sym, checker) {
  if (!sym) return null;
  try {
    const full = checker.getFullyQualifiedName(sym);
    const parts = full.split('.');
    return parts[parts.length - 1].replace(/"/g, '');
  } catch {
    return sym.getName?.() ?? null;
  }
}

function getClassInstanceType(tsNode, checker) {
  let symbol = tsNode.name
    ? checker.getSymbolAtLocation(tsNode.name)
    : checker.getSymbolAtLocation(tsNode);
  if (!symbol && tsNode.symbol) symbol = tsNode.symbol;

  if (symbol) {
    const declared = checker.getDeclaredTypeOfSymbol(symbol);
    if (declared) return declared;
  }

  return checker.getTypeAtLocation(tsNode);
}

function typeOrBasesIncludeBaseBuildableDtoObject(type, checker) {
  const seen = new Set();

  function dfs(t) {
    if (!t || seen.has(t)) return false;
    seen.add(t);

    const sym = t.getSymbol?.();
    const name = getSimpleNameFromSymbol(sym, checker);
    if (name === 'BaseBuildableDtoObject') return true;

    if (t.isClassOrInterface && t.isClassOrInterface()) {
      const bases = checker.getBaseTypes(t) ?? [];
      for (const b of bases) {
        if (dfs(b)) return true;
      }
    } else {
      const apparent = checker.getApparentType(t);
      if (apparent && apparent !== t && dfs(apparent)) return true;
    }

    const symbol = t.getSymbol?.();
    const declarations = symbol?.getDeclarations?.() ?? [];
    for (const decl of declarations) {
      if (
        ts.isClassDeclaration(decl) &&
        Array.isArray(decl.heritageClauses)
      ) {
        for (const hc of decl.heritageClauses) {
          if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
            for (const tExpr of hc.types) {
              const baseT = checker.getTypeAtLocation(tExpr.expression);
              if (dfs(baseT)) return true;
            }
          }
        }
      }
    }

    return false;
  }

  return dfs(type);
}

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-dto-to-extend-base-buildable-dto-object',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Classes decorated with @RequestDto or @ResponseDto must extend BaseBuildableDtoObject (directly or indirectly).',
      recommended: 'error',
    },
    schema: [],
    messages: {
      mustExtend:
        'Class decorated with @RequestDto or @ResponseDto must extend BaseBuildableDtoObject (directly or indirectly).',
      noTypeInfo:
        'Type information is required. Configure @typescript-eslint/parser with "parserOptions.project".',
    },
  },
  defaultOptions: [],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context, true);
    if (!parserServices || !parserServices.program) {
      const reportNoTypeInfo = (node) =>
        context.report({ node, messageId: 'noTypeInfo' });
      return {
        ClassDeclaration(node) {
          const hasDto = (node.decorators ?? []).some(isDtoDecorator);
          if (hasDto) reportNoTypeInfo(node);
        },
      };
    }

    const checker = parserServices.program.getTypeChecker();

    return {
      ClassDeclaration(node) {
        const decorators = node.decorators ?? [];
        const isDto = decorators.some(isDtoDecorator);
        if (!isDto) return;

        const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
        const instanceType = getClassInstanceType(tsNode, checker);

        const ok = typeOrBasesIncludeBaseBuildableDtoObject(instanceType, checker);
        if (!ok) {
          context.report({ node, messageId: 'mustExtend' });
        }
      },
    };
  },
});
