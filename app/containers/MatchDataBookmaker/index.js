import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reactIcons } from '@/utils/icons';
const MatchDataBookmaker = () => {
  const [step, setStep] = useState(0);
  const [tournamentData, setTournamentData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [singleTournament, setSingleTournament] = useState({});
  const [singleId, setsingleId] = useState('');
  const [currentGame, setCurrentGame] = useState('');
  const navigate = useNavigate();

  async function getData(url) {
    const response = await fetch(url, {
      method: 'GET',
    });

    return response.json();
  }
  const API_URL = process.env.API_MATCH;

  const getCompition = async (game) => {
    try {
      const res = await getData(`${API_URL}/catalogue/${game}/competitions`);

      setTournamentData(res);
    } catch (error) {
      setTournamentData([]);
    }
  };

  const handleLinkClick = (game) => {
    setSingleTournament({});
    getCompition(game);
    setCurrentGame(game);
    setStep(1);
  };

  const handleLinkSub = async (item, game) => {
    console.log('item-id', item.competition.id);
    try {
      setSingleTournament(item);
      setStep(2);
      // https://staging-api.bigdaddybook.com/api
      const res = await getData(
        `${API_URL}/catalogue/${game}/events?competitionId=${item?.competition?.id}`,
      );
      setEventsData(res);
    } catch (error) {
      setEventsData([]);
    }
  };
  const navigationItems = [
    { icon: '/images/cricket.png', text: 'Cricket', route: 'cricket' },
    { icon: '/images/football.png', text: 'Football', route: 'soccer' },
  ];

  const backStep0 = () => {
    setStep(0);
    setTournamentData([]);
  };
  const backStep1 = () => {
    setStep(1);
    setEventsData([]);
  };

  return (
    <>
      <div className="flex flex-col 2xl:w-[311px] w-[250px] border xl:rounded-lg xl:sticky xl:top-10 overflow-y-auto theme-scroller xl:bg-none h-[calc(100vh-261px)] relative top-0 bg-[#482A4B]  text-white">
        {step === 0 && (
          <>
            {navigationItems.map((item, index) => (
              <>
                <button
                  key={index}
                  className={`h-[36px] flex-shrink-0 flex items-center justify-between px-4 hover:bg-gradient1
      }`}
                  onClick={() => handleLinkClick(item?.route)}
                >
                  <div className="flex gap-3 justify-center items-center">
                    <img
                      src={item.icon}
                      className="w-[20px] h-[20px] rounded-full"
                      alt={item.text.toLowerCase()}
                    />
                    <div className="flex items-center gap-3">
                      <span key={index}>{item.text}</span>
                    </div>
                  </div>
                  <span className="text-18 ml-left">
                    {' '}
                    {reactIcons.arrowright}
                  </span>
                </button>
              </>
            ))}
          </>
        )}
        {step === 1 && (
          <div className="relative h-full">
            <div className="h-[42px] absolute top-0 left-0 w-full flex-shrink-0 bg-primary-700  flex items-center gap-3 px-3 first-of-type:rounded-tl-lg first-of-type:rounded-tr-lg text-white">
              <button
                onClick={backStep0}
                className="text-black text-16 w-[30px] h-[30px] bg-white rounded-full flex-center"
              >
                {reactIcons.arrowleft}
                {/* {'<<'} */}
              </button>
              <span className="font-semibold text-white">Previous</span>
            </div>
            <div className="h-[calc(100%-42px)] relative top-[42px] overflow-y-auto theme-scroller">
              <div className="py-2 flex-shrink-0 bg-primary-100 flex items-center gap-3 px-3 mt-[2px]">
                <img
                  src={
                    currentGame === 'cricket'
                      ? '/images/cricket.png'
                      : '/images/football.png'
                  }
                  className="w-[20px] rounded-full"
                  alt=""
                />{' '}
                <span>
                  {currentGame.toUpperCase() === 'SOCCER'
                    ? 'FOOTBALL'
                    : currentGame.toUpperCase()}
                </span>
              </div>
              {tournamentData.map((item, index) => (
                <>
                  <button
                    key={index}
                    // to={`/football${item.path}`}
                    className={`h-[36px] flex-shrink-0 flex items-center justify-between px-4 hover:bg-gradient1 cursor-pointer ${
                      singleTournament?.competition?.id ===
                      item?.competition?.id
                        ? 'bg-[#040b1d]'
                        : ''
                    }`}
                    onClick={() => handleLinkSub(item, currentGame)}
                  >
                    <span className="text-12 leading-4 text-left">
                      {item?.competition?.name}
                    </span>
                    <span
                      className={`text-15 ml-left ${
                        singleTournament?.competition?.id ===
                        item?.competition?.id
                          ? 'rotate-90'
                          : ''
                      }`}
                    >
                      {reactIcons.arrowright}
                      {/* {'>>'} */}
                    </span>
                  </button>
                </>
              ))}{' '}
            </div>
          </div>
        )}
        {step === 2 && (
          <>
            <div className="h-[42px] flex-shrink-0 bg-primary-700 flex items-center gap-3 px-3 first-of-type:rounded-tl-lg first-of-type:rounded-tr-lg">
              <button
                onClick={backStep1}
                className="text-black text-16 w-[30px] h-[30px] bg-white rounded-full flex-center cursor-pointer"
              >
                {reactIcons.arrowleft}
                {/* {'<<'} */}
              </button>
              <span className="font-semibold text-white">Previous</span>
            </div>
            <div className="py-2 flex-shrink-0 bg-primary-100 flex items-center gap-3 px-3 mt-[2px]">
              <img
                src={
                  currentGame === 'cricket'
                    ? '/images/cricket.png'
                    : '/images/football.png'
                }
                className="w-[20px] rounded-full"
                alt={
                  currentGame === 'cricket'
                    ? '/images/cricket.png'
                    : '/images/football.png'
                }
              />{' '}
              <span className="leading-[18px]">
                {singleTournament?.competition?.name}
              </span>
            </div>
            {eventsData.length === 0 ? (
              <div className="flex justify-center text-12">No Match </div>
            ) : (
              <>
                {eventsData &&
                  eventsData.map((item, index) => (
                    <div
                      key={index}
                      className={`py-2 flex-shrink-0 flex items-center justify-between px-4 hover:bg-gradient1 cursor-pointer ${
                        singleId === item?.event?.id ? 'bg-[#040b1d]' : ''
                      }`}
                      onClick={() => {
                        setsingleId(item?.event?.id),
                          navigate(
                            '/',
                            // `bookmaker/single-bet/${currentGame.toLowerCase()}/${
                            //   item?.event?.id
                            // }`,
                            {
                              state: { data: item?.event },
                            },
                          );
                      }}
                    >
                      <span className="text-12 leading-4 pl-2">
                        {item?.event?.name}
                      </span>
                      <span className="text-18 ml-left">
                        {reactIcons.arrowright}
                      </span>
                    </div>
                  ))}{' '}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MatchDataBookmaker;
