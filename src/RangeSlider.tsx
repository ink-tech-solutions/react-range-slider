import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RangeSliderProps } from './types';
import { DetailedHTMLProps } from 'react';
import { HTMLAttributes } from 'react';
import './main.css';

export const RangeSlider: React.FC<RangeSliderProps> = ({
    componentWidth = '100%',
    disabled = false,
    sliderColor = '#C0F',
    trackBgColor = '#F2F1F1',
    trackBorderColor = '#E7E6E4',
    value,
    setValue,
    categoryName,
    max = 10,
    min = 0,
    tooltipPosition = 'under',
    labels = true,
}) => {
    const [tooltipStyle, setTooltipStyle] = useState({});
    const rangeInputRef = useRef<null | HTMLInputElement>(null);
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setValue(newValue);
    };
    const thumbWidth = '28px';
    const trackBorderRadius = '7px';
    const thumbBorderRadius = '14px';
    const tooltipWidth = '16px';
    const calculateTooltipPosition = useCallback(() => {
        const rangeInput = rangeInputRef.current;
        if (rangeInput) {
            const inputWidth = rangeInput.offsetWidth;
            const thumbWidth = 28;
            const step = (inputWidth - thumbWidth) / (max - min);
            setTooltipStyle({
                left: `calc(${(value - min) * step}px)`,
            });
        }
    }, [value, min, max, labels, rangeInputRef, componentWidth]);

    useEffect(() => {
        const handleResize = () => {
            calculateTooltipPosition();
        };

        calculateTooltipPosition();

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [calculateTooltipPosition]);

    const style = {
        '--component-width': componentWidth,
        '--slider-color': sliderColor,
        '--track-bg-color': trackBgColor,
        '--track-border-color': trackBorderColor,
        '--value': value,
        '--min': min,
        '--max': max,
        '--thumb-width': thumbWidth,
        '--track-border-radius': trackBorderRadius,
        '--thumb-border-radius': thumbBorderRadius,
        '--tooltip-width': tooltipWidth,
    } as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

    return (
        <div className="number-slider-container" style={style}>
            <div className="number-slider-wrapper">
                {categoryName && (
                    <label title={categoryName} htmlFor={categoryName}>
                        {categoryName}
                    </label>
                )}
                <div className="input-container">
                    {labels && <p className="label">{min}</p>}
                    <div className="slider-container">
                        <input
                            ref={rangeInputRef}
                            type="range"
                            id={categoryName}
                            className="slider slider-progress"
                            name="slider"
                            min={min}
                            max={max}
                            value={value}
                            onChange={handleOnChange}
                            disabled={disabled}
                        />
                        <div className={`tooltip-container ${tooltipPosition}`} style={tooltipStyle}>
                            <div className="tooltip">
                                <div className="triangle"></div>
                                {value}
                            </div>
                        </div>
                    </div>
                    {labels && <p className="label">{max}</p>}
                </div>
            </div>
        </div>
    );
};
