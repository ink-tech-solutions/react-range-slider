# React Range Slider

Let's discover **React Range Slider in less than 2 minutes**.

[Documentation](https://inkdev-react-range-slider.netlify.app)

## Getting Started

Get started by **installing the package**.

```bash
npm install @inkdev/react-range-slider
```

## Props

| Prop             | Type                                   | Required | Default Value | Description                                    |
| ---------------- | -------------------------------------- | -------- | ------------- | ---------------------------------------------- |
| value            | number                                 | Yes      | N/A           | Current value of the slider                    |
| onChange         | `ChangeEventHandler<HTMLInputElement>` | Yes      | N/A           | Event handler for value change                 |
| componentWidth   | string                                 | No       | '100%'        | Width of the component                         |
| disabled         | boolean                                | No       | false         | Whether the component is disabled              |
| sliderColor      | string                                 | No       | '#77bb41'     | Color of the slider                            |
| trackBgColor     | string                                 | No       | '#F2F1F1'     | Background color of the track                  |
| trackBorderColor | string                                 | No       | '#E7E6E4'     | Border color of the track                      |
| categoryName     | string                                 | No       | N/A           | Category name                                  |
| max              | number                                 | No       | 10            | Maximum value of the slider                    |
| min              | number                                 | No       | 0             | Minimum value of the slider                    |
| tooltipPosition  | 'above' &#124; 'under'                 | No       | 'under'       | Position of the tooltip relative to the slider |
| labels           | boolean                                | No       | true          | Whether to display labels                      |

## Usage

```javascript
import React from 'react';
import { RangeSlider, RangeSliderProps } from '@inkdev/react-range-slider';
import { useState } from 'react';

const MyComponent = () => {
    const [value, setValue] = useState(0);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setValue(newValue);
    };

    const sliderProps: RangeSliderProps = {
        componentWidth: '100%',
        disabled: false,
        sliderColor: '#77bb41',
        trackBgColor: '#F2F1F1',
        trackBorderColor: '#E7E6E4',
        value: value,
        onChange: handleOnChange,
        categoryName: '',
        max: 10,
        min: 0,
        tooltipPosition: 'under',
        labels: true,
    };

    return <RangeSlider {...sliderProps} />;
};

export default MyComponent;
```
