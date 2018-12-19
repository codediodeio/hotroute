import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: './src/index.ts',
  output: [
    {
      file: './dist/bundle.mjs',
      format: 'esm'
    },
    {
      file: './dist/bundle.js',
      format: 'cjs'
    },
    {
      file: './dist/bundle.umd.js',
      format: 'umd',
      name: 'hotroute'
    }
],
  plugins: [
    resolve(),
    commonjs(),
    typescript()
  ]
}


