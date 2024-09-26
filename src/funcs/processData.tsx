import { Sheet } from "use-google-sheets/dist/types"

interface SheetData {
    player: string;
    date: string;
    'buy-in amount': string;
    '# buy-ins': string;
    'money-out': string;
    'daily +/-': string;
}

// Interface of each entry in the leaderboard return array
interface LeaderboardEntry {
    player: string;
    total: string;
    date: string;
    totalRank: string;
}

// Interface of each entry in the history return array
interface HistoryEntry {
    date: string;
    player: string;
    buyIn: string;
    moneyIn: string;
    moneyOut: string;
    daily: string;
    dailyRank: string;
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
        const moneyIn = (+(obj['# buy-ins']) * +(obj['buy-in amount'])).toFixed(2);
        const moneyOut = obj['money-out'];
        const daily = obj['daily +/-'];

        // (1) Add each data entry to leaderboard calculations
        const playerEntry = leaderboard.find((entry) => entry.player === player) // check if player exists in leaderboard
        if (playerEntry) {
            playerEntry.total = (+(playerEntry.total) + +(daily)).toFixed(2);
            playerEntry.date = date;
        }
        else {
            leaderboard.push({
                player: player,
                total: (+daily).toFixed(2),
                date: date,
                totalRank: '-' // will be updated later
            })
        }

        // (2) Add each data entry to history dictionary
        // history dictionary is used to sort by date played {date: {obj}}
        const historyEntry = {
            date: date,
            player: player,
            buyIn: buyIn,
            moneyIn: moneyIn,
            moneyOut: moneyOut,
            daily: daily,
            dailyRank: '-' // TO-DO
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