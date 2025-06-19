const { ESLintUtils } = require('@typescript-eslint/utils');

module.exports = ESLintUtils.RuleCreator.withoutDocs({
  name: 'forbid-non-typeorm-type-usage',
  meta: {
    type: 'problem',
    docs: {
      description:
        'Disallow using DDD entity types inside TypeORM entity or props interface files.',
      recommended: 'error',
    },
    schema: [],
    messages: {
      forbiddenEntityUsage:
        'You cannot reference non-TypeORM entity "{{typeName}}" inside a TypeORM entity or props interface file.',
    },
  },
  defaultOptions: [],
  create(context) {
    const filename = context.getFilename();

    const isTypeormFile =
      filename.endsWith('.typeorm.entity.ts') ||
      filename.endsWith('.typeorm.entity.props.interface.ts');

    if (!isTypeormFile) return {};

    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices.program.getTypeChecker();

    return {
      TSTypeReference(node) {
        if (node.typeName.type !== 'Identifier') return;

        const typeName = node.typeName.name;

        const endsWithEntity = typeName.endsWith('Entity');
        const endsWithTypeormEntity = typeName.endsWith('TypeormEntity');

        if (endsWithEntity && !endsWithTypeormEntity) {
          const symbol = checker.getSymbolAtLocation(
            parserServices.esTreeNodeToTSNodeMap.get(node.typeName),
          );

          if (symbol && symbol.declarations?.[0]) {
            context.report({
              node,
              messageId: 'forbiddenEntityUsage',
              data: { typeName },
            });
          }
        }
      },
    };
  },
});
