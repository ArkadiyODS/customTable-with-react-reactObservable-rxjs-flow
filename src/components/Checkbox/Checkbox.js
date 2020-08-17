//@flow
import React, { useCallback } from "react";
import { Field, Checkbox, Label } from "@zendeskgarden/react-forms";
import {
  BORDER_COLOR,
  ODD_ROW_BACKGROUND,
  NoDataContainer,
  Row,
} from "../shared";

type CheckboxProps = {
  label?: string,
  checked?: boolean,
  onChange?: (checked: boolean) => void,
};

export default React.memo<CheckboxProps>((props: CheckboxProps) => {
  const { label, checked, onChange } = props;
  const setChecked = useCallback(
    (evt: SyntheticInputEvent<HTMLInputElement>) => {
      const value: boolean = evt.target.checked;
      onChange && onChange(value);
    },
    [onChange]
  );
  return (
    <Field>
      <Checkbox checked={checked} onChange={setChecked}>
        {label ? <Label>{label}</Label> : <Label hidden>Hidden</Label>}
      </Checkbox>
    </Field>
  );
});
