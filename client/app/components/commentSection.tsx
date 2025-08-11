import { useEffect, useState } from "react";
import {
  Reply,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  Pin,
  Shield,
  ChevronDown,
  Check,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import type { Smartphone, SmartphoneCommentType } from "~/types/globals.type";
import { useUser } from "~/context/userContext";
import { nanoid } from "nanoid"
import { usePopupButton } from "~/context/popupButtonContext";
import { toReadableDate } from "~/utils/formatDate";

type CommentsSectionProps = {
  smartphoneId: Smartphone["_id"]
  smartphoneComments: Omit<SmartphoneCommentType[], "userId" | "deviceId" | "updatedAt">
}

export default function CommentsSection({ smartphoneId, smartphoneComments }: CommentsSectionProps) {
  const { user } = useUser()
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [ newSocket, setNewSocket ] = useState<Socket| null>(null)
  const { setPopupButton } = usePopupButton()
  const [comments, setComments ] = useState<Omit<SmartphoneCommentType[], "userId" | "deviceId" | "updatedAt">>(smartphoneComments)
  useEffect(() => {
    const socket = io(import.meta.env.VITE_COMMENTS_SOCKET_NAMESPACE, {
      withCredentials: true, 
    })
    setNewSocket(socket)
  
    socket.on("connect_error", (err) => {
      console.error("connection error", err.message)
    })
    // console.log(smartphoneId)
    socket.emit("joinSmartphoneRoom", smartphoneId)

    socket.on("new-comment", (newComment) => {
      console.log(newComment)
      
      setComments((prev) => [...prev, newComment])
    })

    return () => {
      socket.disconnect();
    }

  }, [])
  console.log(comments)
  const handleTextarea = () => {
    // if(!user.email) {
    //   setPopupButton(prevState => ({
    //     ...prevState,
    //     isLoginClicked: true,
    //   }))
    // }
  } 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!commentText.trim() || !user.email) return
      const newComment: SmartphoneCommentType = {
        id: nanoid(),
        name: user.name,
        message: commentText,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        isDeleted: false
      }
      setComments((prev) => [newComment, ...prev])
      newSocket?.emit("add-comment", commentText, smartphoneId)
      setCommentText("")
    }
  }

  // const sortedComments = [...comments].sort((a, b) => {
  //   if (sortOrder === "newest") return b.date.getTime() - a.date.getTime();
  //   return a.date.getTime() - b.date.getTime();
  // });

  return (
    <div className="p-4 border-1 shadow-lg rounded-md max-w-full mt-10 mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm text-gray-400 hover:text-white"
          >
            Sort by <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-700 rounded-md shadow-lg">
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-700"
                onClick={() => {
                  setSortOrder("newest");
                  setDropdownOpen(false);
                }}
              >
                Newest {sortOrder === "newest" && <Check size={14} />}
              </button>
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-700"
                onClick={() => {
                  setSortOrder("oldest");
                  setDropdownOpen(false);
                }}
              >
                Oldest {sortOrder === "oldest" && <Check size={14} />}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Notice */}
      <div 
        className="p-4 rounded-md mb-4"
        onClick={handleTextarea}
      >
        <p className="text-gray-400 text-sm">
          You must be <span className="text-pink-500 cursor-pointer">login</span> to post a comment
        </p>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave a comment"
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent mt-2 p-2 rounded-md border border-gray-600 focus:outline-none resize-none"
        />
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {comments.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <img src="/userIcon.svg" alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              {/* User Info */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{c.name}</span>
                {/* {c.role && (
                  <span className="flex items-center gap-1 bg-blue-500 text-xs px-2 py-0.5 rounded-md">
                    <Shield size={12} /> {c.role}
                  </span>
                )} */}
                {/* {c.pinned && (
                  <span className="flex items-center gap-1 bg-gray-600 text-xs px-2 py-0.5 rounded-md">
                    <Pin size={12} /> Pinned
                  </span>
                )} */}
                <span className="text-xs text-gray-400">{toReadableDate(c.createdAt)}</span>
              </div>

              {/* Comment */}
              <p className="mt-1 text-sm">{c.message}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                {/* <button className="flex items-center gap-1 hover:text-white">
                  <Reply size={14} /> Reply
                </button> */}
                <div className="flex items-center justify-center gap-3">
                  <button className="flex items-center gap-1 hover:text-black cursor-pointer">
                    <ThumbsUp size={14} /> {c.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-black cursor-pointer">
                    <ThumbsDown size={14} /> {c.dislikes}
                  </button>
                </div>
                <button className="hover:text-black cursor-pointer">
                  <MoreHorizontal size={14} />
                </button>
              </div>

              {/* Replies */}
              {/* {c.replies && (
                <button className="text-pink-500 text-sm mt-1">
                  View {c.replies} replies
                </button>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
