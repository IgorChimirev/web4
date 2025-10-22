import React from 'react';
import { useAbout } from '../context/AboutContext'; // Добавляем импорт контекста
import AboutAccessModal from '../components/AboutAccessModal/AboutAccessModal';
import SnakeGame from '../components/SnakeGame/SnakeGame';
import SnakeScoresTable from '../components/SnakeGame/SnakeScoresTable';
import styles from './About.module.css';

const About = () => {
    const { aboutAccessGranted } = useAbout();


    if (!aboutAccessGranted) {
        return <AboutAccessModal />;
    }


    return (
        <div className={styles.about__container}>
            <div className={styles.about__content}>
                <div className={styles.info__grid}>
                    <div className={styles.info__item}>
                        Чимирев Игорь Олегович
                    </div>
                    <div className={styles.info__item}>
                        P3222
                    </div>
                    <div className={styles.info__item}>
                        98282
                    </div>
                    <div className={styles.info__item}>
                        <a href="https://github.com/stepagin" target="_blank" rel="noopener noreferrer">Stepagin
                        </a>
                    </div>
                </div>
            </div>

            <div className={styles.game__section}>
                <h2>Игра "Змейка"</h2>
                <p>Отдохните и сыграйте в классическую змейку! Результаты сохраняются в таблице рекордов.</p>
                <SnakeGame />
            </div>

            <div className={styles.scores__section}>
                <SnakeScoresTable />
            </div>
        </div>
    );
};

export default About;