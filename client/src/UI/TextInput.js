import { noop } from "../misc";
import { Label, LabelText, Input } from "./styledComponents";

export default ({
    className,
    label,
    value,
    onChange = noop,
}) => (
    <Label className={className}>
        <LabelText>{label}</LabelText>
        <Input
            value={value}
            onInput={({ target }) => onChange(target.value)}
        />
    </Label>
);
