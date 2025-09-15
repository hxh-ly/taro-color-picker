# taro-color-picker

一个高度可定制的颜色选择器组件，专为React/Taro框架设计，同时支持小程序和H5平台。

## 组件介绍

Taro Color Picker是一款功能完备的颜色选择工具，为开发者提供直观、易用的颜色选择体验。组件采用模块化设计，支持多种颜色格式，可无缝集成到各类React和Taro项目中，包括小程序和H5应用。

## 核心功能

- 🎨 **丰富的颜色选择方式**：支持色相环选择、RGB滑块调节和透明度控制
- 📱 **跨平台兼容**：完美支持Taro框架下的微信小程序、支付宝小程序等多平台和H5应用
- 📦 **多模块格式支持**：提供CommonJS、ES Modules和UMD三种打包格式，适配不同项目需求
- 🎛️ **高度可定制**：支持自定义预设颜色、禁用状态、样式覆盖等配置项
- 🎡 **响应式设计**：自适应不同屏幕尺寸，确保在各种设备上都有良好的用户体验
- 🔄 **即时颜色反馈**：颜色变化时实时更新，提供直观的视觉反馈
- ⚡ **轻量级实现**：优化的代码结构，减少对项目性能的影响

## 设计理念

该组件遵循"简单易用，高度灵活"的设计原则，通过简洁的API和丰富的配置选项，既满足基础开发需求，也能应对复杂的定制场景。组件内部实现了颜色格式转换、事件处理等细节，让开发者能够专注于业务逻辑开发。

## 安装

```bash
npm install taro-color-picker --save
# 或者
pnpm add taro-color-picker
# 或者
cnpm install taro-color-picker --save
# 或者
yarn add taro-color-picker
```

## 使用示例

### 基础用法

```jsx
import React, { useState } from 'react';
import { View } from '@tarojs/components';
import ColorPicker from 'taro-color-picker';
import 'taro-color-picker/taro-color-picker.esm.css'; // 导入样式文件

const App = () => {
  const [color, setColor] = useState('#FF5733');

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  return (
    <View style={{ padding: '20px' }}>
      <View style={{ 
        width: '100px', 
        height: '100px', 
        backgroundColor: color,
        marginBottom: '20px'
      }} />
  
      <ColorPicker 
        value={color} 
        onChange={handleColorChange} 
        presetColors={['#FF5733', '#33FF57', '#3357FF', '#F3FF33']}
        disabled={false}
      />
    </View>
  );
};

export default App;
```

### 高级配置示例

```jsx
import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import ColorPicker from 'taro-color-picker';
import 'taro-color-picker/taro-color-picker.esm.css';

const App = () => {
  const [color, setColor] = useState('#1890ff');
  const [isDisabled, setIsDisabled] = useState(false);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    console.log('Selected color:', newColor);
  };

  // 自定义预设颜色
  const customPresetColors = [
    '#1890ff', '#52c41a', '#faad14', '#f5222d',
    '#722ed1', '#13c2c2', '#eb2f96', '#fa8c16'
  ];

  // 自定义滑块样式
  const customSliderStyle = {
    trackColor: '#f0f0f0',
    thumbColor: '#fff',
    activeColor: '#1890ff'
  };

  return (
    <View style={{ padding: '20px' }}>
      <View style={{ marginBottom: '20px' }}>
        <Text>当前选择的颜色: {color}</Text>
      </View>
      
      <View style={{
        width: '100px',
        height: '100px',
        backgroundColor: color,
        borderRadius: '8px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
      }} />
      
      <ColorPicker 
        value={color}
        onChange={handleColorChange}
        presetColors={customPresetColors}
        disabled={isDisabled}
        className="my-custom-color-picker"
        style={{ border: '1px solid #d9d9d9', borderRadius: '8px' }}
        sliderStyle={customSliderStyle}
      />
      
      <View style={{ marginTop: '20px' }}>
        <button onClick={() => setIsDisabled(!isDisabled)}>
          {isDisabled ? '启用颜色选择器' : '禁用颜色选择器'}
        </button>
      </View>
    </View>
  );
};

export default App;
```

## API文档

### ColorPickerProps

| 属性名 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| value | `string` | `#000000` | 初始颜色值，支持十六进制格式（如 #FF5733） |
| onChange | `(color: string) => void` | - | 颜色变化时的回调函数，返回当前选择的颜色值 |
| presetColors | `string[]` | 默认颜色数组 | 自定义预设颜色数组，用于快速选择常用颜色 |
| disabled | `boolean` | `false` | 是否禁用组件，禁用后用户无法交互 |
| className | `string` | - | 自定义CSS类名，用于覆盖默认样式 |
| style | `React.CSSProperties` | - | 自定义内联样式对象 |
| sliderStyle | `object` | `{}` | 滑块的自定义样式对象，可配置轨道颜色、滑块颜色等

## 平台支持

- ✅ 微信小程序
- ✅ 支付宝小程序
- ✅ 百度小程序
- ✅ 抖音小程序
- ✅ H5
- ✅ 其他Taro支持的平台

## 开发指南

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/hxh-ly/taro-color-picker.git
cd taro-color-picker

# 安装依赖
npm install --legacy-peer-deps

# 生产环境构建
npm run build

# 开发环境构建（带源码映射）
npm run build:dev

# 清理构建产物
npm run clean
```

### 构建说明

组件构建后会在`dist`目录生成以下文件：
- `taro-color-picker.cjs.js` - CommonJS格式
- `taro-color-picker.esm.js` - ES Modules格式
- `taro-color-picker.umd.js` - UMD格式
- `index.css` - 样式文件

### 注意事项

1. **样式引入**：使用时请确保正确引入样式文件，否则可能导致组件显示异常
2. **Taro版本**：建议使用Taro 3.x及以上版本以获得最佳兼容性
3. **类型定义**：组件提供了完整的TypeScript类型定义，可以获得良好的类型提示
4. **小程序兼容性**：在某些小程序平台上，可能需要进行额外的配置以确保组件正常运行

## 常见问题

### Q: 为什么颜色选择器不显示或样式异常？
**A:** 请确保正确引入了样式文件，并且样式文件路径正确。

### Q: 组件在小程序平台上的性能如何？
**A:** 组件经过优化，在小程序平台上的性能表现良好。对于大型应用，建议合理控制组件的使用频率和更新频率。

### Q: 如何自定义颜色选择器的外观？
**A:** 可以通过`className`和`style`属性自定义组件外观，通过`sliderStyle`属性自定义滑块样式。

## 贡献指南

欢迎对Taro Color Picker组件进行贡献！如果您发现了问题或有改进建议，请在GitHub仓库提交Issue或Pull Request。

## 开源协议

本项目采用MIT开源协议 (MIT)

## 反馈与贡献

如果您在使用过程中遇到任何问题，请在[GitHub仓库](https://github.com/hxh-ly/taro-color-picker)提交Issue或Pull Request。我们非常欢迎您的贡献！
