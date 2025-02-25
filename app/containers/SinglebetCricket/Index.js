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
  TextField,
} from '@mui/material';
import { replace } from 'lodash';
import numeral from 'numeral';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SingleBetCricket = () => {
  const { eventId } = useParams();
  const { search } = useContext(TextContext);

  console.log('search-cricket', search);
  console.log('id', eventId);
  const [singleEventData, setsingleEventData] = useState({
    sessions: [],
    counts: {},
  });
  const [page, setPage] = useState(0);

  const [sessionResult, setSessionResult] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [statusValue, setStatusValue] = useState('');
  const SessionsData = singleEventData.sessions.filter(
    // eslint-disable-next-line prettier/prettier
    (item) => item.gameType == 'fancy1',
  );
  console.log('singleEventData', singleEventData.sessions);
  console.log('SessionsData', SessionsData);
  let counts = singleEventData.counts.total;
  const headLabel = [
    { id: 'eventId', label: 'Event ID', alignRight: false },
    { id: 'session', label: 'Session', alignRight: false },
    { id: 'error', label: 'Error', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'result', label: 'Result', alignRight: false },
    { id: 'gametype', label: 'Game Type', alignRight: false },
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
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChange = (event, _id) => {
    const { value } = event.target;
    setStatusValue((prevState) => ({
      ...prevState,
      [_id]: value,
    }));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - singleEventData.counts.total)
      : 0;
  const updateSession = (_id) => {
    console.log('working in sessions');
    setIsLoading(true);
    if (sessionResult[_id] && /^-?\d+$/.test(sessionResult[_id])) {
      postData(`${API_URL}/cricket/resolve-session`, {
        _id,
        result: String(sessionResult[_id]),
      })
        .then((data) => {
          if (data.error) {
            // toast.success('User Successfully');
            toast.error(data.message || 'Something went wrong');
          } else {
            toast.success(data.message);
            fetchCricketEvents();
            console.log('data.message', data.message);
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
  const API_URL = process.env.API_KEY;

  const fetchCricketEvents = () => {
    getData(
      `${API_URL}/cricket/get-unresolved-eventid?eventId=${eventId}&search=${search}&offset=${
        page * rowsPerPage
      }&limit=${rowsPerPage}`,
    )
      .then((data) => {
        if (data.sessions instanceof Array && data.counts instanceof Array) {
          const counts = { total: 0 };
          data.counts.forEach((element) => {
            counts.total += element.count;
            // counts[SESSION_STATUS[element._id]] = element.count;
          });
          setsingleEventData({ ...data, counts });
          console.log('data-all', { ...data, counts });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resolveBookmakerRTesults = (_id) => {
    console.log('working in fancy');
    setIsLoading(true);
    const currentStatus = statusValue[_id];
    console.log('currentStatus', currentStatus);
    if (currentStatus) {
      postData(`${API_URL}/cricket/resolve-fancy`, {
        _id,
        result: currentStatus,
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
  }, [search, page, rowsPerPage, eventId]);

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
                {singleEventData.sessions.map((row) => {
                  const { _id, eventId, session, error, gameType } = row;

                  return (
                    <TableRow hover key={_id} tabIndex={-1}>
                      <TableCell align="left">{eventId}</TableCell>
                      <TableCell align="left">{session}</TableCell>
                      <TableCell align="left">
                        {error && error.length ? error : 'N/A'}
                      </TableCell>
                      <TableCell align="left">
                        <div className="bg-red-200 p-1 rounded-md text-center">
                          <h6 className=" text-xs font-bold text-red-700 ">
                            {' '}
                            Not handled{' '}
                          </h6>
                        </div>
                      </TableCell>
                      {gameType === 'session' ? (
                        <TableCell align="left">
                          <TextField
                            id="outlined-basic"
                            label="Result"
                            variant="outlined"
                            type="number"
                            onChange={(e) =>
                              setSessionResult({
                                ...sessionResult,
                                [_id]: e.target.value,
                              })
                            }
                          />
                        </TableCell>
                      ) : (
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
                      )}
                      <TableCell align="left">{gameType}</TableCell>
                      {/* <TableCell align="left">
                        <a
                          href={`http://marketsarket.in:3002/scoreurl/${eventId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-500"
                        >
                          Timeline
                        </a>
                      </TableCell> */}
                      {gameType === 'session' ? (
                        <TableCell align="right">
                          <Button
                            color="success"
                            variant="contained"
                            disabled={isLoading}
                            onClick={() => updateSession(_id)}
                          >
                            <span className="text-white font-bold text-xs">
                              Save
                            </span>
                          </Button>
                        </TableCell>
                      ) : (
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
                      )}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {counts == 0 ? (
            <div className="flex justify-center">No pending results</div>
          ) : (
            ''
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={singleEventData.counts.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </div>
    </>
  );
};

export default SingleBetCricket;
/* 


   <TableBody>
            {data.sessions.map((row) => {
              const { _id, eventId, session, status, error } = row;

              return (
                <TableRow hover key={_id} tabIndex={-1}>
                   <TableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      onChange={(event) => handleClick(event, name)}
                    />
                  </TableCell> 
                  <TableCell align="left">{eventId}</TableCell>
                  <TableCell align="left">{session}</TableCell>
                  <TableCell align="left">
                    {error && error.length ? error : 'N/A'}
                  </TableCell>
                  <TableCell align="left">
                    {/* <Label variant="ghost" color="error">
                    {sentenceCase(SESSION_STATUS[status])}
                  </Label> 
                  </TableCell>
                  <TableCell align="left">
                    <TextField
                      id="outlined-basic"
                      label="Result"
                      variant="outlined"
                      type="number"
                      onChange={(e) =>
                        setSessionResult({
                          ...sessionResult,
                          [_id]: e.target.value,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell align="left">
                    <a
                      href={`http://marketsarket.in:3002/scoreurl/${eventId}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Timeline
                    </a>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      disabled={isLoading}
                      onClick={() => updateSession(_id)}
                      className="bg-red-400"
                    >
                      Save
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

?search=${encodeURIComponent(
  `.*${search}.*`,
)}&offset=${page * rowsPerPage}&limit=${rowsPerPage}

<TablePagination
rowsPerPageOptions={[5, 10, 25]}
component="div"
count={data.counts.total}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/> */
