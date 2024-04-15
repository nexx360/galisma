import { resolve as _resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export const mode = 'development';
export const entry = './src/app.ts';
export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};
export const resolve = {
  extensions: ['.tsx', '.ts', '.js'],
};
export const output = {
  filename: process.env.NODE_ENV === 'development' ? 'galisma.dev.js' : 'galisma.js',
  path: _resolve(__dirname, 'dist'),
};

export default {
  mode,
  entry,
  module,
  resolve,
  output,
};