
// USER PAGE DUMMYDATA
export const UPData = {
  userName: "Scott Mathews",
  topics: [
    {topicName: "Fishing"},
    {topicName: "Skiing"},
    {topicName: "Running"}
  ],
  posts: [
    {type: "post",
     pid: 1234,
     topicName: "Fishing",
     content: "Hey dawg! How ya doin!"},
    {type: "comment",
     topicName: "Fishing",
     pid: 1234,
     content: "Kicking some ass!"}
  ],
  comments: [
    {userName: "Phil Richardson",
     content: "Yeah boi down by the sea sure be some fish!"},
    {userName: "Scott Mathews",
     content: "Howdy partner! I sure do know bout that!"}
  ],
  userSummary: 'My name is Scott, I\'m a big beautiful white boy. You know you want me. Who doesn\'t?'
};

// TOPIC PAGE DUMMYDATA
export const TPData = {
  topicName: "Fishing",
  posts: [
    {postTitle: "Have you been down by the sea?",
     userName: "Scott Mathews",
     content: "There are fish in the sea!"},
    {postTitle: "Have you been down by the riverside?",
     userName: "Phil Richardson",
     content: "Not a lot of fish by the riverside..."}
  ],
  comments: [
    {userName: "Phil Richardson",
     content: "Yeah boi down by the sea sure be some fish!"},
    {userName: "Scott Mathews",
     content: "Howdy partner! I sure do know bout that!"}
  ],
  description: 'This is a sample description'
};
