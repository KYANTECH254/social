"use client";

import { useState } from "react";
import "./SocialFeed.css";
import Link from "next/link";

interface User {
  name: string;
  handle: string;
  avatar: string;
}

interface Media {
  type: "image" | "video";
  content: string;
}

interface Post {
  id: number;
  isAd: boolean;
  user: User;
  time: string;
  text: string;
  media?: Media;
  likes?: number;
  comments?: number;
  shares?: number;
  liked?: boolean;
}

const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      isAd: false,
      user: { name: "Don Joe", handle: "@donjoe", avatar: "https://i.pravatar.cc/40" },
      time: "2h",
      text: "Just launched our new feature! 🚀 Check out the video below 👇",
      media: { type: "video", content: "VIDEO PLAYER" },
      likes: 1000,
      comments: 284,
      shares: 150,
      liked: false,
    },
    {
      id: 2,
      isAd: true,
      user: { name: "Tech Gadgets Pro", handle: "@techgadgets", avatar: "https://i.pravatar.cc/40?img=30" },
      time: "Sponsored",
      text: "Upgrade your workspace with our ergonomic keyboard! ⌨️ Limited time offer ⏳",
      media: { type: "image", content: "https://source.unsplash.com/random/800x600?keyboard" },
    },
    {
      id: 3,
      isAd: false,
      user: { name: "Sarah Smith", handle: "@sarahdesign", avatar: "https://i.pravatar.cc/40?img=15" },
      time: "4h",
      text: "Sunset views from our new office space 🌇",
      media: { type: "image", content: "https://source.unsplash.com/random/800x600?sunset" },
      likes: 2400,
      comments: 891,
      shares: 300,
      liked: false,
    },
  ]);

  const handleLike = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: (post.likes || 0) + (post.liked ? -1 : 1) }
          : post
      )
    );
  };

  const handleShare = (postId: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, shares: (post.shares || 0) + 1 } : post
      )
    );
  };

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className={`card ${post.isAd ? "ad" : ""}`}>
          {post.isAd && <div className="ad-label">Sponsored</div>}

          {/* {!post.isAd && ( */}
          <div className="actions-column">
            <div className="action-button" onClick={() => handleLike(post.id)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill={post.liked ? "#ff0000" : "currentColor"}>
                <path d="M12 21.638L11.172 20.809C6.732 16.594 4 13.97 4 10.5C4 7.634 6.21 5.5 9 5.5C10.656 5.5 12.242 6.324 13 7.5C13.758 6.324 15.344 5.5 17 5.5C19.79 5.5 22 7.634 22 10.5C22 13.97 19.268 16.594 14.828 20.809L14 21.638L12 21.638Z" />
              </svg>
              <span className="action-count">{post.likes?.toLocaleString() || 0}</span>
            </div>
            <div className="action-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H5.17L4 17.17V4H20V16Z" />
              </svg>
              <span className="action-count">{post.comments?.toLocaleString() || 0}</span>
            </div>
            <div className="action-button" onClick={() => handleShare(post.id)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
              </svg>
              <span className="action-count">{post.shares?.toLocaleString() || 0}</span>
            </div>
          </div>
          {/* )} */}

          <Link href="/p">
            <div className="content-column">
              <div className="post-header">
                <img src={post.user.avatar} alt="Avatar" className="avatar" />
                <div className="user-info">
                  <div className="user-name">{post.user.name}</div>
                  <div className="post-time">
                    {post.user.handle} · {post.time}
                  </div>
                </div>
              </div>
              <p className="post-text">{post.text}</p>
              {post.media?.type === "video" ? (
                <div className="video-container">{post.media.content}</div>
              ) : (
                <img src={post.media?.content} alt="Post media" className="post-media" />
              )}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;
