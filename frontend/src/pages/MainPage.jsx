import React, {useEffect, useState} from 'react';
import {MyCanvas} from "../components/canvas/MyCanvas";
import PointForm from "../components/UI/PointForm";
import PointService from "../API/PointService";
import PointsTable from "../components/table/PointsTable";
import styles from "./MainPage.module.css";

const MainPage = () => {
    const [inputR, setInputR] = useState(1);
    const [inputX, setInputX] = useState(0);
    const [inputY, setInputY] = useState(0);
    const [points, setPoints] = useState([]);
    const [nowId, setNowId] = useState(0);
    const [lastHit, setLastHit] = useState(null);
    const username = localStorage.getItem("web-lab-4-username");


    useEffect(() => {
        console.log("Обращение к серверу за списком точек...");
        fetchPoints();
    }, [])


    function fetchPoints() {
        PointService.getAll().then(data => {
            console.log(`Получено точек: ${data.length}`);
            setPoints(data);
        })
            .catch(() => {
                console.log("Нет подключения к серверу.");
            });
    }

    const submit = (e) => {
        e.preventDefault();
        setLastHit(checkHit(inputR, inputX, inputY));
        addPoint(inputR, inputX, inputY);
    }


    const addPoint = (r, x, y) => {
        setNowId(nowId + 1);
        sendPoint(r, x, y).then((p) => {
            console.log(`Successfully added point r=${r}, x=${x}, y=${y}`);
            setPoints([p, ...points]);
            return p;
        })
    }

    const checkHit = (r, x, y) => {
        if (x <= 0 && y >= 0 && x * x + y * y <= r * r)
            return true;
        if (x > 0 && y > 0)
            return false;
        if (x >= 0 && y <= 0 && y > x - r / 2)
            return true;
        return -r / 2 <= x && x <= 0 && -r <= y && y <= 0;

    }

    async function sendPoint(r, x, y) {
        return await PointService.sendPoint(r, x, y, username);
    }

    const clear = (e) => {
        e.preventDefault();
        PointService.clearAll(username).then((data) => {
            setPoints(data);
        });
        setLastHit(null);
    }

    // a = react.createElement(div, {..child});
    return (
        <div>
            <MyCanvas R={inputR} points={points} addPoint={addPoint}/>
            <div className={styles.hit_message}>
                {lastHit != null
                    ? (lastHit
                        ? <span className={styles.hit_message_yes}>Hit</span>
                        : <span className={styles.hit_message_no}>Did't hit</span>
                    )
                    : <span/>
                }
            </div>
            <div className={styles.coordinates}>
                <span>R = {inputR}</span>
                <span>X = {inputX}</span>
                <span>Y = {inputY}</span>
            </div>
            <PointForm
                setInputR={setInputR}
                setInputX={setInputX}
                setInputY={setInputY}
                setPoints={setPoints}
                inputY={inputY}
                submit={submit}
                clear={clear}
            />
            <br/>
            <PointsTable points={points}/>
        </div>
    );
};

export default MainPage;