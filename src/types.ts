export interface RangeSliderProps {
    componentWidth?: string;
    disabled?: boolean;
    sliderColor?: string;
    trackBgColor?: string;
    trackBorderColor?: string;
    value: number;
    setValue: (param: number) => void;
    categoryName?: string;
    max?: number;
    min?: number;
    tooltipPosition?: 'above' | 'under';
    labels?: boolean;
}
