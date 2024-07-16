'use client';

import * as React from 'react';
import * as Styled from './elevatedAccess.styles';
import InstructionsNote from '../../common/instructions-note';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../common/service/redux/store';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import { setStep4Info } from '../../common/service/redux/slices/approvalsSlice';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import RenderTypography from '../../common/components/typography';

export default function GeneralAccess() {
  const dispatch = useAppDispatch();
  const { approvalsData } = useAppSelectorHook();
  const { step4Info } = approvalsData;
  const { selectedElevatedEntitilementData } = step4Info;

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const [selectionModel, setSelectionModel] =
    React.useState<GridRowSelectionModel>();

  const dispatchRowSelections = (selectedRows: any) => {
    dispatch(
      setStep4Info({
        data: {
          ...step4Info,
          selectedElevatedEntitilementData: {
            rows: selectedRows,
          },
        },
      })
    );
  };

  const columns: GridColDef[] = [
    { field: 'application', headerName: 'Application Name', flex: 1 },
    { field: 'entitlement', headerName: 'Entitlement', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'comment',
      headerName: 'Comment',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              margin: '18px',
            }}
            onClick={(e: any) => {
              e.stopPropagation();
              setOpen(true);
              setSelectedItem(params?.row);
            }}
          >
            <EditIcon
              style={{ color: '#3A765A', width: '16px', height: '16px' }}
            />
          </div>
        );
      },
    },
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

  React.useEffect(() => {
    if (rows.length > 0) {
      const data: any = [];
      if (selectedElevatedEntitilementData?.rows?.length === 0) {
        setSelectionModel(rows.map((i: any) => i.id));
        dispatchRowSelections(rows);
      } else {
        selectedElevatedEntitilementData?.rows?.forEach((selectedItem: any) => {
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
          hideFooter={true}
          hideFooterPagination={true}
          disableColumnFilter
          disableColumnSelector
          disableColumnSorting
        />
      </Styled.GeneralAccessContainer>
      {open && (
        <Dialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
          sx={{
            '& .MuiDialog-container': {
              '& .MuiPaper-root': {
                width: '100%',
                maxWidth: '600px',
              },
            },
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            Additional Comment
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <div style={{ display: 'grid', gap: '25px' }}>
              <Typography gutterBottom>
                Please provide a comment for approval of this entitlement
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <RenderTypography title={'Application Name'} />
                  <Typography gutterBottom>
                    {(selectedItem as any)?.application}
                  </Typography>
                </div>
                <div>
                  <RenderTypography title={'Entitlement'} />
                  <Typography gutterBottom>
                    {(selectedItem as any)?.entitlement}
                  </Typography>
                </div>
              </div>
              <div>
                <RenderTypography title={'Comment'} />
                <TextField
                  label=''
                  InputLabelProps={{
                    shrink: true,
                  }}
                  multiline
                  rows={2}
                  sx={{ width: 500 }}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button style={{ textTransform: 'none' }} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='success'
              style={{ textTransform: 'none' }}
              onClick={handleClose}
            >
              Post Comment
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Styled.EmptyWrapper />
    </Styled.Container>
  );
}
