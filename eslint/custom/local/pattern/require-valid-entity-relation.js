const path = require('path');
const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'require-valid-entity-relation',
  meta: {
    type: 'problem',
    docs: {
      description: 'Enforce correct entity relation typing across bounded contexts.',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      mustUseDirectEntity:
        'Use the entity directly (e.g. CustomerEntity) for entities in the same bounded context (do not wrap in RelationModel).',
      mustUseOnlyRelationModel:
        'Use RelationModel<Entity> for entities from a different bounded context.',
      cannotMixEntityTypes:
        'Do not use a union like RelationModel<Entity> | Entity. Use only one consistent type.',
    },
  },
  defaultOptions: [],
  create(context) {
    const fileName = context.getFilename();
    const parserServices = ESLintUtils.getParserServices(context);
    const typeChecker = parserServices.program.getTypeChecker();

    function getBoundedContextFromPath(filePath) {
      const normalized = filePath.replace(/\\/g, '/');
      const match = normalized.match(/entity\/([^/]+)\//);
      return match ? match[1] : null;
    }

    const currentBoundedContext = getBoundedContextFromPath(fileName);

    function isEntity(type) {
      return type.symbol?.getDeclarations()?.some((decl) =>
        decl.getText().includes('extends BaseEntity'),
      );
    }

    function isRelationModelType(type) {
      return type.symbol?.name === 'RelationModel';
    }

    function extractReferencedEntityFromRelationModel(type) {
      if (type.aliasTypeArguments?.length === 1) {
        return type.aliasTypeArguments[0];
      }
      if (type.symbol?.name === 'RelationModel' && type.typeArguments?.length === 1) {
        return type.typeArguments[0];
      }
      return null;
    }

    return {
      ClassDeclaration(node) {
        const classType = parserServices.esTreeNodeToTSNodeMap.get(node);
        const classSymbol = typeChecker.getSymbolAtLocation(classType.name);
        if (!classSymbol) return;

        const classTypeDetails = typeChecker.getDeclaredTypeOfSymbol(classSymbol);
        const properties = classTypeDetails.getProperties();

        for (const prop of properties) {
          const declarations = prop.getDeclarations();
          if (!declarations || declarations.length === 0) continue;

          const declaration = declarations[0];
          const propType = typeChecker.getTypeOfSymbolAtLocation(prop, declaration);

          const typesToCheck = propType.isUnion() ? propType.types : [propType];

          if (typesToCheck.length > 1) {
            const hasRelationModel = typesToCheck.some(isRelationModelType);
            const hasEntity = typesToCheck.some(isEntity);
            if (hasRelationModel && hasEntity) {
              context.report({
                node,
                messageId: 'cannotMixEntityTypes',
              });
              continue;
            }
          }

          for (const type of typesToCheck) {
            let actualEntityType = type;
            let isWrappedInRelationModel = false;

            if (isRelationModelType(type)) {
              const extracted = extractReferencedEntityFromRelationModel(type);
              if (!extracted || !isEntity(extracted)) continue;
              isWrappedInRelationModel = true;
              actualEntityType = extracted;
            } else if (!isEntity(type)) {
              continue;
            }

            const entityDecl = actualEntityType.symbol?.getDeclarations()?.[0];
            if (!entityDecl) continue;

            const entityFileName = entityDecl.getSourceFile()?.fileName || '';
            const entityContext = getBoundedContextFromPath(entityFileName);

            if (entityContext === 'base' || currentBoundedContext === 'base') {
              continue;
            }

            const isSameContext = entityContext === currentBoundedContext;

            if (isSameContext && isWrappedInRelationModel) {
              context.report({
                node,
                messageId: 'mustUseDirectEntity',
              });
            } else if (!isSameContext && !isWrappedInRelationModel) {
              context.report({
                node,
                messageId: 'mustUseOnlyRelationModel',
              });
            }
          }
        }
      },
    };
  },
});
