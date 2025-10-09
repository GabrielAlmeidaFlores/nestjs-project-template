const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-dto-required-to-match-optional',
  meta: {
    type: 'problem',
    docs: {
      description:
        'For classes decorated with @RequestDto or @ResponseDto: if a property decorator has { required: false }, the property must be optional ("?"). Conversely, if a property is optional ("?"), at least one decorator must specify { required: false }.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      mustBeOptional:
        'This property decorator specifies { required: false }, so the property must be declared with "?".',
      optionalNeedsRequiredFalse:
        'This property is declared optional ("?"), but no decorator specifies { required: false }. Add { required: false } to the corresponding decorator options.',
      optionalConflictsWithRequiredTrue:
        'This property is declared optional ("?"), but a decorator specifies { required: true }. Remove "?" or change the decorator to { required: false }.'
    },
  },
  defaultOptions: [],
  create(context) {
    const sourceCode = context.getSourceCode();
    const importMap = buildImportMap(sourceCode.ast);

    const classDtoDecoratorNames = new Set(
      namesImportedFromPathContains(importMap, '/dto-specification/')
    );

    function classHasRequestOrResponseDtoDecorator(classNode) {
      const decorators = classNode.decorators ?? [];
      return decorators.some((d) => {
        const id = getDecoratorCalleeIdentifier(d.expression);
        return id && classDtoDecoratorNames.has(id.name);
      });
    }

    return {
      ClassDeclaration(node) {
        if (!classHasRequestOrResponseDtoDecorator(node)) return;

        for (const member of node.body.body) {
          if (
            member.type !== 'PropertyDefinition' &&
            member.type !== 'ClassProperty'
          ) continue;

          const decorators = member.decorators ?? [];
          if (decorators.length === 0) continue;

          let sawRequiredFalse = false;
          let sawRequiredTrue = false;

          for (const dec of decorators) {
            const expr = dec.expression;
            if (expr?.type !== 'CallExpression') continue;

            for (const arg of expr.arguments) {
              if (arg?.type !== 'ObjectExpression') continue;

              const reqProp = arg.properties.find(
                (p) =>
                  p.type === 'Property' &&
                  ((p.key.type === 'Identifier' && p.key.name === 'required') ||
                   (p.key.type === 'Literal' && p.key.value === 'required'))
              );
              if (!reqProp) continue;

              const v = reqProp.value;
              if (v.type === 'Literal') {
                if (v.value === false) sawRequiredFalse = true;
                if (v.value === true)  sawRequiredTrue  = true;
              }
            }
          }

          const isOptional = member.optional === true;

          if (sawRequiredFalse && !isOptional) {
            context.report({ node: member, messageId: 'mustBeOptional' });
            continue;
          }

          if (isOptional) {
            if (sawRequiredTrue) {
              context.report({
                node: member,
                messageId: 'optionalConflictsWithRequiredTrue',
              });
              continue;
            }
            if (!sawRequiredFalse) {
              context.report({
                node: member,
                messageId: 'optionalNeedsRequiredFalse',
              });
            }
          }
        }
      },
    };
  },
});

function buildImportMap(ast) {
  const map = new Map();
  for (const node of ast.body) {
    if (node.type === 'ImportDeclaration') {
      const source = node.source.value;
      for (const spec of node.specifiers) {
        if (
          spec.type === 'ImportSpecifier' ||
          spec.type === 'ImportDefaultSpecifier'
        ) {
          map.set(spec.local.name, source);
        }
      }
    }
  }
  return map;
}

function namesImportedFromPathContains(importMap, substring) {
  const names = [];
  for (const [local, source] of importMap.entries()) {
    if (typeof source === 'string' && source.includes(substring)) {
      names.push(local);
    }
  }
  return names;
}

function getDecoratorCalleeIdentifier(expr) {
  if (!expr) return null;
  if (expr.type === 'Identifier') return expr;
  if (expr.type === 'CallExpression') {
    const c = expr.callee;
    if (c.type === 'Identifier') return c;
    if (c.type === 'MemberExpression' && c.property.type === 'Identifier') {
      return c.property; 
    }
  }
  return null;
}
