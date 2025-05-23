module.exports = {
  'import/no-unresolved': 'error',
  'import/no-duplicates': 'error',
  'import/no-extraneous-dependencies': [
    'error',
    { devDependencies: ['**/*.spec.ts', '**/*.test.ts'] },
  ],
  'import/order': [
    'error',
    {
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'object',
        'type',
      ],
      'newlines-between': 'always',
      alphabetize: { order: 'asc', caseInsensitive: true },
    },
  ],
  'import/no-cycle': 'error',
  'import/no-anonymous-default-export': 'error',
  'import/no-unused-modules': 'error',
};
