import React, { useContext } from 'react';
import { AppContext } from '../../App';
import styles from './Navigation.module.css';
import {
    ActiveMenuItemAction
} from '../../store/actions';

const Navigation = ({data}) => {
    const {dispatch} = useContext(AppContext);

    const filterGameList = (item) => {
        dispatch(ActiveMenuItemAction(item));
    }

    return (
        <ul className={styles.menu}>
            {
                data && data.map((item, key) => (
                    <li key={key} className={item.active ? styles.active : ''} onClick={(e) => {filterGameList(item)}}>
                        {item.name}
                    </li>
                ))
            }
        </ul>
    )
};

export default Navigation;

