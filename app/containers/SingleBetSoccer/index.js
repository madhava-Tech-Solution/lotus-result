import React from 'react';
import {
  Card,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Searchbar from '@/components/Searchbar/Searchbar';
const SingleBetSoccer = () => {
  const headLabel = [
    { id: 'eventId', label: 'Event ID', alignRight: false },
    { id: 'session', label: 'Session', alignRight: false },
    { id: 'error', label: 'Error', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'result', label: 'Result', alignRight: false },
    { id: 'timeline', label: 'Timeline', alignRight: false },
    { id: '' },
  ];

  return (
    <div className="w-full ">
      <div className="flex justify-end ">
        <div className="w-1/2 my-4 h-10 ">
          <Searchbar />
        </div>
      </div>
      <Card>
        <TableContainer sx={{ minWidth: 800 }} style={{ padding: 10 }}>
          <Table>
            <TableHead>
              <TableRow className="bg-[#230526]   ">
                {headLabel.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.alignRight ? 'right' : 'left'}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default SingleBetSoccer;
