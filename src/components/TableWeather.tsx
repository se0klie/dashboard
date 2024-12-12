import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Item from '../interface/Item'
import { useEffect, useState } from 'react';

interface Data {
  itemsIn : Item[];
}

export default function BasicTable(data: Data) {
  let [rows, setRows] = useState<Item[]>([]);

  useEffect(()=> {
    setRows(data.itemsIn)
  },[data])
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Precipitation probability</TableCell>
            <TableCell align="right">Humidity</TableCell>
            <TableCell align="right">Clouds</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,idx) => (
            <TableRow
              key={idx}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.dateStart}
              </TableCell>
              <TableCell align="right">{row.dateEnd}</TableCell>
              <TableCell align="right">{row.precipitation}</TableCell>
              <TableCell align="right">{row.humidity}</TableCell>
              <TableCell align="right">{row.clouds}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}