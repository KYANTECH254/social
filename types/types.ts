export type StatusType = "text" | "video" | "image";

export type Status = {
    id: string;
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
    id: string;
    name: string;
    statusCount: number;
    viewed: number;
    notViewed: number;
    recentStatus: Status[];
    link: string;
};

export type Post = {
    name: string;
    statusCount: number;
    viewed: number;
    notViewed: number;
    recentStatus: Status;
    link: string;
};

export type StatusPost = {
    id: string;
    type: StatusType;
    content?: string;
}

export type FloatingIcon = {
    text: string;
    icon: string | JSX.Element;
    border: boolean;
    link: string;
}

export type Reply = {
    id: number;
    username: string;
    reply_username: string;
    text: string;
    avatar: string;
    likes?: number;
    timestamp: string;
}

export type Comment = {
    id: number;
    username: string;
    text: string;
    timestamp: string;
    avatar: string;
    likes?: number;
    replies: Reply[];
}

export type ToastType = {
    type: string;
    id?: number;
    message: string;
    duration?: number;
    className?:string;
}