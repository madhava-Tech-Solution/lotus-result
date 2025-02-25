import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TextField,
  TableHead,
  NativeSelect,
} from '@mui/material';
import { replace } from 'lodash';
import numeral from 'numeral';
import { TextContext } from '@/contexts/SearchContext';
import Searchbar from '@/components/Searchbar/Searchbar';
import { toast } from 'react-toastify';
import { ToggleTableContext } from '@/contexts/TogleContext';

const Dashboard = () => {
  const [page, setPage] = useState(0);

  const [sessionResult, setSessionResult] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ sessions: [], counts: {} });
  //constext search
  const { search } = useContext(TextContext);
  const { setToggleTableClick } = useContext(ToggleTableContext);
  // console.log('tooggleTableClick', tooggleTableClick);
  let counts = data.counts.total;

  async function getData(url) {
    const response = await fetch(url, {
      method: 'GET',
    });

    return response.json();
  }

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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const updateSession = (_id) => {
    setIsLoading(true);
    if (sessionResult[_id] && /^-?\d+$/.test(sessionResult[_id])) {
      postData(`${API_URL}/cricket/resolve-session`, {
        _id,
        result: Number(sessionResult[_id]),
      })
        .then((data) => {
          if (data.error) {
            // toast.success('User Successfully');
            toast.error(data.message || 'Something went wrong');
          } else {
            toast.success(data.message);
            fetchSessions();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      //   setNotifOpen(true);
      toast.error('Please fill result properly');
      //   setNotifMessage('Please fill result properly');
      //   setIsError(true);
    }
    setIsLoading(false);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.counts.total) : 0;

  // const API_URL = process.env.API_KEY;
  const API_URL = process.env.API_MATCH;
  // const API_URL = 'https://staging-api.shiv11.com/api/result';
  const fetchSessions = () => {
    getData(
      `${API_URL}/user/session-unresolve-bets?search=${search}&offset=${
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
          setData({ ...data, counts });
          console.log('data-', { ...data, counts });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page, rowsPerPage, setData]);

  function fShortenNumber(number) {
    return replace(numeral(number).format('0.00a'), '.00', '');
  }
  const headLabel = [
    { id: 'eventId', label: 'Event ID', alignRight: false },
    { id: 'session', label: 'Session', alignRight: false },
    { id: 'error', label: 'Error', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'result', label: 'Result', alignRight: false },
    { id: 'gametype', label: 'Game Type', alignRight: false },
    { id: '' },
  ];
  // <--------------------------------------------------------------------------------------------------------------------------->
  const [toggleTable, setToggleTable] = useState(1);
  const [statusValue, setStatusValue] = useState('');
  console.log('statusValue', statusValue);
  const [bookMakersData, setBookmakersData] = useState({
    bookmaker: [],
    counts: {},
  });

  const [pageBookmaker, setBookmaker] = useState(0);
  const [rowsperPageBookmaker, setRowsperpageBookmaker] = useState(5);
  // const [bookmakerResults, setBookmakerResult] = useState({});
  const headLabelSecond = [
    { id: 'eventId', label: 'Event ID', alignRight: false },
    { id: 'eventname', label: 'Event Name', alignRight: false },
    { id: 'runnername', label: 'Runner Name', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    // { id: 'result', label: 'Result', alignRight: false },
    // { id: 'timeline', label: 'Timeline', alignRight: false },
    { id: '' },
  ];

  const HandleClick = (id) => {
    setToggleTable(id);
    setToggleTableClick(id);
  };

  const handleChange = (event, _id) => {
    const { value } = event.target;
    setStatusValue((prevState) => ({
      ...prevState,
      [_id]: value,
    }));
  };

  const getBookmaketResults = () => {
    getData(
      `${API_URL}/result/cricket/get-all-bookmaker?search=${search}&offset=${
        pageBookmaker * rowsperPageBookmaker
      }&limit=${rowsperPageBookmaker}`,
    )
      .then((data) => {
        if (data.bookmaker instanceof Array && data.counts instanceof Array) {
          const counts = { total: 0 };
          data.counts.forEach((element) => {
            counts.total += element.count;
            // counts[SESSION_STATUS[element._id]] = element.count;
          });
          setBookmakersData({ ...data, counts });
          console.log('setBookmakersData data-', { ...data, counts });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  let Bookmakercounts = bookMakersData.counts.total;
  const handleChangeBookmaker = (event, newPage) => {
    setBookmaker(newPage);
  };

  const handleChangeRowsBookmaker = (event) => {
    setRowsperpageBookmaker(parseInt(event.target.value, 10));
    // setBookmaker(0);
  };
  const emptyRowsBookmaker =
    pageBookmaker > 0
      ? Math.max(
          0,
          (1 + pageBookmaker) * rowsperPageBookmaker -
            bookMakersData.counts.total,
        )
      : 0;

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
            getBookmaketResults();
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

  // <--------------------------------------------------------------------------------------------------------------------------->
  const [fancyStatus, setFancyStatus] = useState('');
  const handleChangeFancy = (event, _id) => {
    const { value } = event.target;
    setFancyStatus((prevState) => ({
      ...prevState,
      [_id]: value,
    }));
  };

  const resolveUpdateSessionsFAncy = (_id) => {
    setIsLoading(true);
    const currentStatus = fancyStatus[_id];
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
            fetchSessions();
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
    getBookmaketResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageBookmaker, rowsperPageBookmaker, setBookmakersData]);

  return (
    <div className=" w-full overflow-y-auto">
      <div className="w-full grid grid-cols-2 ">
        <div className="flex">
          <div
            className="w-40 h-28 rounded-md bg-[#10827D]  flex justify-center  items-center font-bold text-center my-8 mx-8"
            onClick={() => HandleClick(1)}
          >
            <div>
              <h4 className="text-3xl text-white ">{fShortenNumber(counts)}</h4>
              <h4 className="text-sm text-white ">
                Sessions and Fancy Pending Results
              </h4>
            </div>
          </div>
          <div
            className="w-40 h-28 rounded-md bg-[#10827D]  flex justify-center  items-center font-bold text-center my-8 mx-4"
            onClick={() => HandleClick(2)}
          >
            <div>
              <h4 className="text-3xl text-white ">
                {fShortenNumber(Bookmakercounts)}
              </h4>
              <h4 className="text-sm text-white ">Bookmaker Pending Results</h4>
            </div>
          </div>
        </div>

        <div className=" mt-8">
          <Searchbar />
        </div>
      </div>
      {toggleTable === 1 ? (
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
                {data.sessions.map((row) => {
                  const { _id, matchId, selectionName, error, gtype } = row;

                  return (
                    <TableRow hover key={_id} tabIndex={-1}>
                      <TableCell align="left">{matchId}</TableCell>
                      <TableCell align="left">{selectionName}</TableCell>
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
                      {gtype === 'session' ? (
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
                            value={fancyStatus[_id] || ''}
                            style={{ width: '200px' }}
                            onChange={(event) => handleChangeFancy(event, _id)}
                          >
                            <option aria-label="None" value="" disabled>
                              Choose option
                            </option>
                            <option value={'WINNER'}>Winner</option>
                            <option value={'LOSER'}>Looser</option>
                          </NativeSelect>
                        </TableCell>
                      )}
                      <TableCell>{gtype}</TableCell>
                      {gtype === 'session' ? (
                        <TableCell align="right">
                          <Button
                            color="success"
                            variant="contained"
                            disabled={isLoading}
                            onClick={() => updateSession(_id)}
                            // disabled={statusValue.trim() === ''}
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
                            onClick={() => resolveUpdateSessionsFAncy(_id)}
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
            count={data.counts.total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      ) : (
        <Card>
          <TableContainer sx={{ minWidth: 800 }} style={{ padding: 10 }}>
            <Table>
              <TableHead>
                <TableRow className="bg-[#230526]   ">
                  {headLabelSecond.map((headCell) => (
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
                {bookMakersData.bookmaker.map((row) => {
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
          {counts == 0 ? (
            <div className="flex justify-center">No pending results</div>
          ) : (
            ''
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={bookMakersData.counts.total}
            rowsPerPage={rowsperPageBookmaker}
            page={pageBookmaker}
            onPageChange={handleChangeBookmaker}
            onRowsPerPageChange={handleChangeRowsBookmaker}
          />
        </Card>
      )}
    </div>
  );
};
export default Dashboard;
// rowsPerPageOptions={[5, 10, 25]}
// component="div"
// count={data.counts.total}
// rowsPerPage={rowsPerPage}
// page={page}
// onPageChange={handleChangePage}
// onRowsPerPageChange={handleChangeRowsPerPage}
// value={sessionResult[row.selectionId] || ''}
