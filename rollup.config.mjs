import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

// 直接定义包名，避免导入package.json
const name = 'taro-color-picker';

const fileName = name;
const external = ['react', '@tarojs/taro', '@tarojs/components'];
const globals = {
  react: 'React',
  '@tarojs/taro': 'Taro',
  '@tarojs/components': 'components'
};

// 根据环境变量决定是否提取样式到单独文件
// 默认提取样式到单独文件，设置 INJECT_STYLES=true 环境变量可以启用样式自动注入
const extractStyles = process.env.INJECT_STYLES !== 'true';

// 基础配置
const baseConfig = {
  input: 'src/index.tsx',
  external,
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist'
    }),
    postcss({
      extract: extractStyles, // 是否分离样式到单独的CSS文件
      minimize: true,
      modules: false, // 不使用CSS Modules
      use: ['sass']
    })
  ]
};

// ESM 配置
const esmConfig = {
  ...baseConfig,
  output: {
    file: `dist/${fileName}.esm.js`,
    format: 'esm',
    sourcemap: true
  }
};

// CJS 配置
const cjsConfig = {
  ...baseConfig,
  output: {
    file: `dist/${fileName}.cjs.js`,
    format: 'cjs',
    sourcemap: true,
    exports: 'named'
  }
};

// UMD 配置
const umdConfig = {
  ...baseConfig,
  output: {
    file: `dist/${fileName}.umd.js`,
    format: 'umd',
    name: 'TaroColorPicker',
    sourcemap: true,
    globals,
    exports: 'named'
  },
  plugins: [
    ...baseConfig.plugins,
    terser() // 压缩UMD格式的代码
  ]
};

// 开发环境配置 - 不压缩代码
const devConfig = {
  ...baseConfig,
  output: {
    file: `dist/${fileName}.umd.js`,
    format: 'umd',
    name: 'TaroColorPicker',
    sourcemap: true,
    globals,
    exports: 'named'
  }
};

// 根据环境选择配置
const config = process.env.NODE_ENV === 'development' ? [devConfig, esmConfig, cjsConfig] : [umdConfig, esmConfig, cjsConfig];

export default config;