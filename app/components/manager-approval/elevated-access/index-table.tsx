'use client';

import * as React from 'react';
import * as Styled from './elevatedAccess.styles';
import InstructionsNote from '../../common/instructions-note';
import { useAppDispatch } from '../../common/service/redux/store';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import DataGrid, { RowSelections } from '../../common/components/datagrid';
import { setStep4Info } from '../../common/service/redux/slices/approvalsSlice';

export default function ElevatedAccess() {
  const dispatch = useAppDispatch();
  const { approvalsData } = useAppSelectorHook();
  const { step4Info } = approvalsData;
  const { selectedElevatedEntitilementData } = step4Info;

  const saveSelectedRowsData = (selectedRows: any) => {
    dispatch(
      setStep4Info({
        data: {
          ...step4Info,
          selectedElevatedEntitilementData: {
            rows: selectedRows?.map((i: any) => i.original),
          },
        },
      })
    );
  };

  const getPreselectedRowsData = (data: any): RowSelections => {
    if (data?.length > 0) {
      const preSelectedIndexData: any = {};

      if (selectedElevatedEntitilementData?.rows?.length === 0) {
        data?.forEach((row: any, index: number) => {
          preSelectedIndexData['' + index] = true;
        });
        return preSelectedIndexData;
      } else {
        selectedElevatedEntitilementData?.rows?.forEach((selectedItem: any) => {
          data?.forEach((row: any, index: number) => {
            if (selectedItem?.id === row?.id) {
              preSelectedIndexData['' + index] = true;
            }
          });
        });
        if (Object.keys(preSelectedIndexData)?.length > 0) {
          return preSelectedIndexData;
        }
      }
    }
    return {};
  };

  return (
    <Styled.Container>
      <InstructionsNote
        title='ELEVATED ACCESS'
        notes={[
          'Entitlements will be provisoned for users that are approved and excluded for users rejected.',
          'Entitlements by default are set to approved by displaying a blue check-mark.',
          'To reject an entitlement, click the blue check-mark.',
          'When done, click the green Next button at the bottom.',
        ]}
      />
      <Styled.GeneralAccessContainer>
        <DataGrid
          apiUrl={'/test'}
          preselectedRowsData={getPreselectedRowsData}
          saveSelectedRowsData={saveSelectedRowsData}
          //getDataGridPayload={getDataGridPayload}
          updateRowSelections={true}
          isPreSelectedRowsExist={true}
          isRowSelectionRequired={true}
          isPaginationRequired={false}
          tableColumnSize={{
            size: 150,
            minSize: 20,
            maxSize: 200,
          }}
          //applyFilterOnTable={executeFilterOnTable}
          //resetExecuteFilterFlag={() => setExecuteFilterOnTable(false)}
          isTableCellRequired={true}
        />
      </Styled.GeneralAccessContainer>
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}
