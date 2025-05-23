module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require all class properties to be assigned in constructor if constructor exists, ignoring properties starting with "_"',
      category: 'Best Practices',
    },
    fixable: null,
    schema: [],
    messages: {
      uninitializedProperty:
        'Property "{{property}}" is declared but not assigned in the constructor.',
    },
  },
  create(context) {
    return {
      ClassDeclaration(node) {
        const constructor = node.body.body.find(
          (member) =>
            member.type === 'MethodDefinition' && member.kind === 'constructor',
        );

        if (!constructor) {
          return;
        }

        const classProperties = node.body.body.filter(
          (member) =>
            (member.type === 'PropertyDefinition' ||
              member.type === 'ClassProperty') &&
            !member.static &&
            member.key.type === 'Identifier' &&
            !member.key.name.startsWith('_'), 
        );

        const assignedProperties = new Set();

        if (
          constructor.value &&
          constructor.value.body &&
          constructor.value.body.type === 'BlockStatement'
        ) {
          for (const statement of constructor.value.body.body) {
            if (
              statement.type === 'ExpressionStatement' &&
              statement.expression.type === 'AssignmentExpression' &&
              statement.expression.left.type === 'MemberExpression' &&
              statement.expression.left.object.type === 'ThisExpression' &&
              statement.expression.left.property.type === 'Identifier'
            ) {
              assignedProperties.add(statement.expression.left.property.name);
            }
          }
        }

        for (const prop of classProperties) {
          const propName = prop.key.name;
          if (!assignedProperties.has(propName)) {
            context.report({
              node: prop.key,
              messageId: 'uninitializedProperty',
              data: { property: propName },
            });
          }
        }
      },
    };
  },
};
