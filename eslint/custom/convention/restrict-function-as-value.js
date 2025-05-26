module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce that function calls must be encapsulated in variables except for standalone calls, callbacks, decorators, and class properties",
      category: "Best Practices",
    },
    schema: []
  },
  create(context) {
    // Helper to check if node is inside a decorator
    function isInsideDecorator(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'Decorator') {
          return true;
        }
        parent = parent.parent;
      }
      return false;
    }

    // Helper to check if node is in a class property
    function isClassProperty(node) {
      let parent = node.parent;
      while (parent) {
        if (parent.type === 'PropertyDefinition') {
          return true;
        }
        if (parent.type === 'ClassBody' || parent.type === 'ClassDeclaration') {
          return false;
        }
        parent = parent.parent;
      }
      return false;
    }

    return {
      CallExpression(node) {
        // Skip if inside decorator
        if (isInsideDecorator(node)) {
          return;
        }

        // Skip if in class property (allowed)
        if (isClassProperty(node)) {
          return;
        }

        // Skip if parent is a variable declaration (allowed)
        if (node.parent.type === 'VariableDeclarator') {
          return;
        }

        // Skip if parent is an expression statement (standalone call - allowed)
        if (node.parent.type === 'ExpressionStatement') {
          return;
        }

        // Skip if inside a callback (ArrowFunctionExpression or FunctionExpression - allowed)
        const isInsideCallback = [
          'ArrowFunctionExpression',
          'FunctionExpression'
        ].includes(node.parent.type);
        
        if (isInsideCallback) {
          return;
        }

        // Skip if it's a constructor call (new MyClass())
        if (node.parent.type === 'NewExpression') {
          return;
        }

        // Block ALL other function calls, including member expressions
        context.report({
          node,
          message: 'All function calls must be encapsulated in a variable before use' 
        });
      }
    };
  }
};