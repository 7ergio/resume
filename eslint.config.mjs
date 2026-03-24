// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-console': ['warn', { allow: ['warn'] }],
    'no-unused-vars': 'warn',
    'vue/no-unused-vars': 'warn',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/no-multiple-template-root': 'off'
  }
})
