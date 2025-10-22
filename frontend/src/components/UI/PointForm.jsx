import React from 'react';
import {ButtonWithValue} from "./ButtonWithValue";
import MyButton from "./MyButton";
import {InputNumber} from "primereact/inputnumber";
import styles from "./PointForm.module.css";

const PointForm = ({setInputR, setInputX, setInputY, inputY, submit, clear}) => {
    const changeInput = (e) => {
        e.preventDefault();
        switch (e.target.name) {
            case "R":
                setInputR(parseFloat(e.target.value));
                break;
            case "X":
                setInputX(parseFloat(e.target.value));
                break;
            case "Y":
                setInputY(parseFloat(e.target.value));
                break;
            default:
                break;
        }
    }

    return (
        <form>
            <div className={styles.form__wrapper}>
                <div className={styles.form_input__wrapper}>
                    <div className={styles.form_input_name}>
                        <span>R:</span>
                    </div>
                    <div className={styles.form_input_buttons__wrapper}>
                        <ButtonWithValue raised onClick={changeInput} name="R" value={1}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="R" value={1.5}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="R" value={2}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="R" value={2.5}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="R" value={3}></ButtonWithValue>
                    </div>
                </div>
                <div className={styles.form_input__wrapper}>
                    <div className={styles.form_input_name}>
                        <span>X:</span>
                    </div>
                    <div className={styles.form_input_buttons__wrapper}>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={-3}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={-2}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={-1}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={0}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={1}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={2}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={3}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={4}></ButtonWithValue>
                        <ButtonWithValue raised onClick={changeInput} name="X" value={5}></ButtonWithValue>
                    </div>
                </div>
                <div className={styles.form_input__wrapper}>
                    <div className={styles.form_input_name}>
                        <span>Y:</span>
                    </div>
                    <div className={styles.form_input_buttons__wrapper}>
                        <InputNumber
                            value={inputY}
                            onValueChange={(e) => setInputY(e.value)}
                            mode="decimal"
                            showButtons
                            min={-3}
                            max={5}
                        />
                    </div>
                </div>
                <div className={styles.form_input_submit__wrapper}>
                    <MyButton size="large" raised severity="success" onClick={submit}>Submit</MyButton>
                    <MyButton size="large" raised severity="warning" icon="pi pi-trash" onClick={clear}>Clear
                        All</MyButton>
                </div>
            </div>
        </form>
    );
};

export default PointForm;