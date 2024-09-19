/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-optional-chaining */

import { useQuery } from '@tanstack/react-query';
import {
  getCoreRowModel,
  PaginationState,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { Card, Checkbox, DialogContent, Donut } from '@wayfarer/components';
import {
  PaginationFirst,
  PaginationPrevious,
  PaginationNext,
  PaginationLast,
  PersonCard
} from 'exp-ui-web-components-mfe';
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from 'react';
import { ELLIPSIS, useReactTablePaginationRange } from './pagination';
import * as Styled from './userDataTable.styles';
import api from 'packages/common/service/axios';
import renderRiskIcon from 'packages/util/accessUtil';

const intialPagingData = {
  pageIndex: 0,
  pageSize: 25
};

const rowsPerPage = [25, 50, 100];
const defaultColumnSizeData = {
  size: 150,
  minSize: 20,
  maxSize: 200
};

type UserDataTableTypes = {
  apiUrl: string;
  saveSelectedRowsData: (data: any, checked: boolean) => void;
  getDataGridPayload?: () => any;
  applyFilterOnTable?: boolean;
  emptyResultsPanel: ReactNode;
  resetExecuteFilterFlag?: () => void;
  isUserAdded: (item) => boolean;
};

export default function UserDataTable({
  apiUrl,
  isUserAdded,
  saveSelectedRowsData,
  getDataGridPayload,
  emptyResultsPanel,
  applyFilterOnTable,
  resetExecuteFilterFlag
}: UserDataTableTypes) {
  const [pagination, setPagination] = useState<PaginationState>(intialPagingData);
  const defaultData = useMemo(() => [], []);

  //Defining useQuery to fetch table data
  const dataQuery = useQuery({
    queryKey: ['data', pagination],
    queryFn: () => fetchGridData(pagination)
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

  //Fetch Grid data based on payload
  const fetchGridData = async (options: { pageIndex: number; pageSize: number } | any) => {
    // await new Promise((r) => setTimeout(r, 5000));
    let payload = {};

    //Set Pagination payload when isPaginationRequired is true
    payload = {
      ...payload,
      paging: {
        limit: options?.pageSize,
        start: options?.pageIndex * options?.pageSize
      }
    };

    //Fetch custom payload via callback
    if (getDataGridPayload) {
      payload = { ...payload, ...getDataGridPayload() };
    }

    const response = await api.post(apiUrl, payload).then((res) => res?.data);

    return {
      rows: response.objects,
      headers: response.headers,
      rowCount: response.count
    };
  };

  //Default table properties
  let tableProps: any = {
    data: dataQuery.data?.rows ?? defaultData,
    rowCount: dataQuery.data?.rowCount,
    columns: defaultData,
    debugAll: false,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    defaultColumn: defaultColumnSizeData
  };

  //Pagination table properties
  tableProps = {
    ...tableProps,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true
  };
  tableProps.state = {
    pagination
  };

  const table = useReactTable(tableProps);

  const {
    getCanPreviousPage,
    previousPage,
    nextPage,
    getCanNextPage,
    setPageIndex,
    getPageCount,
    getState,
    setPageSize
  } = table;

  //For page number caculation based on table data count
  const paginationRange = useReactTablePaginationRange(table);

  //Render Table Body
  const renderTableBody = () => {
    return (
      <Styled.RoootContainer>
        {table &&
          table?.getRowModel()?.rows?.map((row: any, index) => {
            const item: any = row?.original;
            return (
              <>
                <Styled.CardContainer key={index}>
                  <Card>
                    <DialogContent title={''} dividers={false} padding="standard">
                      <Checkbox
                        onChange={({
                          currentTarget: { checked }
                        }: ChangeEvent<HTMLInputElement>) => {
                          saveSelectedRowsData(item, checked);
                        }}
                        checked={isUserAdded(item)}
                      />
                      <Styled.UserWrapper>
                        <PersonCard email={item?.email as string} />
                        <Styled.InnterContainer>
                          {dataQuery.data?.headers?.map((header: string) => {
                            const value = item[header];
                            return header === 'displayName' ? (
                              <Styled.TextBoldComponent appearance="auto" variant="boldLarge">
                                <span title={value}>{value}</span>
                              </Styled.TextBoldComponent>
                            ) : header === 'extended1' ? (
                              <Styled.RiskComponent>
                                <span>Risk Score:</span>
                                <div>{renderRiskIcon(value)}</div>
                              </Styled.RiskComponent>
                            ) : (
                              <Styled.TextComponent appearance="auto" variant="boldLarge">
                                <span title={value}>{value}</span>
                              </Styled.TextComponent>
                            );
                          })}
                        </Styled.InnterContainer>
                      </Styled.UserWrapper>
                    </DialogContent>
                  </Card>
                </Styled.CardContainer>
              </>
            );
          })}
      </Styled.RoootContainer>
    );
  };

  return (
    <div style={{ width: '100%' }}>
      {table && table?.getRowModel()?.rows?.length === 0 ? (
        <>{emptyResultsPanel}</>
      ) : (
        <>{renderTableBody()}</>
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
                    $isSelected={table.getState().pagination.pageIndex + 1 === page}
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
    </div>
  );
}
