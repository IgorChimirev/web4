import { BASE_URL } from './apiconfig';

const API_URL = `${BASE_URL}/api/snake`;

export const SnakeService = {
    async getTopScores() {
        try {
            console.log('Fetching from:', `${API_URL}/scores`);
            const response = await fetch(`${API_URL}/scores`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Scores received:', data);
            return data;
        } catch (error) {
            console.error('Error fetching scores:', error);
            return [];
        }
    },

    async saveScore(scoreData) {
        try {

            const scoreWithTimestamp = {
                ...scoreData,
                createdAt: new Date().toISOString()
            };

            console.log('Saving to:', `${API_URL}/score`, scoreWithTimestamp);
            const response = await fetch(`${API_URL}/score`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(scoreWithTimestamp),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server error response:', errorText);
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Score saved successfully:', data);
            return data;
        } catch (error) {
            console.error('Error saving score:', error);
            throw error;
        }
    },

    async getPlayerScores(playerName) {
        try {
            const response = await fetch(`${API_URL}/scores/${encodeURIComponent(playerName)}`);
            if (!response.ok) throw new Error('Failed to fetch player scores');
            return await response.json();
        } catch (error) {
            console.error('Error fetching player scores:', error);
            return [];
        }
    }
};