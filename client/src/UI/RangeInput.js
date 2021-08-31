import { noop } from "../misc";
import { Label, LabelText, Input } from "./styledComponents";

export default ({
    className,
    label,
    value,
    min = 0,
    max = 10,
    onChange = noop,
}) => (
    <Label className={className}>
        <LabelText>{label}</LabelText>
        <Input
            type="range"
            min={min}
            max={max}
            value={value}
            onInput={({ target }) => onChange(target.value)}
        />
    </Label>
);