import '../index.css'

import useGoogleSheets from 'use-google-sheets';
import { processData } from '../funcs/processData';
import { useEffect, useState } from 'react';

import { Title } from '../components/Title';
import { DataTable } from '../components/DataTable/DataTable';

const API_KEY = 'AIzaSyAlLoHAWIMDgi0Kj572ZGdwRGqGf9aPkPc'
const SHEET_ID = '1BpUeQsOB3j8pVu096EWk9WALSsGghbps0wJTOo67JYk'


function MainPage() {
  const [leaderboard, setLeaderboard] = useState<any[] | null>(null)
  const [history, setHistory] = useState<any[] | null>(null)

  const leaderboardHeaders = ['Player', 'Total +/-', 'Last Active', 'Total Rank']
  const historyHeaders = ['Date', 'Player', 'Buy-In', 'Money-In', 'Money-Out', 'Daily +/-', 'Daily Rank']


  // Fetch data from Google Sheets
  const { data, loading, error } = useGoogleSheets({
    apiKey: API_KEY,
    sheetId: SHEET_ID,
    sheetsOptions: [{ id: 'main' }],
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
  }), [data, loading, error];
  
  return (
    <div className="App">
      <div className="h-screen bg-cover relative">
        <Title/>
        {leaderboard && history &&
           <>
            <DataTable title='LEADERBOARD' tableHeaders={leaderboardHeaders} tableBody={leaderboard}/>
            <DataTable title='MATCH HISTORY' tableHeaders={historyHeaders} tableBody={history}/>
           </>
        }
      </div>
    </div>
  );
}

export default MainPage