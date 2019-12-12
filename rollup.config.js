import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const deps = Object.keys(pkg.dependencies || {});
const peerDeps = Object.keys(pkg.peerDependencies || {});
const defaultExternal = deps.concat(peerDeps);

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
    },
  ],
  external: defaultExternal,
  plugins: [
    resolve({
      extensions: ['.js', '.jsx'],
    }),
    terser(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      presets: ['amex'],
      exclude: 'node_modules/**',
    }),
  ],
};
