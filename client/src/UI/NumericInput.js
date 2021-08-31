import { noop } from "../misc";
import { Label, LabelText, Input } from "./styledComponents";

export default ({
    className,
    label,
    value,
    min = -Infinity,
    max = Infinity,
    onChange = noop,
}) => (
    <Label className={className}>
        <LabelText>{label}</LabelText>
        <Input
            type="number"
            min={min}
            max={max}
            value={value}
            onInput={({ target }) => onChange(target.value)}
        />
    </Label>
);
