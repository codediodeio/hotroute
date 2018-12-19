import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: './src/index.ts',
  output: [{
    file: './dist/bundle.js',
    format: 'esm',
    name: 'hotroute'
}],
  plugins: [
    resolve(),
    typescript()
  ]
}