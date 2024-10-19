import '../index.css'

import useGoogleSheets from 'use-google-sheets';
import { processData } from '../funcs/processData';
import { useEffect, useState } from 'react';

import { Title } from '../components/Title';
import { DataTable } from '../components/DataTable/DataTable';

const API_KEY = 'AIzaSyAlLoHAWIMDgi0Kj572ZGdwRGqGf9aPkPc'
const SHEET_ID = '1BpUeQsOB3j8pVu096EWk9WALSsGghbps0wJTOo67JYk'
const SHEET_PAGE_NAME = 'main'


function MainPage() {
  const [leaderboard, setLeaderboard] = useState<any[] | null>(null)
  const [history, setHistory] = useState<any[] | null>(null)

  const leaderboardHeaders = ['Total Rank', 'Player', 'Total +/-', '# of Games', 'Last Active']
  const historyHeaders = ['Daily Rank', 'Player', 'Buy-In', '# of Buy-Ins', 'Daily +/-', 'Date']


  // Fetch data from Google Sheets
  const { data, loading, error } = useGoogleSheets({
    apiKey: API_KEY,
    sheetId: SHEET_ID,
    sheetsOptions: [{ id: SHEET_PAGE_NAME }],
  });
  if (loading) {
    console.log('loading');
  }
  else if (error) {
    console.log('error');
  }

  useEffect(() => {
    if (!(loading || error) && data) {
        const { leaderboard, history } = processData(data);
        setLeaderboard(leaderboard);
        setHistory(history);
    }
  }, [data, loading, error]);
  
  return (
    <div className="App">
      <div className="h-screen bg-cover relative">
        <Title/>
        {leaderboard && history &&
           <>
            <DataTable title='LEADERBOARD' tableHeaders={leaderboardHeaders} tableBody={leaderboard} blurIndex={2}/>
            <DataTable title='MATCH HISTORY' tableHeaders={historyHeaders} tableBody={history} isFilterByName={true}/>
           </>
        }
      </div>
    </div>
  );
}

export default MainPage