import { CREATE_EVENT } from "./types";
import axios from "axios";

export const getEvents = () => (dispatch, getState) => ({});

export const createEvent = eventObj => (dispatch, getState) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  config.headers["Authorization"] = `Token ${getState().auth.token}`;
  const body = {
    query: `
          mutation {
              createEvent(eventInput: {title:"${eventObj.title}", description:"${eventObj.description}", price:${eventObj.price},date:"${eventObj.date}"}){
                  
                  title
                  description
                  price
                  date
                  creator{
                      username
                  }
                 
              }
          }
          `
  };
  axios
    .post(`http://localhost:8000/graphql`, body, config)
    .then(res => {
      console.log(res.data.data);
      dispatch({
        type: CREATE_EVENT,
        payload: res.data.data
      });
    })
    .catch(err => {
      alert(`ERRRRRRROR`);
      console.log(err.message);
    });
};
