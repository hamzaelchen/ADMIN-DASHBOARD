// Fonction pour récupérer les données du portefeuille
async function fetchPortfolioData() {
    try {
        const data = JSON.parse(localStorage.getItem('portfolioData')) || [];
        return data;
    } catch (error) {
        console.error('Erreur lors de la récupération des données du portefeuille:', error);
        return [];
    }
}

// Fonction pour mettre à jour le graphique
async function updateChart() {
    const portfolioData = await fetchPortfolioData();
    
    const labels = portfolioData.map(item => item.name);
    const values = portfolioData.map(item => item.value);

    const data = {
        labels: labels,
        datasets: [{
            label: 'Valeur du portefeuille',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2
        }]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Valeur du portefeuille par élément'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valeur (€)'
                    }
                }
            }
        }
    };

    const ctx = document.getElementById('portfolioChart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, config);
}

// Mettre à jour le graphique au chargement de la page
updateChart();

// Mettre à jour le graphique toutes les 5 secondes
setInterval(updateChart, 5000);