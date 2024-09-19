/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ButtonGroup, Dialog } from '@wayfarer/components';
import { CloseIcon } from 'exp-ui-web-components-mfe';
import { ReactNode, useEffect, useState } from 'react';
import UserDataTable from './user-data-table';
import * as Styled from './userCardSection.styles';
import { AddAccessUser } from 'mocks/data/getAddAccessUsersList';
import { useSelectedEntitlementAccountContextSetState } from 'packages/common/selected-accounts-context';
import {
  useSelectedEntitlementsContextSetState,
  useSelectedEntitlementsContextState
} from 'packages/common/selected-entitlement-context';
import {
  useSelecedUsersContextSetState,
  useSelecedUsersContextState
} from 'packages/common/selected-users-context';
import EmptyResultsPanel from 'packages/step-selection/access-selection/empty-results-panel';
import { URL } from 'packages/util';

const alertInitialData = {
  show: false,
  title: '',
  description: '',
  isChecked: '',
  user: undefined
};

export type ShowAlertType = {
  show: boolean;
  title: string;
  description: ReactNode | string;
  isChecked: string;
  user: AddAccessUser | undefined;
};

export default function UserCardSelection() {
  const [executeFilterOnTable, setExecuteFilterOnTable] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<ShowAlertType>(alertInitialData);

  const setSelectedUsersInfo = useSelecedUsersContextSetState();
  const existingSelectedUsersInfo = useSelecedUsersContextState();
  const existingSelectedEntitlementsInfo = useSelectedEntitlementsContextState();
  const setSelectedEntitlementsInfo = useSelectedEntitlementsContextSetState();
  const setSelectedEntitlementAccountsInfo = useSelectedEntitlementAccountContextSetState();

  const selectedFilterType = existingSelectedUsersInfo?.data?.userFilters?.filterType;
  const selectedUser = existingSelectedUsersInfo?.data?.userFilters?.selectedUser;

  useEffect(() => {
    if (selectedFilterType || selectedUser) {
      setExecuteFilterOnTable(true);
    }
  }, [selectedFilterType, selectedUser]);

  const getDataGridPayload = () => {
    return {
      userTypeFilter: selectedFilterType ?? 'Self',
      userSearchFilter: selectedUser && selectedUser?.value ? selectedUser?.value : ''
    };
  };

  const getDescription = () => {
    return (
      <Styled.DescriptionContainer>
        <div>This action will remove all selected items from this request.</div>
        <div>Do you want to continue?</div>
        <div>Yes - proceed with this action and re-select request items</div>
        <div> No - cancel this action and proceed with the request</div>
      </Styled.DescriptionContainer>
    );
  };

  const saveSelectedRowsData = (user: AddAccessUser, isChecked: boolean) => {
    if (isChecked) {
      if (existingSelectedEntitlementsInfo?.data?.selectedEntitlements?.length > 0) {
        setShowAlert({
          show: true,
          title: 'Warning',
          isChecked: 'true',
          description: getDescription(),
          user: user
        });
        return;
      }

      setSelectedUsersInfo({
        data: {
          ...existingSelectedUsersInfo.data,
          selectedUsers: [...existingSelectedUsersInfo.data.selectedUsers, user]
        }
      });
    } else {
      if (
        existingSelectedUsersInfo?.data?.selectedUsers?.length === 1 &&
        existingSelectedEntitlementsInfo?.data?.selectedEntitlements?.length > 0
      ) {
        setShowAlert({
          show: true,
          title: 'Warning',
          isChecked: 'false',
          description: getDescription(),
          user: user
        });
        return;
      }
      removeUserFromStore(user);
    }
  };

  const removeUserFromStore = (user: AddAccessUser) => {
    const currentUsers = [...existingSelectedUsersInfo.data.selectedUsers];
    const finalList: any = [];
    currentUsers?.forEach((currentUser: AddAccessUser) => {
      let isUserExist = false;
      if (currentUser?.id === user?.id) {
        isUserExist = true;
      }
      if (!isUserExist) {
        finalList?.push(currentUser);
      }
    });

    setSelectedUsersInfo({
      data: {
        ...existingSelectedUsersInfo.data,
        selectedUsers: [...finalList]
      }
    });
  };

  const isUserAdded = (userObj: AddAccessUser) => {
    const currentUsers = [...existingSelectedUsersInfo.data.selectedUsers];
    if (currentUsers && currentUsers?.length > 0) {
      const selectedUser = currentUsers?.filter((user: AddAccessUser) => user?.id === userObj?.id);
      return selectedUser?.length === 1;
    } else {
      return false;
    }
  };

  const onClickYes = (user: AddAccessUser, isChecked: string) => {
    if (isChecked === 'false') {
      removeUserFromStore(user);
    } else {
      setSelectedUsersInfo({
        data: {
          ...existingSelectedUsersInfo.data,
          selectedUsers: [...existingSelectedUsersInfo.data.selectedUsers, user]
        }
      });
    }

    setSelectedEntitlementsInfo({
      data: {
        ...existingSelectedEntitlementsInfo.data,
        selectedEntitlements: [],
        entitlementFilters: {},
        advanceFilters: {}
      }
    });
    setSelectedEntitlementAccountsInfo({
      selectedAccountsInfoForEntitlement: {}
    });
    setShowAlert(alertInitialData);
  };

  return (
    <Styled.RoootContainer>
      <UserDataTable
        apiUrl={URL.getAddAccessUsersList}
        isUserAdded={isUserAdded}
        saveSelectedRowsData={saveSelectedRowsData}
        getDataGridPayload={getDataGridPayload}
        emptyResultsPanel={<EmptyResultsPanel title="Search for Users" />}
        applyFilterOnTable={executeFilterOnTable}
        resetExecuteFilterFlag={() => setExecuteFilterOnTable(false)}
      />
      {showAlert && showAlert?.show && (
        <Dialog
          open={showAlert.show}
          onClose={() => {
            setShowAlert(alertInitialData);
          }}
          size="medium"
          title={'Warning'}
          id="warning-alert"
          dividers
          footerContent={
            <Styled.ButtonContainer>
              <ButtonGroup>
                <Button
                  onClick={() => {
                    setShowAlert(alertInitialData);
                  }}
                >
                  No
                </Button>
                <Button
                  motif="primary"
                  onClick={() => {
                    onClickYes(showAlert.user as AddAccessUser, showAlert.isChecked);
                  }}
                >
                  Yes
                </Button>
              </ButtonGroup>
            </Styled.ButtonContainer>
          }
          headerButtonEnd={(id) => (
            <Button
              motif="tertiary"
              onClick={() => {
                setShowAlert(alertInitialData);
              }}
              icon={CloseIcon}
              aria-label="CloseFilled"
              aria-controls={id}
            />
          )}
        >
          {showAlert?.description}
        </Dialog>
      )}
    </Styled.RoootContainer>
  );
}
