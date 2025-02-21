export type StatusType = "text" | "video" | "image";

export type Status = {
    id:string;
    type: StatusType;
    statusText?: string;
    path?: string | null;
    bgColor?: string | null;
    timestamp: Date | string | null;
    views: number;
    comments: number;
    shares: number;
};

export type Posts = {
    id:string;
    name: string;
    statusCount: number;
    viewed: number;
    notViewed: number;
    recentStatus: Status[];
    link:string;
};

export type Post = {
    name: string;
    statusCount: number;
    viewed: number;
    notViewed: number;
    recentStatus: Status;
    link:string;
};

export type StatusPost = {
    id: string;
    type: StatusType;
    content: string;
}

