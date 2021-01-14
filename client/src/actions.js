//this will contain all of our action creators
//action creators i just a fucntino that returns an object
//the object that gets returned is the action
import axios from "./axios";

export async function getList() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("data getList: ", data);
    return {
        type: "GET_LIST",
        friendsList: data,
    };

}