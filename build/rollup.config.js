import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'rollup-plugin-node-builtins'
import uglify from 'rollup-plugin-uglify'

function config (prod) {
  const plugins = [
    builtins(),
    babel({
      exclude: 'node_modules/**'
    }),
    commonjs(),
    resolve({
      browser: true,
      main: true
    })
  ]
  if (prod) {
    plugins.push(uglify())
  }
  const min = prod ? '.min' : ''
  return {
    input: 'src/index.js',
    output: {
      file: `dist/react-stub${min}.js`,
      format: 'umd',
      name: 'ReactStub',
      exports: 'named',
      sourcemap: true,
      globals: {
        'react': 'React',
        'prop-types': 'PropTypes'
      }
    },
    external: [ 'react', 'prop-types' ],
    plugins
  }
}

export default [
  config(),
  config(true)
]