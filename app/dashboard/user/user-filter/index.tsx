/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DropDown, SearchIcon, AutoComplete } from 'exp-ui-web-components-mfe';
import { useEffect, useState } from 'react';
import * as Styled from './userFilter.styles';
import { SelectedUsersDetailsType } from 'mocks/data/selectedUsers';
import {
  useSelecedUsersContextSetState,
  useSelecedUsersContextState
} from 'packages/common/selected-users-context';
import api from 'packages/common/service/axios';
import { URL } from 'packages/util';

type FilterType = {
  value: string;
  label: string;
};

export default function UserFilter() {
  const [isResetSelectedValue, setIsResetSelectedValue] = useState<boolean>(false);
  const [advanceFilterData, setAdvanceFilterData] = useState<FilterType[]>();
  //const [selectedUser, setSelectedUser] = useState();

  const existingSelectedUsersInfo = useSelecedUsersContextState();
  const setSelectedUsersInfo = useSelecedUsersContextSetState();
  const filterType = existingSelectedUsersInfo?.data?.userFilters?.filterType;
  const selectedUserObj = existingSelectedUsersInfo?.data?.userFilters?.selectedUser;

  const selectedValue = { value: filterType, label: filterType };

  const getPayload = (inputValue: string) => {
    return {
      filter: 'identity',
      filterType: selectedValue?.value,
      userSearchFilter: inputValue
    };
  };

  useEffect(() => {
    api.post(URL.getAddAccessFilters, { filterType: 'identityFilter' }).then((response) => {
      setAdvanceFilterData(
        response?.data?.objects[0]?.allowedValues?.map((item) => {
          return {
            value: item,
            label: item
          };
        })
      );
    });
  }, []);

  return (
    <Styled.Container>
      <Styled.SearchWrapper>
        <Styled.DropDownWrapper>
          <DropDown
            options={advanceFilterData ?? []}
            width={120}
            height={40}
            isClearable={false}
            onSelectCombo={(data) => {
              setIsResetSelectedValue(true);
              setTimeout(() => {
                setIsResetSelectedValue(false);
              }, 200);

              const filterData = {
                ...existingSelectedUsersInfo.data.userFilters,
                filterType: data.value
              };
              setSelectedUsersInfo({
                data: {
                  ...existingSelectedUsersInfo.data,
                  userFilters: filterData
                }
              });
            }}
            selectedValue={selectedValue}
          />
        </Styled.DropDownWrapper>
        <Styled.AutoCompleteWrapper $isDisabled={selectedValue?.value === 'Self'}>
          <AutoComplete
            url={URL.getAddAccessFilterValues}
            getPayload={getPayload}
            width={350}
            height={40}
            isClearable={true}
            isDisabled={selectedValue?.value === 'Self'}
            responseCallback={(data: SelectedUsersDetailsType) => {
              return data && data?.objects
                ? data?.objects?.map((item) => {
                    return {
                      value: item?.id,
                      label: item?.displayName,
                      item: item
                    };
                  })
                : [];
            }}
            placeHolder={'Search for users...'}
            value={selectedUserObj}
            isResetSelectedValue={isResetSelectedValue}
            selectedValueCallback={(value) => {
              const selectedUsersData = {
                ...existingSelectedUsersInfo.data.userFilters,
                selectedUser: value
              };
              setSelectedUsersInfo({
                data: {
                  ...existingSelectedUsersInfo.data,
                  userFilters: selectedUsersData
                }
              });
            }}
            labelNotFound={'Not Found'}
            labeLoading={'Loading...'}
          />
        </Styled.AutoCompleteWrapper>
        <Styled.Search
          onClick={() => {
            if (selectedValue[0]?.value !== 'Self') {
              console.log('seacrh');
            }
          }}
        >
          <SearchIcon />
        </Styled.Search>
      </Styled.SearchWrapper>
    </Styled.Container>
  );
}
