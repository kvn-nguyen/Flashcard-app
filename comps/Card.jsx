import React, {useState} from 'react';
import styles from "../styles/Home.module.css";

const Card = ({item}) => {
    const {question, answer} = item;

    const [front, setFront] = useState(true)

    const handleToggle = () => {
        setFront(!front)
    }

    return (
        <div>
            <div onClick={handleToggle} className={styles.card}>
                <p>{front ? question : answer}</p>
            </div>
        </div>
    )
}

export default Card;