'use client';

import * as React from 'react';
import * as Styled from './generalAccess.styles';
import InstructionsNote from '../../common/instructions-note';
import { useAppDispatch } from '../../common/service/redux/store';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import { setStep3Info } from '../../common/service/redux/slices/approvalsSlice';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'application', headerName: 'Application Name', flex: 1 },
  { field: 'entitlement', headerName: 'Entitlement', flex: 1 },
  { field: 'description', headerName: 'Description', flex: 1 },
];

const rows = [
  {
    id: 1,
    application: 'Test Native Changes',
    entitlement: 'APM Live Changes for other items',
    description: 'APM Live Changes for other items',
  },
  {
    id: 2,
    application: 'Test Native Changes',
    entitlement: 'APM Live Changes for other items',
    description: 'APM Live Changes for other items',
  },
  {
    id: 3,
    application: 'Test Native Changes',
    entitlement: 'APM Live Changes for other items',
    description: 'APM Live Changes for other items',
  },
];

export default function ElevatedAccess() {
  const dispatch = useAppDispatch();
  const { approvalsData } = useAppSelectorHook();
  const { step3Info } = approvalsData;
  const { selectedEntitilementData } = step3Info;

  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>();

  const dispatchRowSelections = (selectedRows: any) => {
    dispatch(
      setStep3Info({
        data: {
          ...step3Info,
          selectedEntitilementData: {
            rows: selectedRows,
          },
        },
      })
    );
  };

  React.useEffect(() => {
    if (rows.length > 0) {
      const data: any = [];
      if (selectedEntitilementData?.rows?.length === 0) {
        setSelectionModel(rows.map((i: any) => i.id));
        dispatchRowSelections(rows);
      } else {
        selectedEntitilementData?.rows?.forEach((selectedItem: any) => {
          rows?.forEach((row: any) => {
            if (selectedItem?.id === row?.id) {
              data.push(row);
            }
          });
        });
        setSelectionModel(data.map((i: any) => i.id));
      }
    }
  }, [rows]);

  return (
    <Styled.Container>
      <InstructionsNote
        title='GENERAL ACCESS'
        notes={[
          'Entitlements will be provisoned for users that are approved and excluded for users rejected.',
          'Entitlements by default are set to approved by displaying a blue check-mark.',
          'To reject an entitlement, click the blue check-mark.',
          'When done, click the green Next button at the bottom.',
        ]}
      />
      <Styled.GeneralAccessContainer>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          rowSelectionModel={selectionModel}
          onRowSelectionModelChange={(e) => {
            setSelectionModel(e);
            const selectedIDs = new Set(e);
            const selectedRows = rows.filter((r) => selectedIDs.has(r.id));
            dispatchRowSelections(selectedRows);
          }}
          disableColumnMenu
          disableColumnFilter
          disableColumnSelector
          disableColumnSorting
        />
      </Styled.GeneralAccessContainer>
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}