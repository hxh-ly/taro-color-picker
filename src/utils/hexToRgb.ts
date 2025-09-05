interface RgbColor {
  r: number;
  g: number;
  b: number;
}

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
};

// 从HEX中提取透明度
const hexToRgba = (hex: string): number => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  // 如果是8位十六进制，提取透明度
  if (result && result[4]) {
    return Math.round((parseInt(result[4], 16) / 255) * 100);
  }
  return 100; // 默认完全不透明
};

// 将RGB转换为HEX
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// 将RGB和透明度转换为RGBA
const rgbToRgba = (r: number, g: number, b: number, a: number): string => {
  return `rgba(${r}, ${g}, ${b}, ${a / 100})`;
};

// 新增：将RGB和透明度转换为8位HEX (#RRGGBBAA)
const rgbToHexWithOpacity = (r: number, g: number, b: number, a: number): string => {
  const toHex = (n: number): string => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  // 将0-100的透明度转换为0-255
  const alpha = Math.round((a / 100) * 255);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alpha)}`;
};

export {
  hexToRgb,
  hexToRgba,
  rgbToHex,
  rgbToRgba,
  rgbToHexWithOpacity
};