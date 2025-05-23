module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description:
        "Enforce @RequireBuildMethod decorator on non-abstract classes ending with 'Entity' or 'ResponseDto'",
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      missingDecorator:
        "Non-abstract classes ending with 'Entity' or 'ResponseDto' must have a @RequireBuildMethod decorator with the class name as the generic type.",
      missingGenericType:
        "The @RequireBuildMethod decorator must specify a generic type matching the class name '{{className}}'.",
      incorrectGenericType:
        "The @RequireBuildMethod decorator must use the class name '{{className}}' as its generic type, found '{{foundType}}'.",
    },
  },
  create(context) {
    const sourceCode = context.getSourceCode();

    return {
      ClassDeclaration(node) {
        if (node.abstract) {
          return;
        }

        const className = node.id && node.id.name;
        if (!className || !/(Entity|ResponseDto)$/.test(className)) {
          return;
        }

        const decorators = node.decorators || [];
        let hasRequireBuildMethod = false;
        let hasCorrectGenericType = false;
        let foundType = null;

        for (const decorator of decorators) {
          if (
            decorator.expression.type === 'CallExpression' &&
            decorator.expression.callee.name === 'RequireBuildMethod'
          ) {
            hasRequireBuildMethod = true;

            const decoratorText = sourceCode.getText(decorator);
            const typeMatch = decoratorText.match(
              /@RequireBuildMethod\s*<\s*([^>]+)\s*>\s*\(\s*\)/,
            );

            if (typeMatch && typeMatch[1]) {
              foundType = typeMatch[1].trim();
              const typeName = foundType.includes('.')
                ? foundType.split('.').pop()
                : foundType;

              if (typeName === className) {
                hasCorrectGenericType = true;
              }
            } else {
              foundType = '<empty>';
            }
          }
        }

        if (!hasRequireBuildMethod) {
          context.report({
            node,
            messageId: 'missingDecorator',
          });
        } else if (!hasCorrectGenericType) {
          if (foundType === '<empty>') {
            context.report({
              node,
              messageId: 'missingGenericType',
              data: { className },
            });
          } else {
            context.report({
              node,
              messageId: 'incorrectGenericType',
              data: { className, foundType },
            });
          }
        }
      },
    };
  },
};