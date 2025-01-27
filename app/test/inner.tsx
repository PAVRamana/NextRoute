/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import * as Styled from './dataGrid.styles';

type InnerTableProps = {
  data: any;
  dataQuery: any;
};

const InnerTable = ({ data, dataQuery }: InnerTableProps) => {
  const getInnerHeaders = () => {
    return dataQuery.data?.innerHeaders?.map((item) => {
      return {
        accessorKey: item.accessor,
        id: item.accessor,
        header: () => (
          <Styled.HeaderColumn>
            <div>{item.Header}</div>
          </Styled.HeaderColumn>
        ),
      };
    });
  };

  const innerTable = useReactTable({
    data: data.original.items ?? [],
    rowCount: 100,
    columns: getInnerHeaders() ?? [],
    debugAll: false,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  return (
    <Styled.InnerTableContainer>
      <table>
        <thead>
          {innerTable &&
            innerTable?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup?.id}>
                {headerGroup &&
                  headerGroup?.headers &&
                  headerGroup?.headers?.map((header) => {
                    return (
                      <th key={header?.id} colSpan={header?.colSpan}>
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
        <tbody>
          {innerTable &&
            innerTable?.getRowModel()?.rows?.map((row) => {
              return (
                <>
                  <tr key={row?.id}>
                    {row?.getVisibleCells()?.map((cell) => {
                      return (
                        <td key={cell?.id}>
                          {flexRender(
                            cell?.column?.columnDef?.cell,
                            cell?.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </Styled.InnerTableContainer>
  );
};

export default InnerTable;
