
import axios from "../helpers/axios";

export const getRetailer = () => {
    return async dispatch => {
        const res = await axios.get(`retailers`);
        console.log(res);
        if (res.status === 200) {

            const { RetailerList } = res.data;

            dispatch({
                payload: { retailers: RetailerList }
            });
        } else {
            dispatch({
                payload: { error: res.data.error }
            });
        }


    }
}