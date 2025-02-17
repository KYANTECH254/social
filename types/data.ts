import { Posts } from "./types";

export const samplePosts: Posts[] = [
    {
        name: "Alice",
        statusCount: 3,
        viewed: 3,
        notViewed: 0,
        link: "1", // Parent link
        recentStatus: [
            {
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
        name: "Bob",
        statusCount: 2,
        viewed: 1,
        notViewed: 1,
        link: "2", // Parent link
        recentStatus: [
            {
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
                type: "video",
                statusText: "My favorite video of the day!",
                path: "/assets/images/video.mp4",
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
        name: "Charlie",
        statusCount: 50,
        viewed: 25,
        notViewed: 30,
        link: "3", // Parent link
        recentStatus: [
            {
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
        name: "David",
        statusCount: 1,
        viewed: 1,
        notViewed: 0,
        link: "4", // Parent link
        recentStatus: [
            {
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
