import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, Slider, Input, SliderProps } from '@tarojs/components';
import './index.scss';
import {
  hexToRgb,
  hexToRgba,
  rgbToHex,
  rgbToRgba,
  rgbToHexWithOpacity
} from './utils/hexToRgb'

// 自定义SliderStyleType接口
interface SliderStyleType extends SliderProps {
}

// 定义RGB颜色接口
interface RgbColor {
  r: number;
  g: number;
  b: number;
}

// 定义Slider事件接口
interface SliderChangeEvent {
  detail: {
    value: number;
  };
}

// 定义Input事件接口
interface InputChangeEvent {
  detail: {
    value: string;
  };
}

// 颜色选择器组件接口定义
interface ColorPickerProps {
  value?: string; // 初始颜色值，格式为HEX（如 #FF0000）
  onChange?: (color: string) => void; // 颜色变化回调函数
  presetColors?: string[]; // 预设颜色数组
  disabled?: boolean; // 是否禁用
  className?: string;
  style?: React.CSSProperties;
  sliderStyle?: {
    rsliderStyle?: SliderStyleType,
    gsliderStyle?: SliderStyleType,
    bsliderStyle?: SliderStyleType,
    asliderStyle?: SliderStyleType,
  }
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  value = '#000000',
  onChange,
  presetColors = [
    '#000000FF', '#FFFFFFFF', '#3498dbFF', '#2ecc71FF',
    '#f39c12FF', '#e74c3cFF', '#9b59b6FF', '#1abc9cFF'
  ],
  disabled = false,
  className,
  style,
  sliderStyle = { rsliderStyle: {}, gsliderStyle: {}, bsliderStyle: {}, asliderStyle: {} },
}) => {
  // 初始RGB值
  const initialRgb = hexToRgb(value);

  // 状态管理
  const [rgb, setRgb] = useState<RgbColor>(initialRgb);
  const [opacity, setOpacity] = useState<number>(hexToRgba(value));
  const [currentColor, setCurrentColor] = useState<string>(value);
  const [customPresetColors, setCustomPresetColors] = useState<string[]>(presetColors);

  // 当外部传入的value变化时，更新内部状态
  useEffect(() => {
    const newRgb = hexToRgb(value);
    setRgb(newRgb);
    setOpacity(hexToRgba(value));
    setCurrentColor(value);
  }, [value]);

  // 当RGB值变化时，更新当前颜色
  useEffect(() => {
    const hexColor = rgbToHexWithOpacity(rgb.r, rgb.g, rgb.b, opacity);
    if (hexColor !== currentColor) {
      setCurrentColor(hexColor);
      if (onChange) {
        onChange(hexColor);
      }
    }
  }, [rgb, opacity, currentColor, onChange]);

  // 处理RGB滑块变化
  const handleRgbChange = useCallback((type: 'r' | 'g' | 'b') => (e: SliderChangeEvent) => {
    const value = e.detail.value;
    setRgb(prev => ({ ...prev, [type]: value }));
  }, []);

  // 处理RGB数值输入变化
  const handleRgbInputChange = useCallback((type: 'r' | 'g' | 'b') => (e: InputChangeEvent) => {
    let numValue = parseInt(e.detail.value || '0', 10);
    // 限制范围在0-255之间
    numValue = Math.max(0, Math.min(255, numValue));
    setRgb(prev => ({ ...prev, [type]: numValue }));
  }, []);

  // 处理不透明度变化
  const handleOpacityChange = useCallback((e: SliderChangeEvent) => {
    const value = e.detail.value;
    setOpacity(value);
  }, []);
  
  // 添加不透明度输入处理函数
  const handleOpacityInputChange = useCallback((e: InputChangeEvent) => {
    let numValue = parseInt(e.detail.value || '0', 10);
    // 限制范围在0-100之间
    numValue = Math.max(0, Math.min(100, numValue));
    setOpacity(numValue);
  }, []);

  // 处理预设颜色选择
  const handlePresetColorSelect = useCallback((color: string) => {
    if (!color) return;
    // 提取RGB值（兼容6位和8位十六进制）
    const hexValue = color.replace('#', '');
    let r = 0, g = 0, b = 0, a = 100;

    if (hexValue.length === 6 || hexValue.length === 8) {
      try {
        r = parseInt(hexValue.substring(0, 2), 16);
        g = parseInt(hexValue.substring(2, 4), 16);
        b = parseInt(hexValue.substring(4, 6), 16);

        // 如果是8位十六进制，提取透明度
        if (hexValue.length === 8) {
          a = Math.round((parseInt(hexValue.substring(6, 8), 16) / 255) * 100);
        }
      } catch (error) {
        console.error('解析颜色值失败:', error);
        return;
      }
    }
    setRgb({ r, g, b });
    setOpacity(a);
    setCurrentColor(color);
    if (onChange) {
      onChange(color);
    }
  }, [onChange]);

  // 添加当前颜色到预设颜色
  const handleAddPresetColor = useCallback(() => {
    // 避免重复添加相同的颜色
    if (!customPresetColors.includes(currentColor)) {
      setCustomPresetColors(prev => [...prev, currentColor]);
    }
  }, [customPresetColors, currentColor]);
  
  const displayColor = useMemo(() => {
    return currentColor.toUpperCase().replace('#', '');
  }, [currentColor]);

  const renderPresetColors = useMemo(() => {
    return customPresetColors.map((color, index) => (
      <View
        key={index}
        className={`preset-color-small ${currentColor.toUpperCase() === color.toUpperCase() ? 'active' : ''}`}
        style={{ backgroundColor: color }}
        onClick={() => handlePresetColorSelect(color)}
      />
    ));
  }, [customPresetColors, currentColor, handlePresetColorSelect]);
  
  return (
    <View className={`color-picker ${disabled ? 'disabled' : ''} ${className ? className : ''
      }`} style={style ? style : {}}>
      {/* 颜色滑块区域 */}
      <View className="color-picker-content">
        {/* 红色滑块 */}
        <View className="color-slider-item">
          <Text className="color-slider-label">红色</Text>
          <View className="color-slider-container">
            <Slider
              value={rgb.r}
              min={0}
              max={255}
              activeColor="#FF0000"
              blockColor="#FFFFFF"
              trackSize={'8'}
              handleSize={'18'}
              onChanging={handleRgbChange('r')}
              disabled={disabled}
              className="color-slider"
              {...sliderStyle.rsliderStyle}
            />
            <Input
              type="number"
              value={rgb.r.toString()}
              onInput={handleRgbInputChange('r')}
              className="color-value-input"
              disabled={disabled}
            />
          </View>
        </View>

        {/* 绿色滑块 */}
        <View className="color-slider-item">
          <Text className="color-slider-label">绿色</Text>
          <View className="color-slider-container">
            <Slider
              value={rgb.g}
              min={0}
              max={255}
              activeColor="#00FF00"
              blockColor="#FFFFFF"
              trackSize={'8'}
              handleSize={'18'}
              onChanging={handleRgbChange('g')}
              disabled={disabled}
              className="color-slider"
              {...sliderStyle.gsliderStyle}
            />
            <Input
              type="number"
              value={rgb.g.toString()}
              onInput={handleRgbInputChange('g')}
              className="color-value-input"
              disabled={disabled}
            />
          </View>
        </View>

        {/* 蓝色滑块 */}
        <View className="color-slider-item">
          <Text className="color-slider-label">蓝色</Text>
          <View className="color-slider-container">
            <Slider
              value={rgb.b}
              min={0}
              max={255}
              activeColor="#0000FF"
              blockColor="#FFFFFF"
              trackSize={'8'}
              handleSize={'18'}
              onChanging={handleRgbChange('b')}
              disabled={disabled}
              className="color-slider"
              {...sliderStyle.bsliderStyle}
            />
            <Input
              type="number"
              value={rgb.b.toString()}
              onInput={handleRgbInputChange('b')}
              className="color-value-input"
              disabled={disabled}
            />
          </View>
        </View>

        {/* 当前颜色显示 */}
        <View className="current-color-display">
          <Text className="color-format-label">sRGB Hex颜色 #</Text>
          <Text className="current-color-value">
            {displayColor}
          </Text>
        </View>

        {/* 不透明度滑块 - 修复滑动问题 */}
        <View className="color-slider-item">
          <Text className="color-slider-label">不透明度</Text>
          <View className="color-slider-container">
            <Slider
              value={opacity}
              min={0}
              max={100}
              activeColor="#000000"
              backgroundColor="#E0E0E0"
              blockColor="#FFFFFF"
              trackSize={'8'}
              handleSize={'18'}
              onChanging={handleOpacityChange}
              disabled={disabled}
              className="color-slider"
              {...sliderStyle.asliderStyle}
            />
            <View className="opacity-input-wrapper opacity-relative">
              <Input
                type="number"
                value={opacity.toString()}
                onInput={handleOpacityInputChange}
                className="color-value-input"
                disabled={disabled}
              />
              <View className="opacity-percent-sign">%</View>
            </View>
          </View>
        </View>

        {/* 预设颜色 - 修复预览和添加功能 */}
        <View className="preset-colors-wrapper">
          <View className="preset-color-item-large">
            <View className="preview-color-container">
              <View className="preview-color-background">
                {/* 左上半三角为黑色 */}
                <View className="preview-color-upper-left"></View>
                {/* 右下半三角为白色 */}
                <View className="preview-color-bottom-right"></View>
              </View>
              {/* 颜色层 - 应用不透明度 */}
              <View
                className="preview-color-layer"
                style={{
                  backgroundColor: rgbToRgba(rgb.r, rgb.g, rgb.b, opacity),
                  opacity: opacity / 100
                }}
              ></View>
            </View>
          </View>
          <View className="preset-colors-grid">
            {renderPresetColors}
            <View
              className="preset-color-add"
              onClick={handleAddPresetColor}
            >+
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ColorPicker;