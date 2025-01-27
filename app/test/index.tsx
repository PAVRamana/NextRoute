/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */
/*
  <DataGrid
    url={'/api/xyz'}
    isPreSelectedRowsExist={true/false} //Enable if Pre Selected Rows Exist
    preselectedRowsData={{ '0': true, '1': true, '2': true }} //To pre poluate previous selected rows
    saveSelectedRowsData={(data)=>{console.log(data)}} //To save selected rows data
    isRowSelectionRequired={true/false} //Enable if Row Selection Required
    isColumnResizeRequired={true/false} //Enable if Column Resize Required
    isPaginationRequired={true/false} //Enable if Pagination Required
    isActionColumnRequired={true/false} //Enable if Action Column Required
    actionColumnMenuItems={[
    {
      id: 'id',
      label: 'label',
      icon: icon,
      onClickMenu: (record) => {(record)=>{console.log(record)}}
    }]}
    isRowExpandRequired={true/false} //Pass inner table headers and data from main API response
    showDetailsModalList={['displayValue']} //List of columns to show details modal 
    showDetailsModalHanlder={showDetailsModalHanlder} //Handler for showing details modal 
    tableColumnSize={{
      size: 150,
      minSize: 20,
      maxSize: 200
    }} //Custom Column Sizes for table columns 
    updateRowSelections={true/false} //Flag to update previous selected rows in table 
    isTableRenderingInModal={true/false} //Flag to display data grid in Modal
    tableData={{
      headers: [{ accessor: 'name', Header: 'Name' }],
      objects: [{name: 'spadmin'}],
      count: 1
    }} //Static data to load the table
    applyFilterOnTable={true/false} //Flag to apply external filters on table
    resetExecuteFilterFlag?: () => void; //Callback to rerest external filter flag
    emptyResultsPanel:<EmptyResultsPanel/> //Pass search results empty component
  />
*/

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  PaginationState,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Checkbox, Donut, Popover, Text } from '@wayfarer/components';
import {
  MoreIcon,
  CollapseIcon,
  ExpandIcon,
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
} from '../../images';
import ToolTip from '../tooltip';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import * as Styled from './dataGrid.styles';
import InnerTable from './innerTable';
import { ELLIPSIS, useReactTablePaginationRange } from './pagination';
import api from '../axios';
import PersonCard from '../person-card';

const intialPagingData = {
  pageIndex: 0,
  pageSize: 25,
};

const rowsPerPage = [25, 50, 100];
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
  emptyResultsPanel: ReactNode;
  isColumnResizeRequired?: boolean;
  updateRowSelections?: boolean;
  isPaginationRequired?: boolean;
  queryKeyId?: string;
  getDataGridPayload?: () => any;
  isActionColumnRequired?: boolean;
  isInnerTableHeaderRequired?: boolean;
  actionColumnMenuItems?: ActionColumnMenuType[];
  isRowExpandRequired?: boolean;
  showDetailsModalList?: string[];
  showDetailsModalHanlder?: (data: any) => void;
  onMoreIconClick?: (data: any) => void;
  tableColumnSize?: TabeleColumnSizeType;
  isTableRenderingInModal?: boolean;
  tableData?: any;
  applyFilterOnTable?: boolean;
  resetExecuteFilterFlag?: () => void;
};

const queryClient = new QueryClient();

export default function DataGrid({
  apiUrl,
  preselectedRowsData,
  saveSelectedRowsData,
  isPreSelectedRowsExist,
  isRowSelectionRequired,
  isPaginationRequired,
  queryKeyId,
  isColumnResizeRequired,
  isActionColumnRequired,
  isInnerTableHeaderRequired,
  getDataGridPayload,
  actionColumnMenuItems,
  emptyResultsPanel,
  isRowExpandRequired,
  showDetailsModalList,
  showDetailsModalHanlder,
  onMoreIconClick,
  tableColumnSize,
  updateRowSelections,
  isTableRenderingInModal,
  tableData,
  applyFilterOnTable,
  resetExecuteFilterFlag,
}: DataGridTypes) {
  const [rowSelection, setRowSelection] = useState<RowSelections>({});
  const [showPopoverMenu, setShowPopoverMenu] = useState<string>('');
  const [pagination, setPagination] =
    useState<PaginationState>(intialPagingData);
  const [isExpanded, setIsExpanded] = useState<string>('');
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
    queryKey: isPaginationRequired ? [queryKeyId, pagination] : [queryKeyId],
    queryFn: () =>
      tableData && tableData?.objects?.length > 0
        ? loadStaticData()
        : fetchGridData(isPaginationRequired ? pagination : {}),
  });

  useEffect(() => {
    if (applyFilterOnTable) {
      setPagination(intialPagingData);
      dataQuery.refetch();
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

    const response = await api.post(apiUrl, payload).then((res) => res?.data);

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

      if (isRowExpandRequired) {
        columnsArray.push({
          id: 'expand-collapse',
          size: 10,
          enableResizing: false,
          cell: ({ row }) => (
            <Styled.ExpandColumn
              onClick={() => setIsExpanded(!isExpanded ? row.id : '')}
            >
              {isExpanded === row.id ? <CollapseIcon /> : <ExpandIcon />}
            </Styled.ExpandColumn>
          ),
        });
      }

      if (isRowSelectionRequired) {
        columnsArray.push({
          id: 'select-checkbox',
          size: 10,
          enableResizing: false,
          cell: ({ row }) => (
            <Styled.CheckBox>
              <Checkbox
                onChange={row.getToggleSelectedHandler()}
                indeterminate={row.getIsSomeSelected()}
                checked={row.getIsSelected()}
                disabled={!row.getCanSelect()}
              />
            </Styled.CheckBox>
          ),
        });
      }

      columnsArray.push(
        ...dataQuery.data?.headers?.map((item) => {
          return {
            accessorKey: item.accessor,
            id: item.accessor,
            header: () => (
              <ToolTip title={item.Header} placement='left'>
                <div>{item.Header}</div>
              </ToolTip>
            ),
          };
        })
      );

      if (
        isActionColumnRequired &&
        actionColumnMenuItems &&
        actionColumnMenuItems?.length > 0
      ) {
        columnsArray.push({
          id: 'action',
          size: 20,
          enableResizing: false,
          cell: ({ row }) => {
            return (
              <>
                {row?.original.id === showPopoverMenu && (
                  <Popover
                    placement='auto'
                    open={row?.original.id === showPopoverMenu}
                    onClose={() => setShowPopoverMenu('')}
                    content={
                      <Styled.PopoverMenu>
                        {actionColumnMenuItems &&
                          actionColumnMenuItems?.map((item, index: number) => {
                            return (
                              <Styled.PopoverMenuItems
                                $isClickable={item.isClickable ? true : false}
                                key={index}
                                onClick={() => item.onClickMenu(row?.original)}
                              >
                                {item.icon}
                                <Text appearance='auto' variant='regularBase'>
                                  {item.label}
                                </Text>
                              </Styled.PopoverMenuItems>
                            );
                          })}
                      </Styled.PopoverMenu>
                    }
                  >
                    <div></div>
                  </Popover>
                )}

                <Styled.MoreIcon
                  onMouseUp={() => {
                    showPopoverMenu && setShowPopoverMenu('');
                    setTimeout(() => {
                      setShowPopoverMenu(row?.original.id);
                    }, 100);
                    onMoreIconClick && onMoreIconClick(row?.original);
                  }}
                >
                  <MoreIcon />
                </Styled.MoreIcon>
              </>
            );
          },
        });
      }
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

  //Column Resize table properties
  if (isColumnResizeRequired) {
    tableProps = {
      ...tableProps,
      enableColumnResizing: true,
      columnResizeMode: 'onChange',
    };
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
      currentSelectedRows?.length >= 0 &&
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
                      {isColumnResizeRequired &&
                        header?.column?.getCanResize() && (
                          <div
                            onMouseDown={header?.getResizeHandler()}
                            onTouchStart={header?.getResizeHandler()}
                            className={`resizer ${
                              header?.column?.getIsResizing()
                                ? 'isResizing'
                                : ''
                            }`}
                          ></div>
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
      <>
        {table && table?.getRowModel()?.rows?.length > 0 && (
          <tbody>
            {table?.getRowModel()?.rows?.map((row) => {
              return (
                <>
                  <tr key={row?.id}>
                    {row?.getVisibleCells()?.map((cell) => {
                      const innerTableData: any = cell?.row?.original;
                      return (
                        <Styled.TextWrap
                          key={cell?.id}
                          title={cell.getValue() as string}
                          style={{
                            maxWidth: `${cell.column.getSize()}px`,
                          }}
                        >
                          {showDetailsModalList &&
                          showDetailsModalHanlder &&
                          showDetailsModalList?.includes(cell?.column?.id) ? (
                            <Styled.Link
                              onClick={() => {
                                if (showDetailsModalHanlder) {
                                  innerTableData['innerTableHeaders'] =
                                    dataQuery.data?.innerTableHeaders;
                                  isInnerTableHeaderRequired
                                    ? showDetailsModalHanlder(innerTableData)
                                    : showDetailsModalHanlder(
                                        cell?.row?.original
                                      );
                                }
                              }}
                            >
                              {flexRender(
                                cell?.column?.columnDef?.cell,
                                cell?.getContext()
                              )}
                            </Styled.Link>
                          ) : cell.column.id === 'name1' ? (
                            <Styled.PersonCardContainer>
                              <PersonCard email={innerTableData?.email} />
                              {flexRender(
                                cell?.column?.columnDef?.cell,
                                cell?.getContext()
                              )}
                            </Styled.PersonCardContainer>
                          ) : (
                            <>
                              {flexRender(
                                cell?.column?.columnDef?.cell,
                                cell?.getContext()
                              )}
                            </>
                          )}
                        </Styled.TextWrap>
                      );
                    })}
                  </tr>
                  {isExpanded === row.id && (
                    <tr>
                      <td></td>
                      <td colSpan={columns?.length}>
                        <InnerTable data={row} dataQuery={dataQuery} />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        )}
      </>
    );
  };

  //Render React table
  return (
    <QueryClientProvider client={queryClient}>
      <Styled.Container
        $isTableInModal={isTableRenderingInModal ? true : false}
      >
        {table && table?.getRowModel()?.rows?.length === 0 ? (
          <>{emptyResultsPanel}</>
        ) : (
          <table>
            {renderTableHeaders()}
            {renderTableBody()}
          </table>
        )}

        {dataQuery?.isLoading && (
          <table>
            <tbody>
              <Styled.Spinner>
                <Donut style={{ width: 30, height: 30 }} />
              </Styled.Spinner>
            </tbody>
          </table>
        )}
        {isPaginationRequired && (
          <Styled.PaginationContainer>
            <button
              style={{ opacity: !getCanPreviousPage() ? 0.5 : 1 }}
              onClick={() => setPageIndex(0)}
              disabled={!getCanPreviousPage()}
            >
              <PaginationFirst />
            </button>
            <button
              style={{ opacity: !getCanPreviousPage() ? 0.5 : 1 }}
              onClick={() => previousPage()}
              disabled={!getCanPreviousPage()}
            >
              <PaginationPrevious />
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
              <PaginationNext />
            </button>
            <button
              style={{ opacity: !getCanNextPage() ? 0.5 : 1 }}
              onClick={() => setPageIndex(getPageCount() - 1)}
              disabled={!getCanNextPage()}
            >
              <PaginationLast />
            </button>
            <Styled.Showing>
              <div>Showing</div>
              <div>
                {getState()?.pagination?.pageIndex + 1} of {getPageCount()}
              </div>
            </Styled.Showing>
            <Styled.RowsPerPage>Rows per page:</Styled.RowsPerPage>
            <select
              value={getState()?.pagination?.pageSize}
              onChange={(e) => {
                setPageSize(Number(e?.target?.value));
              }}
            >
              {rowsPerPage?.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </Styled.PaginationContainer>
        )}
      </Styled.Container>
    </QueryClientProvider>
  );
}
