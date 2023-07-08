module.exports = {
  extends: ['@commitlint/config-conventional'],
  'type-enum': [
    2,
    'always',
    ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'build', 'ci', 'chore', 'revert'],
  ],
};