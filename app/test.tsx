/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Button, Checkbox, Text, DialogContent, Card } from '@wayfarer/components';
import {
  AutoComplete,
  ToolTip,
  CloseIcon,
  HelpFilledIcon,
  DatePickerCmp
} from 'exp-ui-web-components-mfe';
import { useEffect, useState } from 'react';
import ClearPreferences from './clear-preferences';
import * as Styled from './preference.styles';
import {
  buildPreferencesRequest,
  getCurrentDate,
  responseCallback,
  ShowAlertType,
  validateDates
} from './preferences-util';
import SavePreferences from './save-preferences';
import { ForwardUser } from 'mocks/data/preferences/fetchDeligations';
import { useAppSelectorHook } from 'packages/common/custom-hooks/useAppSelectorHook';
import { useDispatchErrorHook } from 'packages/common/custom-hooks/useDispatchErrorHook';
import { usePostApi } from 'packages/common/service/serviceHook';
import { URL } from 'packages/utils/constants';

export default function PreferencePanel() {
  const [alertMesssage, setAlertMesssage] = useState<string>('');
  const [selectedUserData, setSelectedUserData] = useState<any>();
  const [defaultValue, setDefaultValue] = useState<any>();
  const [defaultOptions, setDefaultOptions] = useState<any>();
  const [startDateSelected, setStartDateSelected] = useState<boolean>(false);
  const [endDateSelected, setEndtDateSelected] = useState<boolean>(false);
  const [isResetSelectedValue, setIsResetSelectedValue] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [showAlertType, setShowAlertType] = useState<ShowAlertType>({
    show: false,
    type: 'error'
  });

  const { homePageLabels, commonLabels } = useAppSelectorHook();
  const { dispatchErrorData } = useDispatchErrorHook();

  const { run, error, data, isResolved } = usePostApi();
  const {
    run: runFetchDeligations,
    error: fetchDeligationsError,
    data: fetchDeligationsData,
    isResolved: isResolvedFetchDeligations
  } = usePostApi();

  useEffect(() => {
    runFetchDeligations(URL.fetchDeligations);
  }, []);

  useEffect(() => {
    if (fetchDeligationsData && isResolvedFetchDeligations) {
      const { forwardUser, startDate, endDate } = fetchDeligationsData;

      if (forwardUser) {
        const { name, displayName, id } = forwardUser as ForwardUser;
        const data = {
          label: displayName,
          value: id,
          item: {
            name: name,
            id: id,
            displayName: displayName,
            displayableName: displayName
          }
        };
        setSelectedUserData(data);
        setDefaultValue(data);
        setDefaultOptions([data]);
      }

      if (startDate) {
        setStartDateSelected(true);
        setStartDate(startDate);
      }

      if (endDate) {
        setEndtDateSelected(true);
        setEndDate(endDate);
      }
    }
  }, [fetchDeligationsData, isResolvedFetchDeligations]);

  useEffect(() => {
    if (error) {
      dispatchErrorData(error);
    }
    if (fetchDeligationsError) {
      dispatchErrorData(fetchDeligationsError);
    }
  }, [error, fetchDeligationsError]);

  useEffect(() => {
    if (data && isResolved) {
      setAlertMesssage(homePageLabels?.homePage_Delegations_Save_Success_Message);
      setShowAlertType({ show: true, type: 'success' });
    }
  }, [data, isResolved]);

  const validateData = () => {
    if (!selectedUserData) {
      setShowAlertType({ show: true });
      setAlertMesssage(homePageLabels?.homePage_Delegations_Forwarding_User_Validation_Messsage);
      return;
    }

    if (validateDates(startDate, endDate)) {
      setShowAlertType({ show: true });
      setAlertMesssage(
        homePageLabels?.homePage_Delegations_Date_Start_Greater_Than_End_Validation_Message
      );
      return;
    }

    run(URL.savePreferences, buildPreferencesRequest(startDate, endDate, selectedUserData?.item));
  };

  const resetForm = () => {
    setShowAlertType({ show: false });
    setAlertMesssage('');
    setIsResetSelectedValue(true);
    setStartDateSelected(false);
    setEndtDateSelected(false);
    setStartDate('');
    setEndDate('');
    setDefaultOptions([]);
    setDefaultValue(null);
  };

  return (
    <Styled.Container>
      <Card>
        <DialogContent
          title={homePageLabels?.homePage_Delegations_Edit_Preferences}
          dividers
          padding='standard'
          footerContent={
            <Styled.ButtonContainer>
              <div>
                <Styled.ButtonContainer>
                  <Styled.SaveButtonContainer>
                    <SavePreferences
                      savePreferences={() => {
                        setShowAlertType({ show: false });
                        setAlertMesssage('');
                        validateData();
                      }}
                    />
                    <ClearPreferences
                      resetForm={resetForm}
                      showAlert={() => {
                        setAlertMesssage(homePageLabels?.homePage_Delegations_Save_Success_Message);
                        setShowAlertType({ show: true, type: 'success' });
                      }}
                    />
                  </Styled.SaveButtonContainer>
                </Styled.ButtonContainer>
              </div>
            </Styled.ButtonContainer>
          }
        >
          <>
            <Styled.RootContainer>
              <div>
                <Styled.ForwardingUserContainer>
                  <Text appearance='auto' variant='regularBase'>
                    {homePageLabels?.homePage_Delegations_Forwarding_User}
                  </Text>
                  <ToolTip title={homePageLabels?.homePage_Delegations_Forwarding_User_Help_Text}>
                    <Styled.HelpIconWrapper>
                      <HelpFilledIcon />
                    </Styled.HelpIconWrapper>
                  </ToolTip>
                </Styled.ForwardingUserContainer>
                <AutoComplete
                  url={URL.selectDelegatee}
                  isClearable={true}
                  responseCallback={responseCallback}
                  isResetSelectedValue={isResetSelectedValue}
                  placeHolder={homePageLabels?.homePage_Delegations_Select_User}
                  selectedValueCallback={(value) => setSelectedUserData(value ? value : null)}
                  width={230}
                  value={defaultValue}
                  defaultOptionsData={defaultOptions}
                  labelNotFound={commonLabels?.common_Not_Found}
                  labeLoading={commonLabels?.common_Not_Found}
                />
                <Styled.DateCheckBoxContainer>
                  <div>
                    <Styled.DateWrapper>
                      <Checkbox
                        checked={startDateSelected}
                        onChange={(value) => {
                          const checkedValue = value.currentTarget.checked;
                          setStartDateSelected(checkedValue);
                          if (!checkedValue) {
                            setStartDate('');
                          }
                        }}
                      />
                      <Text appearance='auto' variant='regularBase'>
                        {homePageLabels?.homePage_Delegations_Start_Date}
                      </Text>
                      <ToolTip
                        title={homePageLabels?.homePage_Delegations_Start_Date_Help_Text}
                        width={300}
                      >
                        <Styled.HelpIconWrapperDates>
                          <HelpFilledIcon />
                        </Styled.HelpIconWrapperDates>
                      </ToolTip>
                    </Styled.DateWrapper>
                    <DatePickerCmp
                      disabled={!startDateSelected}
                      value={startDate}
                      min={getCurrentDate()}
                      onChangeDate={(val) => {
                        setStartDate(val as string);
                      }}
                    />
                  </div>
                  <div>
                    <Styled.DateWrapper>
                      <Checkbox
                        checked={endDateSelected}
                        onChange={(value) => {
                          const checkedValue = value.currentTarget.checked;
                          setEndtDateSelected(checkedValue);
                          if (!checkedValue) {
                            setEndDate('');
                          }
                        }}
                      />
                      <Text appearance='auto' variant='regularBase'>
                        {homePageLabels?.homePage_Delegations_End_Date}
                      </Text>
                      <ToolTip
                        title={homePageLabels?.homePage_Delegations_End_Date_Help_Text}
                        width={300}
                      >
                        <Styled.HelpIconWrapperDates>
                          <HelpFilledIcon />
                        </Styled.HelpIconWrapperDates>
                      </ToolTip>
                    </Styled.DateWrapper>
                    <DatePickerCmp
                      disabled={!endDateSelected}
                      value={endDate}
                      min={getCurrentDate()}
                      onChangeDate={(val) => {
                        setEndDate(val as string);
                      }}
                    />
                  </div>
                </Styled.DateCheckBoxContainer>
              </div>

              <div>
                {showAlertType.show && (
                  <Styled.ErrorContainer>
                    <Alert
                      motif={(showAlertType.type as any) ?? 'error'}
                      id='preferences-alert'
                      layout='normal'
                      subject={showAlertType.type === 'success' ? 'Success' : 'Error'}
                      closeButton={
                        <Button
                          aria-controls='preferences-alert'
                          motif='tertiary'
                          icon={CloseIcon}
                          onClick={() => setShowAlertType({ show: false })}
                        />
                      }
                    >
                      {alertMesssage}
                    </Alert>
                  </Styled.ErrorContainer>
                )}
              </div>
            </Styled.RootContainer>
          </>
        </DialogContent>
      </Card>
    </Styled.Container>
  );
}

------------


/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from '@wayfarer/components';
import { useEffect, useRef, useState } from 'react';
import { components, OptionProps } from 'react-select';
import AsyncSelect from 'react-select/async';
import { useTheme } from 'styled-components';
import * as Styled from './autoComplete.styles';
import { CloseIcon } from '../../images';
import api from '../axios';

type SelectedOption = {
  value: string;
  label: string;
};

type AutoCompleteTypes = {
  url: string;
  placeHolder?: string;
  isDisabled?: boolean;
  isClearable?: boolean;
  responseCallback?: (data: any) => void;
  selectedValueCallback: (data: any) => void;
  isResetSelectedValue?: boolean;
  width?: number;
  value: any;
  defaultOptionsData: any;
  getPayload?: (inputValue: string) => any;
  labelNotFound: string;
  labeLoading: string;
};

function AutoComplete({
  url,
  placeHolder = 'Select value...',
  isDisabled,
  isClearable = true,
  responseCallback,
  selectedValueCallback,
  isResetSelectedValue,
  width = 270,
  value,
  defaultOptionsData,
  labelNotFound,
  getPayload,
  labeLoading
}: AutoCompleteTypes) {
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(null);
  const [defaultOptions, setDefaultOptions] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { Option } = components;
  const theme = useTheme();

  useEffect(() => {
    if (isResetSelectedValue) {
      setSelectedOption(null);
      selectedValueCallback(null);
      setDefaultOptions([]);
    }
  }, [isResetSelectedValue]);

  useEffect(() => {
    if (value) {
      setSelectedOption(value);
    }
    if (defaultOptionsData) {
      setDefaultOptions(defaultOptionsData);
    }
  }, [value, defaultOptionsData]);

  const loadOptions = async (inputValue: string) => {
    setDefaultOptions([]);
    setIsLoading(true);
    let payload = {};

    if (getPayload) {
      payload = { ...payload, ...getPayload(inputValue) };
    } else {
      payload['query'] = inputValue;
    }

    const response = await api.post<any>(url, payload).then((res) => res?.data);

    setIsLoading(false);
    if (response && responseCallback) {
      const options = responseCallback(response);
      setDefaultOptions(options);
      return options;
    }
    setDefaultOptions(response);
    return response;
  };

  const ClearIndicator = (props: any) => {
    return (
      <components.ClearIndicator {...props}>
        <CloseIcon />
      </components.ClearIndicator>
    );
  };

  function OptionRender(props: OptionProps<SelectedOption, false>) {
    const label = props.data.label;
    return (
      <Option {...props}>
        <>
          <Styled.OptionLabel>{label}</Styled.OptionLabel>
          <Divider />
        </>
      </Option>
    );
  }

  const selectRef = useRef<any>();

  return (
    <div style={{ width: `${width}px` }}>
      <AsyncSelect
        classNamePrefix="drop-down-select"
        ref={selectRef}
        isClearable={isClearable}
        isDisabled={isDisabled}
        isSearchable
        isLoading={isLoading}
        loadingMessage={() => labeLoading}
        noOptionsMessage={() => labelNotFound}
        value={selectedOption}
        placeholder={placeHolder}
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        onChange={(value: any) => {
          setSelectedOption(value);
          selectedValueCallback(value);
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
          Option: OptionRender,
          ClearIndicator
        }}
        styles={{
          singleValue: (base) => ({
            ...base,
            maxWidth: '100%',
            color: theme.colorBlue600,
            fontSize: theme.fontSize14,
            fontWeight: theme.fontWeight500,
            lineHeight: theme.lineHeight14,
            textAlign: 'start'
          }),
          dropdownIndicator: (base) => ({
            ...base,
            marginRight: '10px'
          }),
          input: (base) => ({
            ...base,
            padding: '0px'
          }),
          option: (base, { isSelected, isFocused }) => ({
            ...base,
            padding: 0,
            backgroundColor: isSelected
              ? theme.colorBlue500
              : isFocused
              ? theme.colorBlue150
              : theme.colorWhite,
            ':hover': {
              backgroundColor: isSelected ? theme.colorBlue500 : theme.colorBlue150
            }
          }),
          menuList: (base) => ({
            ...base,
            paddingBottom: 0,
            paddingTop: 0,
            background: theme.colorWhite,
            boxShadow: theme.dropShadowRegular1,
            borderRadius: '0 0 10px 10px',
            border: 'none'
          }),
          menu: (base) => ({
            ...base,
            boxShadow: 'none',
            border: 'none',
            borderRadius: '0 0 10px 10px'
          }),
          indicatorsContainer: (base) => ({
            ...base,
            '> *': {
              padding: '0px 7px 0px 0px !important'
            }
          }),
          control: (base, { isFocused }) => ({
            ...base,
            background: theme.colorBlue100,
            borderColor: theme.colorBlue600,
            boxShadow: 'none',
            height: 32,
            minHeight: 32,
            borderWidth: isFocused ? '2px' : '1px',
            '&:hover': {
              borderColor: theme.colorBlue600,
              background: theme.colorBlue200
            }
          }),
          placeholder: (base) => ({
            ...base,
            color: theme.colorBlue600,
            fontSize: theme.fontSize14,
            fontWeight: theme.fontWeight500,
            lineHeight: theme.lineHeight14,
            textAlign: 'start'
          })
        }}
      />
    </div>
  );
}

export default AutoComplete;

------

import styled from 'styled-components';

export const OptionLabel = styled.div`
  padding: 9px;
  font-weight: ${(p) => p.theme.fontWeight500};
  font-size: ${(p) => p.theme.fontSize14};
  line-height: ${(p) => p.theme.lineHeight20};
  color: ${(p) => p.theme.colorBlack};
  text-align: start;
`;
