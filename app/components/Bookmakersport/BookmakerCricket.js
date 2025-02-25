import Searchbar from '@/components/Searchbar/Searchbar';
import { TextContext } from '@/contexts/SearchContext';
import { getData } from '@/helpers/request';
import {
  Button,
  Card,
  NativeSelect,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { replace } from 'lodash';
import numeral from 'numeral';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookmakerCricket = () => {
  const [pageBookmaker, setBookmaker] = useState(0);
  const [rowsperPageBookmaker, setRowsperpageBookmaker] = useState(5);
  const [statusValue, setStatusValue] = useState('');
  console.log('statusValue', statusValue);
  const [isLoading, setIsLoading] = useState(false);

  const { eventId } = useParams();
  const { search } = useContext(TextContext);

  console.log('search-cricket', search);
  console.log('id', eventId);
  const [singleEventData, setsingleEventData] = useState([]);

  const headLabel = [
    { id: 'eventId', label: 'Event ID', alignRight: false },
    { id: 'eventname', label: 'Event Name', alignRight: false },
    { id: 'runnername', label: 'Runner Name', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    // { id: 'result', label: 'Result', alignRight: false },
    // { id: 'timeline', label: 'Timeline', alignRight: false },
    { id: '' },
  ];
  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  const API_URL = process.env.API_KEY;
  const handleChangeBookmaker = (event, newPage) => {
    setBookmaker(newPage);
  };

  const handleChangeRowsBookmaker = (event) => {
    setRowsperpageBookmaker(parseInt(event.target.value, 10));
    // setBookmaker(0);
  };
  let counts = singleEventData.length;
  const emptyRowsBookmaker =
    pageBookmaker > 0
      ? Math.max(
          0,
          (1 + pageBookmaker) * rowsperPageBookmaker - singleEventData.length,
        )
      : 0;
  const handleChange = (event, _id) => {
    const { value } = event.target;
    setStatusValue((prevState) => ({
      ...prevState,
      [_id]: value,
    }));
  };

  const fetchCricketEvents = () => {
    getData(`${API_URL}/cricket/get-bookmaker-unresolve?eventId=${eventId}`)
      .then((data) => {
        // console.log('apidata', data);
        setsingleEventData(data.bookmaker);
        console.log('data-all', data.bookmaker.length);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resolveBookmakerRTesults = (_id) => {
    setIsLoading(true);
    const currentStatus = statusValue[_id];
    console.log('currentStatus', currentStatus);
    if (currentStatus) {
      postData(`${API_URL}/cricket/resolve-bookmaker`, {
        _id,
        status: currentStatus,
      })
        .then((data) => {
          if (data.error) {
            toast.error(data.message || 'Something went wrong');
          } else {
            toast.success(data.message);
            fetchCricketEvents();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      toast.error('Please fill result properly');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCricketEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, eventId]);
  function fShortenNumber(number) {
    return replace(numeral(number).format('0.00a'), '.00', '');
  }
  return (
    <>
      <div className="w-full overflow-y-auto">
        <div className="w-full grid grid-cols-2 ">
          <div className="w-40 h-28 rounded-md bg-[#10827D]  flex justify-center  items-center font-bold text-center my-8 mx-8">
            <div>
              <h4 className="text-3xl text-white ">{fShortenNumber(counts)}</h4>
              <h4 className="text-sm text-white ">Pending Results</h4>
            </div>
          </div>
          <div className=" mt-8">
            <Searchbar />
          </div>
        </div>
        <Card>
          <TableContainer sx={{ minWidth: 800 }} style={{ padding: 10 }}>
            <Table>
              <TableHead>
                <TableRow className="bg-[#230526]  ">
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

              <TableBody>
                {singleEventData.map((row) => {
                  const { _id, eventId, eventName, runnerName } = row;

                  return (
                    <TableRow hover key={_id} tabIndex={-1}>
                      <TableCell align="left">{eventId}</TableCell>
                      <TableCell align="left">{eventName}</TableCell>
                      <TableCell align="left">{runnerName}</TableCell>

                      <TableCell align="left">
                        <NativeSelect
                          id={`status-select-${_id}`}
                          value={statusValue[_id] || ''}
                          style={{ width: '200px' }}
                          onChange={(event) => handleChange(event, _id)}
                        >
                          <option aria-label="None" value="" disabled>
                            Choose option
                          </option>
                          <option value={'WINNER'}>Winner</option>
                          <option value={'LOSER'}>Looser</option>
                        </NativeSelect>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          color="success"
                          variant="contained"
                          disabled={isLoading}
                          onClick={() => resolveBookmakerRTesults(_id)}
                        >
                          <span className="text-white font-bold text-xs">
                            Save
                          </span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRowsBookmaker > 0 && (
                  <TableRow style={{ height: 53 * emptyRowsBookmaker }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={singleEventData.length}
            rowsPerPage={rowsperPageBookmaker}
            page={pageBookmaker}
            onPageChange={handleChangeBookmaker}
            onRowsPerPageChange={handleChangeRowsBookmaker}
          />
        </Card>
      </div>
    </>
  );
};

export default BookmakerCricket;
// disabled={isLoading}
// onClick={() => resolveBookmakerRTesults(_id)}
