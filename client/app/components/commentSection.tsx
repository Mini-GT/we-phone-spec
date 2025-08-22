import { useEffect, useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  ChevronDown,
  Check,
  BadgeCheck,
} from "lucide-react";
import { io, Socket } from "socket.io-client";
import type { Smartphone, SmartphoneCommentType, SortOrderType } from "~/types/globals.type";
import { useUser } from "~/context/userContext";
import { nanoid } from "nanoid"
import { usePopupButton } from "~/context/popupButtonContext";
import { convertToTimeAgo } from "~/utils/formatDate";
import { useFetcher, useNavigate } from "react-router";
import { Spinner } from "./spinner";
import commentService from "~/services/comment.service";
import { getRoleColor } from "~/utils/statusStyle";
import { getRole } from "~/utils/role";
import { hasPermission } from "~/utils/permissions";
import { getSortQuery } from "~/utils/getSortQuery";

type CommentsSectionProps = {
  smartphoneId: Smartphone["_id"]
}

type CommentsType = Omit<SmartphoneCommentType, "deviceId" | "updatedAt">

const take = 5

export default function CommentsSection({ smartphoneId }: CommentsSectionProps) {
  const fetcher = useFetcher()
  const { user } = useUser()
  const [sortOrder, setSortOrder] = useState<SortOrderType>("mostLiked");
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [commentText, setCommentText] = useState("");
  const [ newSocket, setNewSocket ] = useState<Socket| null>(null)
  const { setPopupButton } = usePopupButton()
  const initialComments = fetcher.data as CommentsType[]
  const [ comments, setComments ] = useState<CommentsType[]>([])
  const [ commentId, setCommentId ] = useState<string | null>(null)
  const [ skip, setSkip ] = useState(5)

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
      setComments((prev) => [newComment, ...prev])
    })

    return () => {
      socket.disconnect();
    }

  }, [])

  // fetch initial comments data on mount
  useEffect(() => {
    const { orderBy, sortDirection } = getSortQuery(sortOrder)
      fetcher.submit(
      {
        initialCommentsData: JSON.stringify({
          smartphoneId: smartphoneId,
          skip: 0,
          take: 5,
          orderBy,
          sortDirection,
        }),
      },
      { method: "post" }
    )
  }, [sortOrder]) // refetch new data if sort is changed

  useEffect(() => {
    if (!initialComments) return
    
    if (skip === 5) {
      setComments(initialComments)
    } else {
      setComments(prev => [...prev, ...initialComments]);
    }
  }, [initialComments, sortOrder])
  
  const handleTextarea = () => {
    if(!user || !user.id) {
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: true,
      }))
    }
  } 

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!commentText.trim() || !user?.id) return
      const newComment: SmartphoneCommentType = {
        id: nanoid(),
        name: user.name,
        userId: user.id,
        message: commentText,
        createdAt: new Date(),
        likes: 0,
        dislikes: 0,
        isDeleted: false, 
        user: {
          name: user.name,
          role: user.role
        }
      }
      setComments((prev) => [newComment, ...prev])
      newSocket?.emit("add-comment", newComment, smartphoneId)
      setCommentText("")
    }
  }

  const handleViewMore = () => {
    setSkip(prev => prev + take)
    const { orderBy, sortDirection  } = getSortQuery(sortOrder)
    fetcher.submit(
      { viewMoreCommentsData: JSON.stringify({ smartphoneId, skip, take, orderBy, sortDirection })},
      { 
        method: "post",
      }
    )
  }
    
  const handleLike = async (id: string) => {
    if(!user || !user.id) {
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: true,
      }))
      return
    }
    setComments(prev =>
      prev.map(comment =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    )
    await commentService.addLikeToComment(id)
  }

  const handleDislike = async (id: string) => {
    if(!user || !user.id) {
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: true,
      }))
      return
    }
    setComments(prev =>
      prev.map(comment =>
        comment.id === id ? { ...comment, likes: comment.likes - 1 } : comment
      )
    )
    await commentService.dislikeToComment(id)
  }
  
  const handleCommentSettings = (id: string) => {
    if(!user || !user.id) {
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: true,
      }))
      return
    }
    if(id === commentId) {
      setCommentId(null)
    } else {
      setCommentId(id)
    }
  }
  
  // const handleEdit = () => {
  //   setComments(prev =>
  //     prev.map(comment =>
  //       comment.id === commentId ? { ...comment, likes: comment.likes - 1 } : comment
  //     )
  //   )
  // }
  
  const handleDelete = async () => {
    // show login modal if there no user
    if(!user || !user.id) {
      setPopupButton(prevState => ({
        ...prevState,
        isLoginClicked: true,
      }))
      return
    }

    // remove comment in client
    setComments(prev =>
      prev.map(comment =>
        comment.id === commentId ? { ...comment, isDeleted: true } : comment
      )
    )

    setComments(prev => prev.filter(comment => !(comment.id === commentId && comment.isDeleted)))

    // update deleted comment in server
    if(commentId) {
      await commentService.deleteComment(commentId)
    }
  } 
  
  return (
    <div className="p-3 border-1 shadow-lg rounded-md max-w-full mt-10 mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
        <h2 className="text-xl font-bold">Comments</h2>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 text-sm hover:text-gray-600 cursor-pointer"
          >
            Sort by <ChevronDown size={14} />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-700 rounded-md shadow-lg overflow-hidden">
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  setSortOrder("mostLiked");
                  setSkip(5);
                  setDropdownOpen(false);
                }}
              >
                Most Liked {sortOrder === "mostLiked" && <Check size={14} />}
              </button>
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  setSortOrder("newest");
                  setSkip(5);
                  setDropdownOpen(false);
                }}
              >
                Newest {sortOrder === "newest" && <Check size={14} />}
              </button>
              <button
                className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                onClick={() => {
                  setSortOrder("oldest");
                  setSkip(5);
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
        className="rounded-md mb-4"
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
        {comments?.map((c) => (
          <div key={c.id} className="flex items-start gap-3">
            <img src="/userIcon.svg" alt="avatar" className="w-10 h-10 rounded-full" />
            <div className="flex-1">
              {/* User Info */}
              <div className="relative flex items-center gap-2 flex-wrap">
                <span className="font-semibold">{c.user?.name}</span> 
                {c.user?.role !== "USER" && (
                  <div className={`relative flex items-center text-[0.6rem] p-[0.1rem] rounded-sm font-bold ${getRoleColor(c.user?.role)}`}>
                    <span>{getRole(c.user?.role)?.toUpperCase()}</span>
                    <BadgeCheck size={12} className="text-red-900" />
                  </div>
                )}
                <span className="text-xs text-gray-400">{convertToTimeAgo(c.createdAt)}</span>
              </div>

              {/* Comment */}
              <p className="mt-1 text-sm">{c.message}</p>

              {/* Actions */}
              <div className="flex items-center gap-4 mt-2 text-gray-400 text-sm">
                <div className="flex items-center justify-center gap-3">
                  <button 
                    className="flex items-center gap-1 hover:text-black cursor-pointer"
                    onClick={() => handleLike(c.id)}
                  >
                    <ThumbsUp size={14} /> {c.likes}
                  </button>
                  <button 
                    className="flex items-center gap-1 hover:text-black cursor-pointer"
                    onClick={() => handleDislike(c.id)}
                  >
                    <ThumbsDown size={14} /> {c.dislikes}
                  </button>
                </div>
                {
                  // show comment settings if there is a user and userId is equal to commenter userId and user has role that can delete or admin permission 
                  (
                    hasPermission(user?.role, "delete_own_comments") && user?.id === c.userId || 
                    hasPermission(user?.role, "delete_all_comments")
                  )
                  &&  
                    <div className={`relative hover:text-black ${commentId === c.id && "text-black"} cursor-pointer`}>
                      <button 
                        onClick={() => handleCommentSettings(c.id)}
                      >
                        <MoreHorizontal className="cursor-pointer" size={14} />
                      </button>

                      {commentId === c.id && (
                        <div className="absolute left-0 w-40 bg-white z-20 border border-gray-700 rounded-md shadow-lg overflow-hidden">
                          {/* <button
                            className="flex items-center justify-between w-full px-3 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                            onClick={handleEdit}  
                          >
                            Edit  
                          </button> */}
                          <button
                            className="flex items-center justify-between text-black w-full px-3 py-2 text-sm hover:bg-gray-300 cursor-pointer"
                            onClick={handleDelete}  
                          >
                            Delete 
                          </button>
                        </div>
                      )}
                    </div>
                }
              </div>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="flex items-center text-sm mt-4 cursor-pointer hover:underline underline-offset-2"
        disabled={fetcher.state === "submitting"}
        onClick={handleViewMore}
      >
        <ChevronDown size={20} /> View More 
        {fetcher.state === "loading" && <Spinner parentClassName="ml-2" spinSize="h-4" />}
      </button>
    </div>
  )
}
