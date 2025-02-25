/* eslint-disable react-hooks/exhaustive-deps */
import { getData } from '@/helpers/request';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { replace } from 'lodash';
import numeral from 'numeral';
import { Tooltip } from '@mui/material';
import BetResult from '@/components/Modal/BetResult';
const Main = () => {
  const [searchText, setSearchText] = useState('');
  const [sesseionData, setSesseionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [count, setCount] = useState();
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [totalRows, setTotalRows] = useState(0);
  const [singleRowData, setSingleRowData] = useState({});
  const API_URL = process.env.API_MATCH;
  const customStyles = {
    table: {
      style: {
        backgroundColor: '#28052B',
      },
    },
    headCells: {
      style: {
        backgroundColor: '#28052B',
        color: 'white',
        fontSize: '14px',
      },
    },
    rows: {
      style: {
        backgroundColor: '#28052B',
        color: 'white',
        fontSize: '14px',
        height: '60px',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#28052B',
        color: 'white',
      },
    },

    subHeader: {
      style: {
        backgroundColor: '#28052B',
        color: 'white',
      },
    },
  };

  const fetchSessions = async () => {
    const trimmedSearchText = searchText.trim().toLowerCase();
    await getData(
      `${API_URL}/user/session-unresolve-bets?search=${encodeURIComponent(
        trimmedSearchText,
      )}&offset=${(page - 1) * rowsPerPage}&limit=${rowsPerPage}`,
    )
      .then((data) => {
        setTotalRows(data?.totalCount || 0);
        setCount(data?.totalCount);
        setSesseionData(data?.data || []);
        setFilteredData(data?.data || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    {
      name: 'Event ID',
      selector: (row) => row.matchId,
      width: '100px',
    },
    {
      name: 'Session',
      selector: (row) => row.selectionName,
      width: '300px',
    },
    {
      name: 'Events',
      selector: (row) => row.event,
      width: '200px',
      cell: (row) => (
        <div data-tip={row.event}>
          <Tooltip title={row.event} enterTouchDelay={0}>
            {row.event}
          </Tooltip>
        </div>
      ),
    },
    {
      name: 'Result',
      width: '150px',
      selector: (row) => (
        <button
          className="px-4 py-2 rounded-md text-gray-50 bg-green-600"
          onClick={() => {
            setIsModalOpen(true);
            setSingleRowData(row);
          }}
        >
          Result
        </button>
      ),
    },
    {
      name: 'Game Type',
      selector: (row) => (row.market === 'session' ? 'Fancy' : row.market),
    },
  ];

  useEffect(() => {
    fetchSessions();
  }, [IsModalOpen]);

  useEffect(() => {
    const trimmedSearchText = searchText.trim().toLowerCase();
    const result = sesseionData?.filter((item) =>
      item?.selectionName.toLowerCase().includes(trimmedSearchText),
    );
    setFilteredData(result);
  }, [searchText]);
  function fShortenNumber(number) {
    return replace(numeral(number).format('0.00a'), '.00', '');
  }

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  useEffect(() => {
    fetchSessions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page, rowsPerPage]);
  useEffect(() => {
    const intervalId = setInterval(fetchSessions, 10000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page, rowsPerPage]);
  return (
    <div className="w-full overflow-y-auto mx-5">
      <div className="flex">
        <div className="w-44 h-28 rounded-md bg-[#10827D]  flex justify-center  items-center font-bold text-center my-4 ">
          <div>
            <h4 className="text-3xl text-white ">{fShortenNumber(count)}</h4>
            <h4 className="text-sm text-white ">
              Sessions and Fancy Match Pending Results
            </h4>
          </div>
        </div>
      </div>
      <div className="bg-[#28052B]">
        <DataTable
          columns={columns}
          data={filteredData}
          customStyles={customStyles}
          pagination
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          paginationRowsPerPageOptions={[10, 15, 20]}
          paginationDefaultPage={page}
          paginationPerPage={rowsPerPage}
          fixedHeader
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search Here ..."
              className="py-2 px-3 text-14 text-white border w-[350px] my-2 border-gray-500 bg-[#3B0840]"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          }
        />
      </div>
      <BetResult
        IsModalOpen={IsModalOpen}
        setIsModalOpen={setIsModalOpen}
        singleRowData={singleRowData}
      />
    </div>
  );
};

export default Main;
