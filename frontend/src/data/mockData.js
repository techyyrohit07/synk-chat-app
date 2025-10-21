

export const dummyUsers = [
  {
    id: 1,
    username: "Alice Johnson",
    email: "alice@example.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "See you soon!",
    lastSeen: "Online",
  },
  {
    id: 2,
    username: "Bob Smith",
    email: "bob@example.com",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks for the update!",
    lastSeen: "2h ago",
  },
  {
    id: 3,
    username: "Charlie Davis",
    email: "charlie@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Let’s catch up tomorrow",
    lastSeen: "5m ago",
  },
  {
    id: 4,
    username: "Diana Lee",
    email: "diana@example.com",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Got it, thank you!",
    lastSeen: "Offline",
  },
  {
    id: 5,
    username: "Ethan Clark",
    email: "ethan@example.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Working on it!",
    lastSeen: "1h ago",
  },
];

export const dummyMessages = {
  1: [
    { fromMe: false, text: "Hey there! How’s your day going?" },
    { fromMe: true, text: "Pretty good! Just finishing some work." },
    { fromMe: false, text: "Nice! Want to grab a coffee later?" },
    { fromMe: true, text: "Sure, sounds perfect ☕" },
  ],
  2: [
    { fromMe: false, text: "Did you check the report?" },
    { fromMe: true, text: "Yup, I sent feedback this morning." },
    { fromMe: false, text: "Got it, thanks!" },
  ],
  3: [
    { fromMe: true, text: "Hey Charlie, how’s the new project?" },
    { fromMe: false, text: "Going great so far!" },
    { fromMe: false, text: "Let’s catch up tomorrow?" },
    { fromMe: true, text: "Sure, works for me!" },
  ],
  4: [
    { fromMe: false, text: "Can you send me that file again?" },
    { fromMe: true, text: "Just emailed it to you!" },
    { fromMe: false, text: "Got it, thank you!" },
  ],
  5: [
    { fromMe: false, text: "Are you done with the frontend part?" },
    { fromMe: true, text: "Almost! Just styling the chat area." },
    { fromMe: false, text: "Cool, no rush." },
  ],
};
