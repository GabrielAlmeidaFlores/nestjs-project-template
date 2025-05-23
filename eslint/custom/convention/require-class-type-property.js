module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Enforce non-abstract classes to have a protected readonly _type property with <ClassName>.name',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          propertyName: {
            type: 'string',
            default: '_type',
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = context.options[0] || {};
    const propertyName = options.propertyName || '_type';

    return {
      ClassDeclaration(node) {
        if (node.abstract) {
          return;
        }

        const className = node.id.name;
        let foundProperty = null;

        for (const member of node.body.body) {
          if (
            member.type === 'PropertyDefinition' &&
            member.key.type === 'Identifier' &&
            member.key.name === propertyName
          ) {
            foundProperty = member;
            break;
          }
        }

        if (!foundProperty) {
          context.report({
            node: node.id,
            message: `Class '${className}' must have a '${propertyName}' property initialized with '${className}.name'`,
          });
          return;
        }

        const isProtectedReadonly =
          foundProperty.accessibility === 'protected' &&
          foundProperty.readonly === true;

        if (!isProtectedReadonly) {
          context.report({
            node: foundProperty,
            message: `'${propertyName}' property must be declared as 'protected readonly'`,
          });
        }

        if (
          !foundProperty.value ||
          foundProperty.value.type !== 'MemberExpression' ||
          foundProperty.value.object.type !== 'Identifier' ||
          foundProperty.value.object.name !== className ||
          foundProperty.value.property.type !== 'Identifier' ||
          foundProperty.value.property.name !== 'name'
        ) {
          context.report({
            node: foundProperty.value || foundProperty,
            message: `'${propertyName}' must be initialized with '${className}.name'`,
          });
        }
      },
    };
  },
};
