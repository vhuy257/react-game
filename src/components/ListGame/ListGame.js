import React from 'react';
import styles from './ListGame.module.css';

const ListGame = ({data, searchKeyword}) => {
    
    const filterClassTopNew = (item) => {
        if(item.includes("top")) {
            return <div className={styles.topTag}>Top</div>
        } else if (item.includes("new")) {
            return <div className={styles.newTag}>New</div>
        } else {
            return;
        }
    }

    return ( 
        <div className={styles.listGameWrapper}> 
            {   data && data.map((item, key) => (
                   (
                       item.categories.some((e) => {return searchKeyword.includes(e)}) && (
                        <div className={styles.gameItem} key={key}>
                            {filterClassTopNew(item.categories)}
                            <img src={item.image}/>            
                            <div className={styles.gameItemName}>
                                {item.name}
                            </div>
                            <div className={styles.gameItem_amount}>{item.amount}</div>
                            <button className={styles.btnPlayGame}>Play</button>
                        </div>
                       )
                   )
                ))  
            }
        </div>
    )
};

export default ListGame;