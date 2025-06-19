const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-ddd-entity-nullable-properties-to-be-optional',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Properties that include null must also be optional (?) in interfaces extending BaseEntityPropsInterface.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      mustBeOptional:
        'Property "{{propName}}" includes null but is not marked as optional (use "?").',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      TSInterfaceDeclaration(node) {
        const extendsBase = node.extends?.some((ext) => {
          return (
            ext.expression.type === 'Identifier' &&
            ext.expression.name === 'BaseEntityPropsInterface'
          );
        });

        if (!extendsBase) return;

        for (const member of node.body.body) {
          if (
            member.type !== 'TSPropertySignature' ||
            !member.typeAnnotation ||
            member.key.type !== 'Identifier'
          )
            continue;

          const propName = member.key.name;
          const typeAnnotation = member.typeAnnotation.typeAnnotation;

          const includesNull =
            typeAnnotation.type === 'TSUnionType' &&
            typeAnnotation.types.some((t) => t.type === 'TSNullKeyword');

          const isOptional = !!member.optional;

          if (includesNull && !isOptional) {
            context.report({
              node: member,
              messageId: 'mustBeOptional',
              data: { propName },
            });
          }
        }
      },
    };
  },
});
