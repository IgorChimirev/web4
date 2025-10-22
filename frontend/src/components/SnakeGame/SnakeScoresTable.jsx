// src/components/SnakeGame/SnakeScoresTable.jsx
import React, { useState, useEffect } from 'react';
import { SnakeService } from '../../API/SnakeService';
import styles from './SnakeScoresTable.module.css';

const SnakeScoresTable = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadScores();
    }, []);

    const loadScores = async () => {
        try {
            setLoading(true);
            const topScores = await SnakeService.getTopScores();
            setScores(topScores);
        } catch (err) {
            setError('Не удалось загрузить результаты');
            console.error('Error loading scores:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return <div className={styles.loading}>Загрузка результатов...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.scoresTable}>
            <h3>Таблица рекордов</h3>
            {scores.length === 0 ? (
                <p className={styles.noScores}>Пока нет рекордов. Будьте первым!</p>
            ) : (
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Игрок</th>
                        <th>Счет</th>
                        <th>Уровень</th>
                        <th>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {scores.map((score, index) => (
                        <tr key={score.id} className={index < 3 ? styles.topThree : ''}>
                            <td className={styles.rank}>{index + 1}</td>
                            <td className={styles.player}>{score.playerName}</td>
                            <td className={styles.score}>{score.score}</td>
                            <td className={styles.level}>{score.level}</td>
                            <td className={styles.date}>{formatDate(score.createdAt)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
            <button onClick={loadScores} className={styles.refreshButton}>
                Обновить
            </button>
        </div>
    );
};

export default SnakeScoresTable;