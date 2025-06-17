import { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  addons: ['@storybook/addon-essentials'],
  stories: ['../**/*.stories.@(j|t)sx'],
};

export default config;
