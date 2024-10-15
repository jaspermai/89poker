import { Sheet } from "use-google-sheets/dist/types"

interface SheetData {
    player: string;
    date: string;
    'buy-in amount': string;
    'money-in': string;
    'money-out': string;
    'daily +/-': string;
}

// Interface of each entry in the leaderboard return array
interface LeaderboardEntry {
    totalRank: string;
    player: string;
    total: string;
    numGames: string;
    date: string;
}

// Interface of each entry in the history return array
interface HistoryEntry {
    dailyRank: string;
    date: string;
    player: string;
    buyIn: string;
    numBuyIn: string;
    daily: string;
}

export function processData(rawData: Sheet[]) {
    const data = rawData[0].data as SheetData[];
    /* data is in the form 
    [{"player":"Jasper","date":"9/25/2024","buy-in amount":"$5.00","# buy-ins":"1","money-out":"$4.00","daily +/-":"-$1.00"},
    {"player":"Eli","date":"9/25/2024","buy-in amount":"$5.00","# buy-ins":"2","money-out":"$11.00","daily +/-":"$1.00"}] */

    // (1) Leaderboard stats
    // (2) Match history
    let history: HistoryEntry[] = [];
    let leaderboard: LeaderboardEntry[] = [];

    let historyByDate: {[date: string]: HistoryEntry[] } = {};
    let datesSorted: string[] = []

    // Parse through google sheets data
    data.forEach((obj: SheetData) => {
        const date = obj.date;
        const player = obj.player;
        const buyIn = obj['buy-in amount'];
        const numBuyIn = +(obj['money-in']) / +(obj['buy-in amount']);
        const daily = obj['daily +/-'];

        // (1) Add each data entry to leaderboard calculations
        const playerEntry = leaderboard.find((entry) => entry.player === player) // check if player exists in leaderboard
        if (playerEntry) {
            playerEntry.total = (+(playerEntry.total) + +(daily)).toFixed(2);
            playerEntry.date = date;
            playerEntry.numGames = (+playerEntry.numGames + 1).toString();
        }
        else {
            leaderboard.push({
                totalRank: '-', // will be updated later,
                player: player,
                total: (+daily).toFixed(2),
                numGames: '1',
                date: date
            })
        }

        // (2) Add each data entry to history dictionary
        // history dictionary is used to sort by date played {date: {obj}}
        const historyEntry = {
            dailyRank: '-', // TO-DO
            player: player,
            buyIn: buyIn,
            numBuyIn: numBuyIn.toString(),
            daily: daily,
            date: date
        }

        if (historyByDate[date]) {
            historyByDate[date].push(historyEntry)
        }
        else {
            historyByDate[date] = [historyEntry]
            datesSorted.unshift(date)
        }
        
    })

    // (1) Sort leaderboard
    leaderboard.sort((a, b) => +(b.total) - +(a.total))
    // Update leaderboard totalRank
    let rank = 1;
    let numPlayer = 0;
    for (let i = 0; i < leaderboard.length; i++) {
        numPlayer++
        if (i === 0 || leaderboard[i].total !== leaderboard[i - 1].total) {
            rank = numPlayer;
        }
        leaderboard[i].totalRank = rank.toString()
    }

    // (2) Update history dailyRank
    // For each date in historyByDate, sort by daily +/- and update dailyRank
    // If dailyRank is not 1, then remove buy-in and date values
    Object.keys(historyByDate).forEach((date) => {
        const historyEntries = historyByDate[date];
        const totalPlayers = historyEntries.length;
        
        historyEntries.sort((a, b) => +(b.daily) - +(a.daily))

        let rank = 1;
        let numPlayer = 0;
        for (let i = 0; i < historyEntries.length; i++) {
            numPlayer++
            if (i === 0 || historyEntries[i].daily !== historyEntries[i - 1].daily) {
                rank = numPlayer;
            }
            historyEntries[i].dailyRank = `${rank} of ${totalPlayers}`;
            if (i !== 0) {
                historyEntries[i].buyIn = '-';
                historyEntries[i].date = '-';
            }
        }
    });
    // Using the datesSorted array, iterate through the historyByDate dictionary one at a time and add to result history array
    datesSorted.forEach((date) => {
        historyByDate[date].forEach((entry: HistoryEntry) => {
            history.push(entry)
        })
    })
    
    return {leaderboard, history}
}