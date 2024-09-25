import { Sheet } from "use-google-sheets/dist/types"

interface SheetData {
    player: string;
    date: string;
    'buy-in amount': number;
    '# buy-ins': number;
    'money-out': number;
    'daily +/-': number;
}

interface LeaderboardEntry {
    player: string;
    total: number;
    date: string;
    totalRank: string;
}

export function processData(rawData: Sheet[]) {
    const data = rawData[0].data as SheetData[]
    /* data is in the form 
    [{"player":"Jasper","date":"9/25/2024","buy-in amount":"$5.00","# buy-ins":"1","money-out":"$4.00","daily +/-":"-$1.00"},
    {"player":"Eli","date":"9/25/2024","buy-in amount":"$5.00","# buy-ins":"2","money-out":"$11.00","daily +/-":"$1.00"}] */

    // (1) Leaderboard stats sorted by a dictionary of format {player: {total: x, date: y}}
    // (2) Match history listed out in an array of [{date: x, player: p, buyIn: b, moneyIn: i, moneyOut: o, daily: d, dailyRank: r}]
    let history: any[] = []
    let leaderboard: LeaderboardEntry[] = [];

    // Parse through google sheets data
    data.forEach((obj: SheetData) => {
        const date = obj.date;
        const player = obj.player;
        const buyIn = +(obj['buy-in amount']); // '+' converts a string to number; '.toFixed(2)' rounds to 2 decimal places
        const moneyIn = +(obj['# buy-ins'] * obj['buy-in amount']);
        const moneyOut = +(obj['money-out']);
        const daily = +(obj['daily +/-']);

        // (1) Update leaderboard rankings
        const playerEntry = leaderboard.find((entry) => entry.player === player) // check if player exists in leaderboard
        if (playerEntry) {
            playerEntry.total += daily;
            playerEntry.date = date;
        }
        else {
            leaderboard.push({
                player: player,
                total: daily,
                date: date,
                totalRank: '-' // TO-DO
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
            dailyRank: '-'
        }
        history.unshift(historyObj) // push entry to the front of the array so most recent additions are displayed first
    })

    // (1) Sort leaderboard
    leaderboard.sort((a, b) => b.total - a.total)
    
    return {leaderboard, history}
}