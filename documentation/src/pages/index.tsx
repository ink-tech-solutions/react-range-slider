import Layout from '@theme/Layout';
import { RangeSlider, RangeSliderProps } from '@inkdev/react-range-slider';
import { useState } from 'react';
import style from './index.module.css';
import { FaCopy } from 'react-icons/fa';

export default function Home(): JSX.Element {
    const [value, setValue] = useState(0);
    const [copied, setCopied] = useState<boolean>(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setValue(newValue);
    };
    const initialSliderProps: RangeSliderProps = {
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
    const [sliderProps, setSliderProps] = useState<RangeSliderProps>(initialSliderProps);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        // Prevent updating if min is greater than or equal to max
        if ((name === 'min' && parseInt(value) >= sliderProps.max) || (name === 'max' && parseInt(value) <= sliderProps.min)) {
            return;
        }
        setSliderProps({
            ...sliderProps,
            [name]: name === 'disabled' ? event.target.checked : Number(value) || value,
        });
    };

    const generateCodeOutput = (): string => {
        const propsToInclude = Object.entries(sliderProps)
            .filter(([key, value]) => {
                if (value === initialSliderProps[key]) {
                    return false;
                }
                if (typeof value === 'function' || typeof value === 'undefined' || key === 'value' || key === 'onChange') {
                    return false; // Exclude functions, undefined values, 'value', and 'onChange' props
                }
                if (typeof value === 'string' && !value) {
                    return false; // Exclude empty strings
                }
                if (typeof value === 'number' && isNaN(value)) {
                    return false; // Exclude NaN number values
                }
                return true;
            })
            .map(([key, value]) => {
                if (typeof value === 'string') {
                    return `${key}="${value}"`; // Use double quotes for string values
                }
                return `${key}={${value}}`;
            })
            .join(' ');

        return `<RangeSlider ${propsToInclude} />`;
    };

    const copyCodeToClipboard = () => {
        const codeOutput = generateCodeOutput();
        navigator.clipboard.writeText(codeOutput);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Layout title="Home" description="Easy way to create range input">
            <main className={style.main_container}>
                <h1 className={style.h1}>Range Slider Generator</h1>
                <div className={style.settings_container}>
                    <div className={style.input_group}>
                        <div>
                            <label>
                                Component Width:
                                <input type="text" name="componentWidth" value={sliderProps.componentWidth} onChange={handleInputChange} />
                            </label>
                        </div>

                        <div>
                            <label>
                                Slider Color:
                                <input type="color" name="sliderColor" value={sliderProps.sliderColor} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Track Background Color:
                                <input type="color" name="trackBgColor" value={sliderProps.trackBgColor} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Track Border Color:
                                <input type="color" name="trackBorderColor" value={sliderProps.trackBorderColor} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Category Name:
                                <input className={style.category_input} type="text" name="categoryName" value={sliderProps.categoryName} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>
                    <div className={style.input_group}>
                        <div>
                            <label>
                                Minimum Value:
                                <input type="number" name="min" value={sliderProps.min} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Maximum Value:
                                <input type="number" name="max" value={sliderProps.max} onChange={handleInputChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Tooltip Position:
                                <select className={style.select} name="tooltipPosition" value={sliderProps.tooltipPosition} onChange={handleInputChange}>
                                    <option value="above">Above</option>
                                    <option value="under">Under</option>
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>
                                Labels:
                                <input type="checkbox" name="labels" checked={sliderProps.labels} onChange={e => setSliderProps({ ...sliderProps, labels: e.target.checked })} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Disabled:
                                <input type="checkbox" name="disabled" checked={sliderProps.disabled} onChange={handleInputChange} />
                            </label>
                        </div>
                    </div>
                </div>
                <pre className={style.output}>
                    <RangeSlider {...sliderProps} value={value} onChange={handleOnChange} />
                </pre>
                <p className={style.warning}>
                    Don't forget to add <span>value</span> and <span>onChange</span> props before using the generated code.
                </p>
                <div>
                    <h2 className={style.h2}>Generated Code</h2>
                    <pre className={style.code_block}>
                        {generateCodeOutput()}
                        <div>
                            <div className={style.copy_icon} onClick={copyCodeToClipboard}>
                                <FaCopy size={25} />
                            </div>
                            <div style={{ color: 'green', opacity: copied ? 1 : 0 }}>Copied!</div>
                        </div>
                    </pre>
                </div>{' '}
            </main>
        </Layout>
    );
}
