import autoAnimate from "@formkit/auto-animate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import Comment from "@/components/Clubs/Comment";
import Post from "@/components/Clubs/Post";
import ReplyField from "@/components/Clubs/ReplyField";
import DividerWithObject from "@/components/Elements/DividerWithObject/DividerWithObject";
import { Feedback } from "@/components/Feedback";
import { ForumLayout } from "@/components/Layout";
import {
  SortOrder,
  useFindAllPostLazyQuery,
  useFindUniquePostQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useReactPostMutation,
  useReportPostMutation,
  namedOperations,
  ReactionEmojies,
  useCreateOneBookmarkMutation,
  useDeleteOneBookmarkMutation,
  useFindManyBookmarksQuery,
  ForumPostBookmark,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
import { extractHostname, getTenant, Props } from "@/utils/tenant";

const PostDetails = ({ hostname }: Props): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = React.useState({
    label: "",
    id: "",
  });

  const user = useStore((state) => state.user);

  const router = useRouter();

  const id = router.query.id as string;

  const containerRef = React.useRef(null);

  const { data: postData } = useFindUniquePostQuery({
    variables: {
      where: {
        id,
      },
    },
    onCompleted: (data) => {
      setSelectedCategory({
        ...data.findOnePosts.category,
        label: data.findOnePosts.category.name,
      });
    },
  });

  const { data: bookmarks } = useFindManyBookmarksQuery({
    variables: {
      where: {
        userId: { equals: user?.id },
      },
    },
  });

  const [fetchComments, { data: commentData }] = useFindAllPostLazyQuery();

  const commentQuery = {
    where: {
      parentPostId: {
        equals: id,
      },
      deleted: {
        equals: null,
      },
    },
    orderBy: {
      createdAt: SortOrder.Desc,
    },
  };

  React.useEffect(() => {
    fetchComments({
      variables: { ...commentQuery },
    });
  }, [postData]);

  React.useEffect(() => {
    containerRef.current && autoAnimate(containerRef.current);
  }, [containerRef]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  const [createComment] = useCreatePostMutation();

  const [editComment] = useUpdatePostMutation();

  const [deleteComment] = useDeletePostMutation();

  const [reactComment] = useReactPostMutation();

  const [createBookmark] = useCreateOneBookmarkMutation();

  const [deleteBookmark] = useDeleteOneBookmarkMutation();

  const [reportPost] = useReportPostMutation({
    onCompleted: () => {
      toast(
        <Feedback
          title="Reported"
          subtitle="Thanks for your feedback!"
          type="success"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    },
    onError: () => {
      toast(
        <Feedback
          title="Error"
          subtitle="Please try again!"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    },
  });

  const schema = z.object({
    text: z.string().min(1),
  });

  const { register, handleSubmit, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: { text: string }): Promise<void> => {
    if (postData?.findOnePosts.category.id)
      await createComment({
        variables: {
          text: data.text,
          parentPostId: id,
          categoryId: postData?.findOnePosts.category.id,
        },
        onCompleted: () => {
          reset();
        },
        refetchQueries: [namedOperations.Query.findAllPost],
      }).catch((err) => err);
  };

  const handleEditComment = (commentId: string, text: string): void => {
    editComment({
      variables: {
        data: {
          text,
        },
        id: commentId,
      },
      refetchQueries: [namedOperations.Query.findAllPost],
    });
  };

  const handleDeleteComment = (commentId: string): void => {
    deleteComment({
      variables: {
        id: commentId,
      },
      refetchQueries: [namedOperations.Query.findAllPost],
    });
    if (id == commentId) {
      router.push("/student/clubs");
    }
  };

  const handleReactComment = (id: string, emoji: ReactionEmojies): void => {
    reactComment({
      variables: {
        data: {
          postId: id,
          emoji,
        },
      },
      refetchQueries: [
        namedOperations.Query.findUniquePost,
        namedOperations.Query.findAllPost,
      ],
    });
  };

  const handleReportComment = (commentId: string): void => {
    if (user?.id)
      reportPost({
        variables: {
          data: {
            post: { connect: { id: commentId } },
            user: { connect: { id: user.id } },
          },
        },
      });
  };

  const handleCreateBookmark = (postId: string): void => {
    createBookmark({
      variables: {
        postId,
      },
      refetchQueries: [namedOperations.Query.findManyBookmarks],
    });
  };
  const handleDeleteBookmark = (id: string): void => {
    deleteBookmark({
      variables: {
        id,
      },
      refetchQueries: [namedOperations.Query.findManyBookmarks],
    });
  };

  return (
    <ForumLayout
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    >
      <>
        <Head>
          <title>{memoTenant}</title>
        </Head>
        {postData && (
          <Post
            id={postData.findOnePosts.id}
            bookmark={
              bookmarks?.findManyBookmarks.find(
                (bookmark) => bookmark.postId == postData?.findOnePosts.id,
              ) as ForumPostBookmark
            }
            text={postData.findOnePosts.text}
            username={postData.findOnePosts.user.firstName}
            postUserId={postData.findOnePosts.user.id}
            createdAt={postData.findOnePosts.createdAt}
            canReply={false}
            reactionCount={postData.findOnePosts.ForumReaction}
            editPost={handleEditComment}
            deletePost={handleDeleteComment}
            reactPost={handleReactComment}
            reportPost={handleReportComment}
            createBookmark={handleCreateBookmark}
            deleteBookmark={handleDeleteBookmark}
          />
        )}
        {/* Replies */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <ReplyField
            avatarImage={
              user?.student?.avatarImage?.url
                ? user?.student.avatarImage.url
                : "/images/common/default.png"
            }
            placeholder="Leave your reply..."
            registration={{ ...register("text") }}
          />
        </form>

        {/* All Replies */}
        <DividerWithObject>
          <span className="flex-shrink mx-4 text-white text-sm px-4 py-1">
            All Replies
          </span>
        </DividerWithObject>
        <div ref={containerRef} className="space-y-4">
          {commentData &&
            commentData.findManyPostsAndReactions.map((comment) => {
              return (
                <Comment
                  key={comment.post.id}
                  username={comment.post.user.firstName}
                  bookmark={
                    bookmarks?.findManyBookmarks.find(
                      (bookmark) => bookmark.postId == comment.post.id,
                    ) as ForumPostBookmark
                  }
                  commentUserId={comment.post.user.id}
                  avatarImage={comment.post.user.student?.avatarImage?.url}
                  text={comment.post.text}
                  createdAt={comment.post.createdAt}
                  isSubcomment={comment.post.isSubComment}
                  mainComment={comment.post.parentPost}
                  id={comment.post.id}
                  reactionCount={comment.post.ForumReaction}
                  editComment={handleEditComment}
                  deleteComment={handleDeleteComment}
                  reactComment={handleReactComment}
                  reportComment={handleReportComment}
                  createBookmark={handleCreateBookmark}
                  deleteBookmark={handleDeleteBookmark}
                />
              );
            })}
        </div>
        <DividerWithObject>
          <span className="flex-shrink mx-4 text-white text-sm mt-4 py-1">
            End of replies
          </span>
        </DividerWithObject>
      </>
    </ForumLayout>
  );
};

export default withAuthenticated(withApollo(PostDetails));

export const getServerSideProps = extractHostname;
