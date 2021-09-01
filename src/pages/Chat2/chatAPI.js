import Axios from "axios";

const api = Axios.create({
  baseURL: "/api/",
});

const chatAPI = {
//   getMessages: (groupId) => {
//     console.log("Calling get messages from API");
//     return api.get(`/messages/${groupId}`);
//   },

  sendMessage: (username, text) => {
    let msg = {
      author: username,
      content: text,
    };
    return api.post(`/message`, msg, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

export default chatAPI;