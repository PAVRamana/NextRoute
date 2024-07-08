/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */

import { useQuery } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { useEffect, useMemo, useState } from 'react';
import * as Styled from './dataGrid.styles';
import { ELLIPSIS, useReactTablePaginationRange } from './pagination';
import api from '../../service/axios';
import { Checkbox } from '@mui/material';
import FullPageLoader from '../../full-page-loader';

const intialPagingData = {
  pageIndex: 0,
  pageSize: 25,
};

const defaultColumnSizeData = {
  size: 150,
  minSize: 20,
  maxSize: 200,
};

export type RowSelections = {
  [key: string]: boolean;
};

export type TabeleColumnSizeType = {
  size: number;
  minSize: number;
  maxSize: number;
};

export type ActionColumnMenuType = {
  id: string;
  label: string;
  icon: any;
  isClickable: boolean;
  onClickMenu: (record: any) => void;
};

type DataGridTypes = {
  apiUrl: string;
  preselectedRowsData?: (data: any) => RowSelections;
  saveSelectedRowsData?: (data: any) => void;
  isPreSelectedRowsExist?: boolean;
  isRowSelectionRequired?: boolean;
  updateRowSelections?: boolean;
  isPaginationRequired?: boolean;
  getDataGridPayload?: () => any;
  tableColumnSize?: TabeleColumnSizeType;
  tableData?: any;
  applyFilterOnTable?: boolean;
  resetExecuteFilterFlag?: () => void;
};

export default function DataGrid({
  apiUrl,
  preselectedRowsData,
  saveSelectedRowsData,
  isPreSelectedRowsExist,
  isRowSelectionRequired,
  isPaginationRequired,
  getDataGridPayload,
  tableColumnSize,
  updateRowSelections,
  tableData,
  applyFilterOnTable,
  resetExecuteFilterFlag,
}: DataGridTypes) {
  const [rowSelection, setRowSelection] = useState<RowSelections>({});
  const [pagination, setPagination] =
    useState<PaginationState>(intialPagingData);
  const defaultData = useMemo(() => [], []);

  //Update row selections dynamically based on updateRowSelections flag
  useEffect(() => {
    if (updateRowSelections) {
      const rowelections =
        preselectedRowsData && preselectedRowsData(dataQuery.data?.rows);
      if (rowelections && Object.keys(rowelections)?.length >= 0) {
        setRowSelection(rowelections);
      }
    }
  }, [updateRowSelections]);

  //Defining useQuery to fetch table data
  const dataQuery = useQuery({
    queryKey: isPaginationRequired ? ['data', pagination] : ['data'],
    queryFn: () =>
      tableData && tableData?.objects?.length > 0
        ? loadStaticData()
        : fetchGridData(isPaginationRequired ? pagination : {}),
  });

  useEffect(() => {
    if (applyFilterOnTable) {
      //setPagination(intialPagingData);
      //dataQuery.refetch();
      //Fetch Pre Selected data and select row(s) by default
      if (isPreSelectedRowsExist && preselectedRowsData) {
        const rowelections = preselectedRowsData(tableData?.objects);
        if (rowelections && Object.keys(rowelections)?.length > 0) {
          setRowSelection(rowelections);
        }
      }
    }
  }, [applyFilterOnTable]);

  useEffect(() => {
    if (dataQuery?.isSuccess) {
      resetExecuteFilterFlag && resetExecuteFilterFlag();
    }
  }, [dataQuery]);

  const loadStaticData = () => {
    // await new Promise((r) => setTimeout(r, 5000));
    return {
      rows: tableData.objects,
      headers: tableData.headers,
      rowCount: tableData.count,
      innerTableHeaders: tableData.innerTableHeaders ?? [],
    };
  };

  //Fetch Grid data based on payload
  const fetchGridData = async (
    options: { pageIndex: number; pageSize: number } | any
  ) => {
    // await new Promise((r) => setTimeout(r, 5000));
    let payload = {};

    //Set Pagination payload when isPaginationRequired is true
    if (isPaginationRequired) {
      payload = {
        ...payload,
        paging: {
          limit: options?.pageSize,
          start: options?.pageIndex * options?.pageSize,
        },
      };
    }

    //Fetch custom payload via callback
    if (getDataGridPayload) {
      payload = { ...payload, ...getDataGridPayload() };
    }

    const mockdata = {
      headers: [
        { accessor: 'application', Header: 'Application' },
        { accessor: 'entitlement', Header: 'Entitlement' },
      ],
      objects: [
        {
          application: 'Test Native Changes',
          entitlement: 'APM Live Changes for other items',
          id: 1,
        },
        {
          application: 'Test Native Changes',
          entitlement: 'APM Live Changes for other items',
          id: 2,
        },
        {
          application: 'Test Native Changes',
          entitlement: 'APM Live Changes for other items',
          id: 3,
        },
      ],
      count: 3,
    };

    const response = await api
      .post(apiUrl, payload)
      .then((res) => res?.data)
      ?.catch(() => mockdata);

    //Fetch Pre Selected data and select row(s) by default
    if (isPreSelectedRowsExist && preselectedRowsData) {
      const rowelections = preselectedRowsData(response?.objects);
      if (rowelections && Object.keys(rowelections)?.length > 0) {
        setRowSelection(rowelections);
      }
    }

    return {
      rows: response.objects,
      headers: response.headers,
      rowCount: response.count,
      innerTableHeaders: response.innerTableHeaders,
    };
  };

  //Build table colums
  const getColumns = (gridDataHeaders: any) => {
    if (gridDataHeaders) {
      const columnsArray: any[] = [];

      if (isRowSelectionRequired) {
        columnsArray.push({
          id: 'select-checkbox',
          accessorKey: 'Action',
          header: () => <Styled.Action>{'Action'}</Styled.Action>,
          size: 10,
          cell: ({ row }: any) => (
            <Styled.CheckBox>
              <Checkbox
                onChange={row?.getToggleSelectedHandler()}
                indeterminate={row?.getIsSomeSelected()}
                checked={row?.getIsSelected()}
                disabled={!row?.getCanSelect()}
              />
            </Styled.CheckBox>
          ),
        });
      }

      columnsArray.push(
        ...dataQuery.data?.headers?.map((item: any) => {
          return {
            accessorKey: item.accessor,
            id: item.accessor,
            header: () => <div>{item.Header}</div>,
          };
        })
      );

      return columnsArray;
    }
    return [];
  };

  const columns = getColumns(dataQuery.data?.headers);

  //Default table properties
  let tableProps: any = {
    data: dataQuery.data?.rows ?? defaultData,
    rowCount: dataQuery.data?.rowCount,
    columns: columns ?? defaultData,
    debugAll: false,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    defaultColumn: tableColumnSize ? tableColumnSize : defaultColumnSizeData,
  };

  //Pagination table properties
  if (isPaginationRequired) {
    tableProps = {
      ...tableProps,
      onPaginationChange: setPagination,
      getPaginationRowModel: getPaginationRowModel(),
      manualPagination: true,
    };
    tableProps.state = {
      pagination,
    };
  }

  //Row Selection table properties
  if (isRowSelectionRequired) {
    tableProps = {
      ...tableProps,
      enableRowSelection: isRowSelectionRequired,
      onRowSelectionChange: setRowSelection,
    };
    if (tableProps.state) {
      tableProps.state['rowSelection'] = rowSelection;
    } else {
      tableProps.state = {
        rowSelection,
      };
    }
  }

  const table = useReactTable(tableProps);

  const {
    getCanPreviousPage,
    previousPage,
    nextPage,
    getCanNextPage,
    setPageIndex,
    getPageCount,
    getState,
    setPageSize,
    getSelectedRowModel,
  } = table;

  //For page number caculation based on table data count
  const paginationRange = useReactTablePaginationRange(table);

  //Get current selected rows data from selectedRowModel
  const currentSelectedRows = getSelectedRowModel().rows;

  //Saving selected rows information via callback
  useEffect(() => {
    if (
      currentSelectedRows &&
      currentSelectedRows?.length > 0 &&
      isRowSelectionRequired
    ) {
      saveSelectedRowsData && saveSelectedRowsData(currentSelectedRows);
    }
  }, [currentSelectedRows]);

  //Render Table Headers
  const renderTableHeaders = () => {
    return (
      <thead>
        {table &&
          table?.getHeaderGroups()?.map((headerGroup) => (
            <tr key={headerGroup?.id}>
              {headerGroup &&
                headerGroup?.headers &&
                headerGroup?.headers?.map((header) => {
                  return (
                    <th
                      key={header?.id}
                      colSpan={header?.colSpan}
                      style={{ position: 'relative', width: header?.getSize() }}
                    >
                      {header?.isPlaceholder ? null : (
                        <>
                          {flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                        </>
                      )}
                    </th>
                  );
                })}
            </tr>
          ))}
      </thead>
    );
  };

  //Render Table Body
  const renderTableBody = () => {
    return (
      <tbody>
        {table &&
          table?.getRowModel()?.rows?.map((row) => {
            return (
              <>
                <tr key={row?.id}>
                  {row?.getVisibleCells()?.map((cell) => {
                    return (
                      <td key={cell?.id}>
                        <div>
                          {flexRender(
                            cell?.column?.columnDef?.cell,
                            cell?.getContext()
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              </>
            );
          })}
      </tbody>
    );
  };

  //Render React table
  return (
    <Styled.Container>
      <table>
        {renderTableHeaders()}
        {renderTableBody()}
      </table>
      {dataQuery?.isLoading && (
        <table>
          <tbody>
            <Styled.Spinner>
              <FullPageLoader />
            </Styled.Spinner>
          </tbody>
        </table>
      )}
      {isPaginationRequired && (
        <Styled.PaginationContainer>
          <button
            style={{ opacity: !getCanPreviousPage() ? 0.5 : 1 }}
            onClick={() => previousPage()}
            disabled={!getCanPreviousPage()}
          >
            Previous
          </button>
          <Styled.PageNumbers>
            {paginationRange &&
              paginationRange?.length > 0 &&
              paginationRange?.map((page, index) => (
                <div key={index}>
                  {page === ELLIPSIS ? (
                    <span>…</span>
                  ) : (
                    <Styled.SelectedPage
                      $isSelected={
                        table.getState().pagination.pageIndex + 1 === page
                      }
                      onClick={() => setPageIndex(page - 1)}
                    >
                      {page}
                    </Styled.SelectedPage>
                  )}
                </div>
              ))}
          </Styled.PageNumbers>
          <button
            style={{ opacity: !getCanNextPage() ? 0.5 : 1 }}
            onClick={() => nextPage()}
            disabled={!getCanNextPage()}
          >
            Next
          </button>
        </Styled.PaginationContainer>
      )}
    </Styled.Container>
  );
}
