import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as Styled from './dataTable.styles';

type DataTableTypes = {
  data: any;
  width?: any;
  align?: any;
  border?: boolean;
};

export default function DataTable({
  data,
  width,
  align = 'left',
  border = false,
}: DataTableTypes) {
  return (
    <Styled.Conatiner $showBorder={border}>
      <Paper sx={{ width: width ? width : '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {data &&
                  data?.headers &&
                  Object.values(data?.headers)?.map(
                    (item: any, index: number) => (
                      <TableCell
                        align={align}
                        key={index}
                        style={{ minWidth: 150 }}
                      >
                        {item}
                      </TableCell>
                    )
                  )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data?.objects &&
                data?.headers &&
                data?.objects?.map((row: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {data?.headers?.map((headerKey: any, index: number) => (
                      <TableCell align={align} key={index}>
                        {row[headerKey]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Styled.Conatiner>
  );
}
