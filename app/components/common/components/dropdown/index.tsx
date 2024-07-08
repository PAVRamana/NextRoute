import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type DropDownTypes = {
  data: any;
  onChange?: any;
  disable?: boolean;
  readOnly?: boolean;
  width?: any;
  inputId?: string;
  size?: any;
  hidden?: boolean;
  value?: string;
  placeholder?: string;
  disableClearable?: boolean;
  inputVariant?: any;
  onOpen?: any;
};

export default function DropDown({
  data,
  onChange,
  disable = false,
  readOnly = false,
  width,
  size = 'medium',
  value,
  placeholder = '',
  disableClearable = false,
  hidden = false,
  inputVariant = 'outlined',
  onOpen,
}: DropDownTypes) {
  return (
    <>
      <Autocomplete
        disablePortal
        onChange={(_event, newValue: any) => {
          let selectedVal: string = '';
          if (typeof newValue === 'string') {
            selectedVal = newValue;
          } else if (newValue && (newValue as any)?.inputValue) {
            selectedVal = (newValue as any)?.inputValue;
          } else {
            selectedVal = newValue;
          }
          onChange && onChange(selectedVal);
        }}
        disabled={disable}
        readOnly={readOnly}
        freeSolo={false}
        value={value}
        options={data}
        hidden={hidden}
        onOpen={onOpen}
        disableClearable={true}
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option}</li>}
        size={size}
        sx={{ width: width ?? 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={''}
            className='exp-autocomplete-cls'
            placeholder={placeholder}
            variant={inputVariant}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
      />
    </>
  );
}
