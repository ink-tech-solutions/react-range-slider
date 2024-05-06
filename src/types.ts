import { ChangeEventHandler } from 'react';

export interface RangeSliderProps {
    componentWidth?: string;
    disabled?: boolean;
    sliderColor?: string;
    trackBgColor?: string;
    trackBorderColor?: string;
    value: number;
    onChange: ChangeEventHandler<HTMLInputElement>;
    categoryName?: string;
    max?: number;
    min?: number;
    tooltipPosition?: 'above' | 'under';
    labels?: boolean;
}
