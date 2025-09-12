const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'ddd-null-undef-consistency',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce DDD null/undefined policy: Interfaces (props) must use optional+null together; Entities must not use undefined or optional props.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      mustIncludeNullWhenUndefinable:
        'Property "{{propName}}" is undefinable (optional or includes undefined) but its type does not include null.',
      mustBeUndefinableWhenNullable:
        'Property "{{propName}}" includes null but is not undefinable (neither optional nor includes undefined).',
      noUndefinedInEntity:
        'Entity property "{{propName}}" should not be optional or include undefined. Use a concrete type or null.',
    },
  },
  defaultOptions: [],
  create(context) {
    const typeIncludes = (typeNode, kind) =>
      typeNode?.type === 'TSUnionType' &&
      typeNode.types.some((t) => t.type === kind);

    const isExtending = (node, id) =>
      node.extends?.some(
        (ext) => ext.expression.type === 'Identifier' && ext.expression.name === id,
      );

    return {
      TSInterfaceDeclaration(node) {
        if (!isExtending(node, 'BaseEntityPropsInterface')) return;

        for (const member of node.body.body) {
          if (
            member.type !== 'TSPropertySignature' ||
            !member.typeAnnotation ||
            member.key.type !== 'Identifier'
          ) continue;

          const propName = member.key.name;
          const typeNode = member.typeAnnotation.typeAnnotation;

          const includesNull = typeIncludes(typeNode, 'TSNullKeyword');
          const includesUndefined = typeIncludes(typeNode, 'TSUndefinedKeyword');
          const isOptional = Boolean(member.optional);

          const isUndefinable = isOptional || includesUndefined;

          if (isUndefinable && !includesNull) {
            context.report({
              node: member,
              messageId: 'mustIncludeNullWhenUndefinable',
              data: { propName },
            });
          }

          if (includesNull && !isUndefinable) {
            context.report({
              node: member,
              messageId: 'mustBeUndefinableWhenNullable',
              data: { propName },
            });
          }
        }
      },

      ClassDeclaration(node) {
        if (
          !node.superClass ||
          node.superClass.type !== 'Identifier' ||
          node.superClass.name !== 'BaseEntity'
        ) return;

        for (const member of node.body.body) {
          if (
            member.type !== 'PropertyDefinition' ||
            member.key.type !== 'Identifier'
          ) continue;

          const propName = member.key.name;

          if (member.optional) {
            context.report({
              node: member,
              messageId: 'noUndefinedInEntity',
              data: { propName },
            });
            continue;
          }

          const typeNode = member.typeAnnotation?.typeAnnotation;
          const includesUndefined =
            typeNode &&
            typeNode.type === 'TSUnionType' &&
            typeNode.types.some((t) => t.type === 'TSUndefinedKeyword');

          if (includesUndefined) {
            context.report({
              node: member,
              messageId: 'noUndefinedInEntity',
              data: { propName },
            });
          }
        }
      },
    };
  },
});
