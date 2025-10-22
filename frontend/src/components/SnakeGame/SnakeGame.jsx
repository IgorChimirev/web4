import React, { useState, useEffect, useCallback } from 'react';
import { SnakeService } from '../../API/SnakeService';
import styles from './SnakeGame.module.css';

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = 'RIGHT';
const INITIAL_FOOD = { x: 5, y: 5 };

const SnakeGame = () => {
    const [snake, setSnake] = useState(INITIAL_SNAKE);
    const [food, setFood] = useState(INITIAL_FOOD);
    const [direction, setDirection] = useState(INITIAL_DIRECTION);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(150);
    const [playerName, setPlayerName] = useState('');
    const [isPaused, setIsPaused] = useState(false);


    const generateFood = useCallback(() => {
        const newFood = {
            x: Math.floor(Math.random() * BOARD_SIZE),
            y: Math.floor(Math.random() * BOARD_SIZE)
        };


        const isOnSnake = snake.some(segment =>
            segment.x === newFood.x && segment.y === newFood.y
        );

        if (isOnSnake) {
            return generateFood();
        }

        return newFood;
    }, [snake]);

    // Движение змейки
    const moveSnake = useCallback(() => {
        if (!isPlaying || gameOver || isPaused) return;

        setSnake(prevSnake => {
            const head = { ...prevSnake[0] };

            switch (direction) {
                case 'UP':
                    head.y -= 1;
                    break;
                case 'DOWN':
                    head.y += 1;
                    break;
                case 'LEFT':
                    head.x -= 1;
                    break;
                case 'RIGHT':
                    head.x += 1;
                    break;
                default:
                    break;
            }


            if (head.x < 0 || head.x >= BOARD_SIZE || head.y < 0 || head.y >= BOARD_SIZE) {
                setGameOver(true);
                setIsPlaying(false);
                return prevSnake;
            }


            if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
                setGameOver(true);
                setIsPlaying(false);
                return prevSnake;
            }

            const newSnake = [head, ...prevSnake];


            if (head.x === food.x && head.y === food.y) {
                setFood(generateFood());
                setScore(prevScore => {
                    const newScore = prevScore + 10;
                    // Увеличиваем скорость каждые 50 очков
                    if (newScore % 50 === 0) {
                        setSpeed(prevSpeed => Math.max(50, prevSpeed - 10));
                    }
                    return newScore;
                });
            } else {
                newSnake.pop();
            }

            return newSnake;
        });
    }, [direction, food, isPlaying, gameOver, generateFood, isPaused]);

    const handleKeyDown = useCallback((e) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
            e.preventDefault();

        }
            if (!isPlaying) return;

            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setDirection('RIGHT');
                    break;
                case ' ':

                    setIsPaused(prev => !prev);
                    break;
                default:
                    break;
            }


    }, [direction, isPlaying]);


    useEffect(() => {
        if (isPlaying) {
            window.addEventListener('keydown', handleKeyDown);
            const gameElement = document.querySelector(`.${styles.snakeGame}`);
            if (gameElement) {
                gameElement.focus();
            }
        }


        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isPlaying, handleKeyDown]);

    useEffect(() => {
        if (!isPlaying) return;

        const gameInterval = setInterval(moveSnake, speed);
        return () => clearInterval(gameInterval);
    }, [isPlaying, moveSnake, speed]);


    const startGame = () => {
        if (!playerName.trim()) {
            alert('Пожалуйста, введите ваше имя!');
            return;
        }

        setSnake(INITIAL_SNAKE);
        setFood(generateFood());
        setDirection(INITIAL_DIRECTION);
        setGameOver(false);
        setScore(0);
        setSpeed(150);
        setIsPlaying(true);
        setIsPaused(false);
    };


    const togglePause = () => {
        setIsPaused(prev => !prev);
    };


    const saveScore = async () => {
        if (!playerName.trim()) {
            alert('Пожалуйста, введите ваше имя для сохранения результата!');
            return;
        }

        try {
            await SnakeService.saveScore({
                playerName: playerName.trim(),
                score: score,
                level: Math.floor(score / 50) + 1
            });

        } catch (error) {
            console.error('Ошибка при сохранении результата:', error);

        }
    };


    const resetGame = () => {
        setSnake(INITIAL_SNAKE);
        setFood(INITIAL_FOOD);
        setDirection(INITIAL_DIRECTION);
        setGameOver(false);
        setScore(0);
        setSpeed(150);
        setIsPlaying(false);
        setIsPaused(false);
    };


    const renderBoard = () => {
        const board = [];

        for (let y = 0; y < BOARD_SIZE; y++) {
            for (let x = 0; x < BOARD_SIZE; x++) {
                const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                const isHead = snake[0].x === x && snake[0].y === y;
                const isFood = food.x === x && food.y === y;

                let cellClass = styles.cell;
                if (isHead) cellClass += ` ${styles.snakeHead}`;
                else if (isSnake) cellClass += ` ${styles.snakeBody}`;
                else if (isFood) cellClass += ` ${styles.food}`;

                board.push(
                    <div
                        key={`${x}-${y}`}
                        className={cellClass}
                        style={{
                            gridColumn: x + 1,
                            gridRow: y + 1,
                        }}
                    />
                );
            }
        }

        return board;
    };

    return (
        <div className={styles.snakeGame}>
            <h2>Змейка</h2>

            <div className={styles.gameInfo}>
                <div className={styles.score}>Счет: {score}</div>
                <div className={styles.level}>Уровень: {Math.floor(score / 50) + 1}</div>
                {isPaused && <div className={styles.pausedIndicator}>ПАУЗА</div>}
            </div>

            <div className={styles.controls}>
                <input
                    type="text"
                    placeholder="Введите ваше имя"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    className={styles.nameInput}
                    disabled={isPlaying && !gameOver}
                />

                <div className={styles.buttonGroup}>
                    {!isPlaying ? (
                        <button
                            onClick={startGame}
                            className={styles.startButton}
                            disabled={!playerName.trim()}
                        >
                            {gameOver ? 'Играть снова' : 'Начать игру'}
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={togglePause}
                                className={styles.pauseButton}
                            >
                                {isPaused ? 'Продолжить' : 'Пауза'}
                            </button>
                            <button
                                onClick={resetGame}
                                className={styles.resetButton}
                            >
                                Сбросить
                            </button>
                        </>
                    )}

                    {gameOver && (
                        <button
                            onClick={saveScore}
                            className={styles.saveButton}
                        >
                            Сохранить результат
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.boardContainer}>
                <div className={styles.board}>
                    {renderBoard()}
                </div>
                {isPaused && (
                    <div className={styles.pauseOverlay}>
                        <div className={styles.pauseText}>ПАУЗА</div>
                    </div>
                )}
            </div>

            <div className={styles.instructions}>
                <h4>Управление:</h4>
                <p>Стрелки ← ↑ → ↓ для движения</p>
                <p>Пробел - пауза</p>
                {gameOver && (
                    <div className={styles.gameOver}>
                        Игра окончена! Ваш счет: {score}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SnakeGame;