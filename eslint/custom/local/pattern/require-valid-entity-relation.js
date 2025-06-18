const path = require('path');
const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-valid-entity-relation',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforces correct entity relation typing across bounded contexts.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      mustUseDirectEntity: 'Entities in the same bounded context must be referenced directly, without RelationModel.',
      mustUseOnlyRelationModel: 'Entities in a different bounded context must be referenced only as RelationModel<Entity>.',
      mustNotMixEntities: 'Cannot mix different entity types in a relation.',
    },
  },
  defaultOptions: [],
  create(context) {
    const fileName = context.getFilename();

    function getBoundedContext(filePath) {
      const match = filePath.match(/entity\/([^/]+)\//);
      return match ? match[1] : null;
    }

    const currentBoundedContext = getBoundedContext(fileName);

    function checkTypeAnnotation(typeAnnotationNode) {
      const typeNode = typeAnnotationNode.typeAnnotation;

      const types =
        typeNode.type === 'TSUnionType'
          ? typeNode.types
          : typeNode.type === 'TSTypeReference'
          ? [typeNode]
          : [];

      if (types.length === 0) return;

      const getEntityFromTypeReference = (ref) => {
        if (ref.typeName?.name === 'RelationModel' && ref.typeParameters?.params[0]) {
          return ref.typeParameters.params[0].typeName?.name;
        }
        return ref.typeName?.name;
      };

      const importDecls = context.getSourceCode().ast.body.filter(
        (stmt) => stmt.type === 'ImportDeclaration'
      );

      const entityBoundedContexts = types.map((refType) => {
        if (refType.type !== 'TSTypeReference') return null;

        const entityName = getEntityFromTypeReference(refType);
        if (!entityName) return null;

        const importDecl = importDecls.find((stmt) =>
          stmt.specifiers.some((s) => s.local.name === entityName)
        );
        if (!importDecl) return null;

        const importPath = importDecl.source.value;
        const importedBoundedContext = getBoundedContext(importPath);
        return { refType, entityName, importedBoundedContext };
      });

      const isCrossContext = entityBoundedContexts.some(
        (entry) => entry && entry.importedBoundedContext !== currentBoundedContext
      );

      if (isCrossContext) {
        if (
          types.length !== 1 ||
          types[0].type !== 'TSTypeReference' ||
          types[0].typeName.name !== 'RelationModel'
        ) {
          context.report({ node: typeAnnotationNode, messageId: 'mustUseOnlyRelationModel' });
          return;
        }
      } else {
        if (
          types.length !== 1 ||
          types[0].type !== 'TSTypeReference' ||
          types[0].typeName.name === 'RelationModel'
        ) {
          context.report({ node: typeAnnotationNode, messageId: 'mustUseDirectEntity' });
          return;
        }
      }

      // Extra: validate if same entity is used
      if (types.length === 2) {
        const [firstEntity, secondEntity] = types.map(getEntityFromTypeReference);
        if (firstEntity !== secondEntity) {
          context.report({ node: typeAnnotationNode, messageId: 'mustNotMixEntities' });
        }
      }
    }

    return {
      ClassProperty(node) {
        if (node.typeAnnotation) {
          checkTypeAnnotation(node.typeAnnotation);
        }
      },
      TSPropertySignature(node) {
        if (node.typeAnnotation) {
          checkTypeAnnotation(node.typeAnnotation);
        }
      },
    };
  },
});
