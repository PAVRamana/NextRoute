'use client';

import * as React from 'react';
import * as Styled from './elevatedAccess.styles';
import InstructionsNote from '../../common/instructions-note';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch } from '../../common/service/redux/store';
import { useAppSelectorHook } from '../../common/service/hook/useAppSelectorHook';
import { setStep4Info } from '../../common/service/redux/slices/approvalsSlice';
import {
  DataGrid,
  GridColDef,
  GridRowSelectionModel,
  GRID_CHECKBOX_SELECTION_COL_DEF,
} from '@mui/x-data-grid';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Button, TextField } from '@mui/material';
import RenderTypography from '../../common/components/typography';

let rows = [
  {
    id: 1,
    application: 'Test Native Changes',
    entitlement: 'APM Live Changes for other items',
    description: 'APM Live Changes for other items',
    comment: '',
  },
  {
    id: 2,
    application: 'Test Native Changes1',
    entitlement: 'APM Live Changes for other items1',
    description: 'APM Live Changes for other items1',
    comment: '',
  },
  {
    id: 3,
    application: 'Test Native Changes2',
    entitlement: 'APM Live Changes for other items2',
    description: 'APM Live Changes for other items2',
    comment: '',
  },
];

export default function GeneralAccess() {
  const dispatch = useAppDispatch();
  const { approvalsData } = useAppSelectorHook();
  const { step4Info } = approvalsData;
  const { selectedElevatedEntitilementData } = step4Info;

  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState();
  const [comment, setComment] = React.useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const updatedData = () => {
    const currentDataObj = JSON.parse(
      JSON.stringify(selectedElevatedEntitilementData?.rows)
    );

    const currentRows = JSON.parse(JSON.stringify(rows));
    if (currentDataObj?.length > 0) {
      currentRows.forEach((i: any) => {
        const isRowExist = currentDataObj?.filter(
          (item: any) => item.id === i.id
        );
        if (isRowExist?.length > 0) {
          i.comment = isRowExist[0]?.comment;
        }
      });
    }
    return currentRows;
  };

  const [dataRows, setDataRows] = React.useState(updatedData());

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

  const updateComment = () => {
    const currentDataObj = JSON.parse(
      JSON.stringify(selectedElevatedEntitilementData?.rows)
    );
    console.log(currentDataObj);

    currentDataObj.forEach((item: any) => {
      if (item.id === (selectedItem as any)?.id) {
        item.comment = comment;
      }
    });

    dispatchRowSelections(currentDataObj);

    const currentData = JSON.parse(JSON.stringify(dataRows));
    const updatedRows = currentData.map((i: any) => {
      if (i.id === (selectedItem as any)?.id) {
        i.comment = comment;
      }
      return i;
    });

    setDataRows(updatedRows);
    setComment('');
    setOpen(false);
  };

  const isCommentsExist = () => {
    return dataRows?.filter((i: any) => i?.comment)?.length > 0;
  };

  const getIconColor = (id: number) => {
    const isSelected = selectedElevatedEntitilementData?.rows.filter(
      (selectedItem: any) => selectedItem?.id === id
    );

    if (isSelected?.length > 0) {
      return isSelected[0].comment ? 'green' : 'red';
    } else {
      return 'black';
    }
  };

  const isRowSelected = (id: number) => {
    const isSelected = selectedElevatedEntitilementData?.rows.filter(
      (selectedItem: any) => selectedItem?.id === id
    );
    return isSelected?.length > 0;
  };

  const columns: GridColDef[] = [
    { field: 'application', headerName: 'Application Name', flex: 1 },
    { field: 'entitlement', headerName: 'Entitlement', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'comment',
      headerName: 'Comment',
      headerAlign: isCommentsExist() ? 'left' : 'center',
      align: isCommentsExist() ? 'left' : 'center',
      sortable: false,
      flex: 1,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: isCommentsExist() ? 'flex-start' : 'center',
              alignItems: 'center',
              textAlign: 'center',
              // opacity: params?.row?.comment ? 1 : 0.5,
              gap: '10px',
              margin: params?.row?.comment ? '0px' : '20px 0px',
            }}
            onClick={(e: any) => {
              e.stopPropagation();
              if (isRowSelected(params?.row?.id)) {
                setOpen(true);
                setSelectedItem(params?.row);
              }
            }}
          >
            <EditIcon
              style={{
                width: '16px',
                height: '16px',
                color: params?.row?.comment
                  ? 'green'
                  : getIconColor(params?.row?.id),
              }}
            />
            <div
              style={{
                wordBreak: 'break-word',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={params?.row?.comment}
            >
              {params?.row?.comment}
            </div>
          </div>
        );
      },
    },
    {
      ...GRID_CHECKBOX_SELECTION_COL_DEF,
      headerClassName: 'elevated-access-cls',
      resizable: false,
      width: 150,
    },
  ];

  React.useEffect(() => {
    if (rows.length > 0) {
      const data: any = [];
      selectedElevatedEntitilementData?.rows?.forEach((selectedItem: any) => {
        rows?.forEach((row: any) => {
          if (selectedItem?.id === row?.id) {
            data.push(row);
          }
        });
      });
      setSelectionModel(data.map((i: any) => i.id));
    }
  }, [rows]);

  React.useEffect(() => {
    var interval = setInterval(function () {
      const gridHeader = document.querySelectorAll('.elevated-access-cls');
      if (
        gridHeader &&
        gridHeader?.length > 0 &&
        !document.getElementById('custom-select-all-id')
      ) {
        const spanHeader =
          gridHeader[gridHeader?.length - 1]?.firstChild?.firstChild?.firstChild
            ?.firstChild;
        var label = document.createElement('label');
        label.id = 'custom-select-all-id';
        label.innerHTML = 'Select All';
        label.className = 'custom-select-all-cls';
        spanHeader?.insertBefore(label, spanHeader?.firstChild);
        clearInterval(interval);
      }
    }, 100);
  }, []);

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
          rows={dataRows ?? []}
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

            const selectedRowsData = JSON.parse(JSON.stringify(selectedRows));

            const currentDataObj = JSON.parse(
              JSON.stringify(selectedElevatedEntitilementData?.rows)
            );

            selectedRowsData?.forEach((i: any) => {
              const isSelected = currentDataObj?.filter(
                (selectedItem: any) => selectedItem.id === i.id
              );
              if (isSelected?.length > 0) {
                i.comment = isSelected[0]?.comment;
              }
            });
            dispatchRowSelections(selectedRowsData);
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
            <div style={{ display: 'grid', gap: '20px' }}>
              <Typography
                variant='body1'
                style={{ fontSize: '13px' }}
                gutterBottom
              >
                Please provide a comment for approval of this entitlement
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <RenderTypography title={'Application Name'} />
                  <Typography variant='body1' style={{ fontSize: '13px' }}>
                    {(selectedItem as any)?.application}
                  </Typography>
                </div>
                <div>
                  <RenderTypography title={'Entitlement'} />
                  <Typography variant='body1' style={{ fontSize: '13px' }}>
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
                  value={comment ? comment : (selectedItem as any)?.comment}
                  onChange={(e: any) => {
                    setComment(e.target.value);
                  }}
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
              onClick={updateComment}
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
