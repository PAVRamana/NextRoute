/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

interface OptionType {
  label: string;
  value: string;
  item: any;
}

type ExpTypeAheadTypes = {
  onInputChange?: any;
  data: any;
  loading: boolean;
  width?: any;
  label: string;
  onSelectChange: any;
  disable?: boolean;
  hidden?: boolean;
  inputId?: string;
  size?: any;
  clearOnBlur: boolean;
  inputVariant?: any;
  placeholder?: string;
  value: OptionType;
  formLabel: React.ReactNode | string;
};

export default function ExpTypeAhead({
  onInputChange,
  data,
  loading,
  width,
  label,
  size = 'medium',
  onSelectChange,
  clearOnBlur = false,
  hidden = false,
  disable = false,
  inputId,
  inputVariant = 'outlined',
  placeholder,
  formLabel,
  value,
}: ExpTypeAheadTypes) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly OptionType[]>([]);

  React.useEffect(() => {
    if (data) {
      setOptions([...data]);
    }
  }, [data]);

  const LabelDiv = styled('div')(({ theme }) => ({
    padding: '7px 3px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#145a99',
    display: 'flex',
  }));

  return (
    <>
      {formLabel && <LabelDiv>{formLabel}</LabelDiv>}
      <Autocomplete
        id={inputId ?? uuidv4()}
        size={size}
        sx={{ width: width ?? 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option: any) => {
          return option?.label ? option?.label : '';
        }}
        disabled={disable}
        freeSolo
        value={value}
        hidden={hidden}
        options={options}
        onInputChange={(_event: React.SyntheticEvent, value: string) =>
          onInputChange && onInputChange(value)
        }
        clearOnBlur={clearOnBlur}
        loading={loading}
        onChange={(_event: React.SyntheticEvent, selectedData: any) => {
          onSelectChange && onSelectChange(selectedData);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            className='exp-autocomplete-cls'
            variant={inputVariant}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </>
  );
}

import { useState } from 'react';
import { AdvanceFilterObjectType } from 'data/manage-access/advanceFilter';
import { useFeature } from 'packages/common/feature-provider';
import { useAppSelectorHook } from 'packages/common/hooks/useAppSelectorHook';
import API from 'utils/api';
import { FILTER_TYPES } from 'utils/constants';

import ExpTypeAhead from './ExpTypeAhead';
import { useDispatchErrorHook } from 'packages/common/hooks/useDispatchErrorHook';

interface TypeAheadSelectBasicTypes {
  filter: AdvanceFilterObjectType;
  updateFilterData: (name: string, value: string) => void;
  value: OptionType;
  hidden: boolean;
  filterType: string;
}

export interface OptionType {
  label: string;
  value: string;
  item: any;
}

function TypeAheadSelectBasic({
  filter,
  updateFilterData,
  value,
  hidden,
  filterType,
}: TypeAheadSelectBasicTypes) {
  const [typeAheadData, setTypeAheadData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { cartInfo } = useAppSelectorHook();
  const { dispatchErrorData } = useDispatchErrorHook();

  const getFilterType = () => {
    if (
      filterType === FILTER_TYPES.USER &&
      cartInfo &&
      cartInfo?.userFilters &&
      cartInfo?.userFilters?.filterData?.length > 0
    ) {
      return cartInfo?.userFilters?.filterData[0].value;
    }
    return '';
  };

  const { maxCharacterSearch } = useFeature();
  const { displayName, name, APIName, waterMarkText } = filter;

  const fetchData = async (query: string) => {
    const response = await API.post(`/requestUI${APIName}`, {
      [filter.name]: query,
      filterType: getFilterType(),
      filter: filterType,
    }).catch((error) => {
      dispatchErrorData(error);
    });
    const result = response?.data?.objects?.map((item: any) => {
      return {
        label: item.objectDisplayName,
        value: item.objectId,
        item: item,
      };
    });
    setTypeAheadData(result ?? []);
    setIsLoading(false);
  };

  const onInputChange = (query: string) => {
    const charLength = maxCharacterSearch ?? 4;
    if (query && query?.length >= charLength) {
      setIsLoading(true);
      fetchData(query);
    }
  };

  return (
    <ExpTypeAhead
      loading={isLoading}
      data={typeAheadData}
      onInputChange={onInputChange}
      onSelectChange={(selectedData: any) => {
        updateFilterData(name, selectedData);
      }}
      label={''}
      value={value}
      hidden={hidden}
      placeholder={waterMarkText}
      clearOnBlur={false}
      size='small'
      formLabel={hidden ? '' : displayName}
    />
  );
}

export default TypeAheadSelectBasic;
