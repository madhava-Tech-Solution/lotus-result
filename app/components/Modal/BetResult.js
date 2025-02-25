import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import { PropTypes } from 'prop-types';
import { getData, postData } from '@/helpers/request';
import { toast } from 'react-toastify';

const BetResult = ({ IsModalOpen, setIsModalOpen, singleRowData }) => {
  const [eventData, seteventData] = useState({});
  const [selections, setSelections] = useState([]);
  const [sessionSelection, setSessionSelection] = useState({});
  const [error, setError] = useState('');
  const API_URL = process.env.API_MATCH;
  const handleSelectionChange = (selectionId, runnerName, status) => {
    setSelections((prevSelections) => {
      const updatedSelections = prevSelections.map(
        (sel) =>
          sel.selectionId === selectionId
            ? { ...sel, status } // Update the status for the selected runner
            : sel, // Keep other runners unchanged
      );
      if (
        !updatedSelections.find((sel) => sel.selectionId === selectionId) &&
        status
      ) {
        updatedSelections.push({ selectionId, runnerName, status });
      }
      const hasMultipleWinners =
        updatedSelections.filter((sel) => sel.status === 'WINNER').length > 1;
      const loserCount = updatedSelections.filter(
        (sel) => sel.status === 'LOOSER',
      ).length;
      const totalRunners = eventData.runners.length;
      if (hasMultipleWinners) {
        setError('Only one WINNER can be selected.');
        return prevSelections;
      }
      if (loserCount === totalRunners) {
        setError('Not all runners can be LOOSERS.');
        return prevSelections;
      }

      setError('');
      return updatedSelections;
    });
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (singleRowData?.matchId && singleRowData?.market != 'session') {
      handleGetEvents();
    }
    //eslint-disable-next-line
  }, [singleRowData?.matchId, singleRowData?.market]);

  const handleGetEvents = async () => {
    const params = new URLSearchParams();
    params.append('marketName', singleRowData?.market);
    params.append('eventId', singleRowData?.matchId);
    await getData(
      `${API_URL}/catalogue/cricket/get-matchodds?${params.toString()}`,
    )
      .then((data) => {
        seteventData(data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSessionMarket = async () => {
    if (
      sessionSelection.result === null ||
      sessionSelection.result === undefined ||
      sessionSelection.result === ''
    ) {
      setError('Please enter a result for the session market.');
      return;
    }
    const payLoad = {
      gameId: singleRowData?.game_id,
      eventId: singleRowData?.matchId,
      marketId: singleRowData?.market_id,
      market: singleRowData?.market,
      gameType: singleRowData?.market,
      selections: [sessionSelection],
    };
    await postData(`${API_URL}/bet/settle`, payLoad)
      .then((data) => {
        if (data.error) {
          toast.error(data.message || 'Something went wrong');
        } else {
          toast.success(data.message || 'Something went wrong');
          setIsModalOpen(false);
          setSelections([]);
          setSessionSelection({
            result: '',
            runnerName: '',
            selectionId: '',
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOtherMarket = async () => {
    if (selections.length !== eventData.runners.length) {
      setError('Please select an option for all runners.');
      return;
    }
    const payLoad = {
      gameId: singleRowData?.game_id,
      eventId: singleRowData?.matchId,
      marketId: singleRowData?.market_id,
      market: singleRowData?.market,
      gameType: singleRowData?.market,
      selections: selections,
    };
    await postData(`${API_URL}/bet/settle`, payLoad)
      .then((data) => {
        console.log('data', data);
        if (data.error) {
          toast.error(data.message || 'Something went wrong');
        } else {
          toast.success(data.message || 'Something went wrong');
          setIsModalOpen(false);
          setSessionSelection({
            result: '',
            runnerName: '',
            selectionId: '',
          });
          setSelections([]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseFun = () => {
    setIsModalOpen(false); // Close the modal
    setError(''); // Clear any error message
    setSessionSelection({
      result: '',
      runnerName: '',
      selectionId: '',
    });
    setSelections([]);
    handleClose();
  };
  return (
    <div>
      <div
        className={
          IsModalOpen
            ? 'fixed inset-0 bg-gray-500 z-10 bg-opacity-75 overflow-y-auto px-4 py-6 sm:px-0'
            : 'hidden'
        }
      >
        <div className="w-full bg-[#28052B] max-w-md mx-auto p-6 bg-primary-model rounded-sm shadow-lg relative">
          <button
            className="absolute top-[-15px] right-[-15px] text-black text-xl hover:text-gray-400 p-2 bg-slate-50 rounded-full"
            onClick={handleCloseFun}
          >
            <RxCross2 className="" />
          </button>
          <div className="w-full max-w-md bg-primary-model p-6 relative text-sm">
            {singleRowData?.market != 'session' && (
              <span className="text-white text-18">
                Event: {eventData?.name}
              </span>
            )}
            {singleRowData?.market == 'session' ? (
              <div className="p-4 border border-white mt-5 rounded">
                <h4 className="text-white text-lg font-semibold mb-1">
                  {singleRowData?.selectionName}
                </h4>
                <input
                  type="number"
                  value={sessionSelection?.result ?? ''}
                  className="py-3 px-3 text-14 text-black border w-full"
                  placeholder="Result"
                  onChange={(e) =>
                    setSessionSelection({
                      result: Number(e.target.value),
                      runnerName: singleRowData?.selectionName,
                      selectionId: String(singleRowData.selectionId),
                    })
                  }
                />
                {error && <div className="text-16 text-red-500">{error}</div>}
              </div>
            ) : (
              <div className="p-4 border border-white mt-5 rounded">
                {eventData &&
                  eventData?.runners?.map((item, index) => {
                    return (
                      <div key={index} className="mb-3">
                        <h4 className="text-white text-lg font-semibold mb-1">
                          {item?.runnerName}
                        </h4>
                        <select
                          value={
                            selections.find(
                              (s) => s.selectionId === String(item.selectionId),
                            )?.status || ''
                          }
                          onChange={(e) => {
                            handleSelectionChange(
                              String(item.selectionId),
                              item.runnerName,
                              e.target.value,
                            ),
                              setError('');
                          }}
                          className="py-3 px-6 text-14 text-black border w-full"
                        >
                          <option aria-label="None" value="">
                            Choose option
                          </option>
                          <option value={'WINNER'}>Winner</option>
                          <option value={'LOOSER'}>Looser</option>
                          <option value={'REMOVED'}>Removed</option>
                        </select>
                      </div>
                    );
                  })}
                {error && <div className="text-16 text-red-500">{error}</div>}
              </div>
            )}

            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-green-600 text-white  hover:bg-green-500 "
                onClick={
                  singleRowData?.market == 'session'
                    ? handleSessionMarket
                    : handleOtherMarket
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
BetResult.propTypes = {
  IsModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  singleRowData: PropTypes.obj,
};
export default BetResult;
