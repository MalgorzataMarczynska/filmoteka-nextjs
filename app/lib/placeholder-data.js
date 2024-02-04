// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    name: "Someone",
    email: "user11@nextmail.com",
    password: "alv12345alv6",
  },
  {
    id: "410544b2-4001-4271-9855-fec4b6a6442a",
    name: "Somebody",
    email: "user22@nextmail.com",
    password: "alv12387dnj45",
  },
];
const movies = [
  {
    user_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    movie_id: 609681,
    status: "watched",
    date: "2024-01-02",
  },
  {
    user_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    movie_id: 787699,
    status: "queue",
    date: "2024-01-12",
  },
  {
    user_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    movie_id: 792307,
    status: "queue",
    date: "2024-01-15",
  },
  {
    user_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    movie_id: 673593,
    status: "watched",
    date: "2024-01-21",
  },
  {
    user_id: "3958dc9e-712f-4377-85e9-fec4b6a6442a",
    movie_id: 447365,
    status: "watched",
    date: "2024-01-16",
  },
];
module.exports = {
  users,
  movies,
};
