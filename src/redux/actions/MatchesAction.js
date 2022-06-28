import axios from 'axios'

export const TYPES = {
  MATCHES: "MATCHES",
};

export const AddMatch = (data) => async (dispatch) => {
  try {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    const res = await axios.post()

    dispatch({
      type: "MATCHES",

      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    dispatch({
      type: "NOTIFY",
      payload: {
        success: res.data.msg,
      },
    });
  } catch (err) {
    dispatch({
      type: "NOTIFY",
      payload: { error: err.response.data.msg },
    });
  }
};