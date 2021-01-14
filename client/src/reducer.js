export default function reducer(state = {}, action ) {
    //we will deal with the actinos here
    if (action.type == "GET_LIST") {
        state = {
            ...state,
            friendsWannabes: action.friendsList,
        };
    }

    return state;
}

//REVISAO
// const obj = {
//     first: 'Pete'
// };

// const newObj = {
//     ...obj,
//     last: 'Anderson'
// };

// const arr = [1, 2, 3];
// const newArr = [...arr];

//there are a couple of really array methods
//that dont mutate the original array
////Filter
////Map