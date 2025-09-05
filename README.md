# taro-color-picker

A customizable color picker component for React/Taro, supporting both mini-programs and H5 platforms.

## Features

- 🎨 Customizable color picker with RGB and opacity controls
- 📦 Support for multiple module formats: CommonJS, ES Modules, and UMD
- 🎯 Works in both Taro mini-programs and H5
- 🎛️ Configurable preset colors
- 🎡 Responsive design

## Installation

```bash
npm install taro-color-picker --save
# or
yarn add taro-color-picker
```

## Usage

```jsx
import React, { useState } from 'react';
import { View } from '@tarojs/components';
import ColorPicker from 'taro-color-picker';
import 'taro-color-picker.esm.css'; // Import the style

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

## API

### ColorPickerProps


| Property     | Type                      | Default        | Description                          |
| ------------ | ------------------------- | -------------- | ------------------------------------ |
| value        | `string`                  | `#000000`      | Initial color value in HEX format    |
| onChange     | `(color: string) => void` | -              | Callback function when color changes |
| presetColors | `string[]`                | Default colors | Array of preset colors               |
| disabled     | `boolean`                 | `false`        | Whether the component is disabled    |
| className    | `string`                  | -              | Custom class name                    |
| style        | `React.CSSProperties`     | -              | Custom style object                  |
| sliderStyle  | `object`                  | `{}`           | Custom styles for sliders            |

## Platform Support

- ✅ Mini-programs (WeChat, Alipay, etc.)
- ✅ H5

## Development

```bash
# Clone the repository
git clone [repository-url]
cd taro-color-picker

# Install dependencies
npm install --legacy-peer-deps

# Build for production
npm run build

# Build for development
npm run build:dev
```

## License

MIT

## Issues

If you encounter any issues, please create an issue on [GitHub](https://github.com).

## Contributing

Contributions are welcome! Please create a pull request with your changes.
