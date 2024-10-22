const totalGamesDisplay = document.getElementById('total-games');
const playerWinsDisplay = document.getElementById('player-wins');
const computerWinsDisplay = document.getElementById('computer-wins');

async function fetchStatistics() {
    try {
        const response = await fetch('https://coin-flip-backend-647009581501.europe-north1.run.app/stats');
        if (!response.ok) {
            throw new Error('Failed to fetch statistics');
        }
        const data = await response.json();
        displayStatistics(data);
        createPieChart(data.playerWinPercentage.toFixed(2), data.computerWinPercentage.toFixed(2));
    } catch (error) {
        console.error('Error fetching statistics:', error);
    }
}

function displayStatistics(data) {
    totalGamesDisplay.textContent = data.totalGames;
    playerWinsDisplay.textContent = data.playerWinPercentage.toFixed(2) + '%';
    computerWinsDisplay.textContent = data.computerWinPercentage.toFixed(2) + '%';
}

function createPieChart(playerWins, computerWins) {
    const ctx = document.getElementById('winsChart').getContext('2d');
    const winsChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Player Wins', 'Computer Wins'],
            datasets: [{
                data: [playerWins, computerWins],
                backgroundColor: ['#28a745', '#dc3545'], // Colors for each segment
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Game Wins Distribution'
                }
            }
        }
    });
}

// Fetch statistics when the page loads
fetchStatistics();
