/**
 * Figma color variables data
 *
 * To populate these with real Figma data:
 *
 * 1. Use MCP Figma tools to fetch variable definitions:
 *    - Use `mcp_Figma_get_variable_defs` with fileKey and nodeId
 *    - Example: For file "g2bfVe3ggry7wwOjKJ1cI5", node "0:1"
 *
 * 2. Or use the Figma API directly to fetch variables
 *
 * 3. The data structure should be:
 *    {
 *      'color/primary/500': '#0ea5e9',
 *      'color/secondary/500': '#a855f7',
 *      // ... more color variables
 *    }
 *
 * 4. For specific color schemes, fetch variables from specific nodes:
 *    - Dark colors: node-id=17-89
 *    - Gray colors: node-id=17-90
 *    - Red colors: node-id=18-122
 *    - Pink colors: node-id=20-154
 *    - Grape colors: node-id=20-187
 *    - Violet colors: node-id=20-228
 *    - Indigo colors: node-id=21-360
 *    - Blue colors: node-id=21-371
 *    - Cyan colors: node-id=21-382
 *    - Teal colors: node-id=21-393
 *    - Green colors: node-id=21-404
 *    - Lime colors: node-id=21-415
 *    - Yellow colors: node-id=21-546
 *    - Orange colors: node-id=21-557
 *    - Black and White: node-id=23-289
 */

export const darkColorScheme: Record<string, string> = {
  'dark/0': '#c9c9c9',
  'dark/1': '#b8b8b8',
  'dark/2': '#828282',
  'dark/3': '#696969',
  'dark/4': '#424242',
  'dark/5': '#3b3b3b',
  'dark/6': '#2e2e2e',
  'dark/7': '#242424',
  'dark/8': '#1f1f1f',
  'dark/9': '#141414',
}

export const grayColorScheme: Record<string, string> = {
  'gray/0': '#f8f9fa',
  'gray/1': '#f1f3f5',
  'gray/2': '#e9ecef',
  'gray/3': '#dee2e6',
  'gray/4': '#ced4da',
  'gray/5': '#adb5bd',
  'gray/6': '#868e96',
  'gray/7': '#495057',
  'gray/8': '#343a40',
  'gray/9': '#212529',
}

export const redColorScheme: Record<string, string> = {
  'red/0': '#fff5f5',
  'red/1': '#ffe3e3',
  'red/2': '#ffc9c9',
  'red/3': '#ffa8a8',
  'red/4': '#ff8787',
  'red/5': '#ff6b6b',
  'red/6': '#fa5252',
  'red/7': '#f03e3e',
  'red/8': '#e03131',
  'red/9': '#c92a2a',
}

export const pinkColorScheme: Record<string, string> = {
  'pink/0': '#fff0f6',
  'pink/1': '#ffdeeb',
  'pink/2': '#fcc2d7',
  'pink/3': '#faa2c1',
  'pink/4': '#f783ac',
  'pink/5': '#f06595',
  'pink/6': '#e64980',
  'pink/7': '#d6336c',
  'pink/8': '#c2255c',
  'pink/9': '#a61e4d',
}

export const grapeColorScheme: Record<string, string> = {
  'grape/0': '#f8f0fc',
  'grape/1': '#f3d9fa',
  'grape/2': '#eebefa',
  'grape/3': '#e599f7',
  'grape/4': '#da77f2',
  'grape/5': '#cc5de8',
  'grape/6': '#be4bdb',
  'grape/7': '#ae3ec9',
  'grape/8': '#9c36b5',
  'grape/9': '#862e9c',
}

export const violetColorScheme: Record<string, string> = {
  'violet/0': '#f3f0ff',
  'violet/1': '#e5dbff',
  'violet/2': '#d0bfff',
  'violet/3': '#b197fc',
  'violet/4': '#9775fa',
  'violet/5': '#845ef7',
  'violet/6': '#7950f2',
  'violet/7': '#7048e8',
  'violet/8': '#6741d9',
  'violet/9': '#5f3dc4',
}

export const indigoColorScheme: Record<string, string> = {
  'indigo/0': '#edf2ff',
  'indigo/1': '#dbe4ff',
  'indigo/2': '#bac8ff',
  'indigo/3': '#91a7ff',
  'indigo/4': '#748ffc',
  'indigo/5': '#5c7cfa',
  'indigo/6': '#4c6ef5',
  'indigo/7': '#4263eb',
  'indigo/8': '#3b5bdb',
  'indigo/9': '#364fc7',
}

export const blueColorScheme: Record<string, string> = {
  'blue/0': '#e7f5ff',
  'blue/1': '#d0ebff',
  'blue/2': '#a5d8ff',
  'blue/3': '#74c0fc',
  'blue/4': '#4dabf7',
  'blue/5': '#339af0',
  'blue/6': '#228be6',
  'blue/7': '#1c7ed6',
  'blue/8': '#1971c2',
  'blue/9': '#1864ab',
}

export const cyanColorScheme: Record<string, string> = {
  'cyan/0': '#e3fafc',
  'cyan/1': '#c5f6fa',
  'cyan/2': '#99e9f2',
  'cyan/3': '#66d9e8',
  'cyan/4': '#3bc9db',
  'cyan/5': '#22b8cf',
  'cyan/6': '#15aabf',
  'cyan/7': '#1098ad',
  'cyan/8': '#0c8599',
  'cyan/9': '#0b7285',
}

export const tealColorScheme: Record<string, string> = {
  'teal/0': '#e6fcf5',
  'teal/1': '#c3fae8',
  'teal/2': '#96f2d7',
  'teal/3': '#63e6be',
  'teal/4': '#38d9a9',
  'teal/5': '#20c997',
  'teal/6': '#12b886',
  'teal/7': '#0ca678',
  'teal/8': '#099268',
  'teal/9': '#087f5b',
}

export const greenColorScheme: Record<string, string> = {
  'green/0': '#ebfbee',
  'green/1': '#d3f9d8',
  'green/2': '#b2f2bb',
  'green/3': '#8ce99a',
  'green/4': '#69db7c',
  'green/5': '#51cf66',
  'green/6': '#40c057',
  'green/7': '#37b24d',
  'green/8': '#2f9e44',
  'green/9': '#2b8a3e',
}

export const limeColorScheme: Record<string, string> = {
  'lime/0': '#f4fce3',
  'lime/1': '#e9fac8',
  'lime/2': '#d8f5a2',
  'lime/3': '#c0eb75',
  'lime/4': '#a9e34b',
  'lime/5': '#94d82d',
  'lime/6': '#82c91e',
  'lime/7': '#74b816',
  'lime/8': '#66a80f',
  'lime/9': '#5c940d',
}

export const yellowColorScheme: Record<string, string> = {
  'yellow/0': '#fff9db',
  'yellow/1': '#fff3bf',
  'yellow/2': '#ffec99',
  'yellow/3': '#ffe066',
  'yellow/4': '#ffd43b',
  'yellow/5': '#fcc419',
  'yellow/6': '#fab005',
  'yellow/7': '#f59f00',
  'yellow/8': '#f08c00',
  'yellow/9': '#e67700',
}

export const orangeColorScheme: Record<string, string> = {
  'orange/0': '#fff4e6',
  'orange/1': '#ffe8cc',
  'orange/2': '#ffd8a8',
  'orange/3': '#ffc078',
  'orange/4': '#ffa94d',
  'orange/5': '#ff922b',
  'orange/6': '#fd7e14',
  'orange/7': '#f76707',
  'orange/8': '#e8590c',
  'orange/9': '#d9480f',
}

export const blackAndWhiteColorScheme: Record<string, string> = {
  white: '#ffffff',
  black: '#000000',
}
