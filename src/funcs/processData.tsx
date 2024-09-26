import { Sheet } from "use-google-sheets/dist/types"

interface SheetData {
    player: string;
    date: string;
    'buy-in amount': string;
    '# buy-ins': string;
    'money-out': string;
    'daily +/-': string;
}

interface LeaderboardEntry {
    player: string;
    total: string;
    date: string;
    totalRank: string;
}

export function processData(rawData: Sheet[]) {
    const data = rawData[0].data as SheetData[];
    /* data is in the form 
    [{"player":"Jasper","date":"9/25/2024","buy-in amount":"$5.00","# buy-ins":"1","money-out":"$4.00","daily +/-":"-$1.00"},
    {"player":"Eli","date":"9/25/2024","buy-in amount":"$5.00","# buy-ins":"2","money-out":"$11.00","daily +/-":"$1.00"}] */

    // (1) Leaderboard stats sorted by a dictionary of format {player: {total: x, date: y}}
    // (2) Match history listed out in an array of [{date: x, player: p, buyIn: b, moneyIn: i, moneyOut: o, daily: d, dailyRank: r}]
    let history: any[] = [];
    let leaderboard: LeaderboardEntry[] = [];

    // Parse through google sheets data
    data.forEach((obj: SheetData) => {
        const date = obj.date;
        const player = obj.player;
        const buyIn = obj['buy-in amount'];
        const moneyIn = (+(obj['# buy-ins']) * +(obj['buy-in amount'])).toFixed(2);
        const moneyOut = obj['money-out'];
        const daily = obj['daily +/-'];

        // (1) Update leaderboard rankings
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

        // (2) Update match history
        const historyObj = {
            date: date,
            player: player,
            buyIn: buyIn,
            moneyIn: moneyIn,
            moneyOut: moneyOut,
            daily: daily,
            dailyRank: '-' // TO-DO
        }
        history.unshift(historyObj) // push entry to the front of the array so most recent additions are displayed first
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
    // TO-DO
    
    return {leaderboard, history}
}