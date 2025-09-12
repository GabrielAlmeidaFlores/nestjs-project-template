const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'restrict-typeorm-relation-type',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Restrict TypeScript types of TypeORM relation properties to match their relation decorators.',
      recommended: true,
    },
    schema: [],
    messages: {
      arrayTypeMismatch:
        'Property "{{ propertyName }}" uses @{{ decoratorName }} but is not typed as an array (expected {{ expectedType }}[]).',
      nonArrayTypeMismatch:
        'Property "{{ propertyName }}" uses @{{ decoratorName }} but is typed as an array (should be just {{ expectedType }}).',
    },
  },
  defaultOptions: [],
  create(context) {
    function extractEffectiveType(typeNode) {
      if (typeNode.type === 'TSUnionType') {
        const nonUndefined = typeNode.types.find(
          (t) => t.type !== 'TSUndefinedKeyword' && t.type !== 'TSNullKeyword',
        );
        return extractEffectiveType(nonUndefined);
      }

      return typeNode;
    }

    return {
      PropertyDefinition(node) {
        if (!node.decorators || !node.typeAnnotation) return;

        const propertyName = node.key.name;
        const rawTypeNode = node.typeAnnotation.typeAnnotation;
        const typeNode = extractEffectiveType(rawTypeNode);

        let expectedType = 'unknown';
        let isArrayType = false;

        if (typeNode.type === 'TSArrayType') {
          isArrayType = true;
          expectedType = context.getSourceCode().getText(typeNode.elementType);
        } else if (
          typeNode.type === 'TSTypeReference' &&
          typeNode.typeName.type === 'Identifier'
        ) {
          const typeName = typeNode.typeName.name;
          expectedType = typeName.replace(/\[\]$/, '');
          isArrayType = /\[\]$/.test(typeName);
        }

        for (const decorator of node.decorators) {
          const expression = decorator.expression;

          if (
            expression.type !== 'CallExpression' ||
            expression.callee.type !== 'Identifier'
          )
            continue;

          const decoratorName = expression.callee.name;

          const requiresArray =
            decoratorName === 'OneToMany' || decoratorName === 'ManyToMany';
          const disallowsArray =
            decoratorName === 'OneToOne' || decoratorName === 'ManyToOne';

          if (!requiresArray && !disallowsArray) continue;

          if (requiresArray && !isArrayType) {
            context.report({
              node: node.typeAnnotation,
              messageId: 'arrayTypeMismatch',
              data: {
                decoratorName,
                propertyName,
                expectedType,
              },
            });
          }

          if (disallowsArray && isArrayType) {
            context.report({
              node: node.typeAnnotation,
              messageId: 'nonArrayTypeMismatch',
              data: {
                decoratorName,
                propertyName,
                expectedType,
              },
            });
          }
        }
      },
    };
  },
});
