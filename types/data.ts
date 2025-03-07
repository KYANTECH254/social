import { Posts, Comment } from "./types";

export const samplePosts: Posts[] = [
    {
        id: "1",
        name: "Alice",
        statusCount: 3,
        viewed: 3,
        notViewed: 0,
        link: "1", // Parent link
        recentStatus: [
            {
                id: "1",
                type: "text",
                statusText: "klshdajsvdgjasdgahsdgahsdfahsdfahsdgahfs!",
                bgColor: "red",
                path: null,
                // 5 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:58:00Z",
                views: 120,
                comments: 5,
                shares: 2,
            },
            {
                id: "2",
                type: "text",
                statusText: "Had an amazing time at the park!",
                bgColor: "blue",
                path: null,
                // 45 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:18:00Z",
                views: 200,
                comments: 12,
                shares: 6,
            },
            {
                id: "3",
                type: "text",
                statusText: "Feeling productive today!",
                bgColor: "green",
                path: null,
                // 1 hour ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T15:58:00Z",
                views: 85,
                comments: 3,
                shares: 1,
            },
        ],
    },
    {
        id: "2",
        name: "Bob",
        statusCount: 2,
        viewed: 1,
        notViewed: 1,
        link: "2", // Parent link
        recentStatus: [
            {
                id: "4",
                type: "video",
                statusText: "Check out this new video!",
                path: "/assets/images/video.mp4",
                bgColor: null,
                // 13 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:50:00Z",
                views: 150,
                comments: 8,
                shares: 4,
            },
            {
                id: "5",
                type: "video",
                statusText: "My favorite video of the day!",
                path: "/assets/images/short.mp4",
                bgColor: null,
                // 53 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:10:00Z",
                views: 220,
                comments: 15,
                shares: 10,
            },
        ],
    },
    {
        id: "3",
        name: "Charlie",
        statusCount: 50,
        viewed: 25,
        notViewed: 30,
        link: "3", // Parent link
        recentStatus: [
            {
                id: "6",
                type: "image",
                statusText: "New photo update!",
                path: "/assets/images/pic.jpeg",
                bgColor: null,
                // 23 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:40:00Z",
                views: 500,
                comments: 25,
                shares: 15,
            },
            {
                id: "7",
                type: "image",
                statusText: "Had a great weekend!",
                path: "/assets/images/pic.jpeg",
                bgColor: null,
                // 33 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:30:00Z",
                views: 350,
                comments: 18,
                shares: 12,
            },
            {
                id: "8",
                type: "image",
                statusText: "My dog just got a new toy!",
                path: "/assets/images/pic.jpeg",
                bgColor: null,
                // 1 hour ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T15:58:00Z",
                views: 430,
                comments: 22,
                shares: 9,
            },
        ],
    },
    {
        id: "4",
        name: "David",
        statusCount: 1,
        viewed: 1,
        notViewed: 0,
        link: "4", // Parent link
        recentStatus: [
            {
                id: "9",
                type: "text",
                statusText: "Just had a great lunch.",
                bgColor: "bg-red-100",
                path: null,
                // 33 minutes ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T16:30:00Z",
                views: 95,
                comments: 4,
                shares: 3,
            },
            {
                id: "10",
                type: "text",
                statusText: "I love a good cup of coffee!",
                bgColor: "bg-yellow-100",
                path: null,
                // 1 hour ago relative to 17 Feb 2025 17:03
                timestamp: "2025-02-17T15:58:00Z",
                views: 120,
                comments: 6,
                shares: 5,
            },
        ],
    },
];

export const comments: Comment[] = [
    {
        id: 1,
        username: "gloria",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        timestamp: "2024-03-06T14:30:00Z", 
        avatar: "https://i.pravatar.cc/40?img=10",
        likes: 10,
        replies: [
            {
                id: 101,
                username: "john_doe",
                reply_username: "gloria",
                likes: 5,
                text: "I totally agree with you! This is insightful.",
                avatar: "https://i.pravatar.cc/40?img=10",
                timestamp: "2024-03-06T16:00:00Z", 
            },
        ],
    },
    {
        id: 2,
        username: "alex",
        text: "Great discussion! I found this really helpful.",
        timestamp: "2024-03-05T10:15:00Z", 
        avatar: "https://i.pravatar.cc/40?img=20",
        likes: 8,
        replies: [
            {
                id: 102,
                username: "maria",
                reply_username: "alex",
                likes: 3,
                text: "Absolutely! Thanks for sharing your thoughts.",
                avatar: "https://i.pravatar.cc/40?img=10",
                timestamp: "2024-03-05T12:45:00Z", 
            },
        ],
    },
];



