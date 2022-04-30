import axios from "axios";

export const LoadAllGame = async() => {
    const data = await axios.get('http://stage.whgstage.com/front-end-test/games.php');
    return data;
};

export const LoadJackPost = async() => {
    const data = await axios.get('http://stage.whgstage.com/front-end-test/jackpots.php');
    return data;
}