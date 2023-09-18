import autoAnimate from "@formkit/auto-animate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import Comment from "@/components/Clubs/Comment";
import ReplyField from "@/components/Clubs/ReplyField";
import DividerWithObject from "@/components/Elements/DividerWithObject/DividerWithObject";
import { Feedback } from "@/components/Feedback";
import { ForumLayout } from "@/components/Layout";
import {
  SortOrder,
  useFindUniquePostQuery,
  useFindAllPostLazyQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useReactPostMutation,
  namedOperations,
  useReportPostMutation,
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

const ReplyDetails = ({ hostname }: Props): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const user = useStore((state) => state.user);

  const router = useRouter();

  const id = router.query.id as string;

  const containerRef = React.useRef(null);

  const { data: commentData } = useFindUniquePostQuery({
    variables: {
      where: {
        id,
      },
    },
  });

  const { data: bookmarks } = useFindManyBookmarksQuery({
    variables: {
      where: {
        userId: { equals: user?.id },
      },
    },
  });

  const [fetchSubcomments, { data: subcommentData }] =
    useFindAllPostLazyQuery();

  const subcommentQuery = {
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
    fetchSubcomments({
      variables: { ...subcommentQuery },
    });
  }, [commentData?.findOnePosts.id]);

  React.useEffect(() => {
    containerRef.current && autoAnimate(containerRef.current);
  }, [containerRef]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  const [createSubcomment] = useCreatePostMutation();

  const [editSubcomment] = useUpdatePostMutation();

  const [deleteSubcomment] = useDeletePostMutation();

  const [reactSubcomment] = useReactPostMutation();

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
    if (commentData) {
      await createSubcomment({
        variables: {
          text: data.text,
          parentPostId: id,
          categoryId: commentData?.findOnePosts.category.id,
        },
        onCompleted: () => {
          reset();
        },
        refetchQueries: [namedOperations.Query.findAllPost],
      }).catch((err) => err);
    }
  };

  const handleEditComment = (commentId: string, text: string): void => {
    editSubcomment({
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
    deleteSubcomment({
      variables: {
        id: commentId,
      },
      refetchQueries: [namedOperations.Query.findAllPost],
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

  const handleReactComment = (id: string, emoji: ReactionEmojies): void => {
    reactSubcomment({
      variables: {
        data: {
          postId: id,
          emoji,
        },
      },
      refetchQueries: [namedOperations.Query.findAllPost],
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
        {commentData && (
          <Comment
            text={commentData?.findOnePosts.text}
            bookmark={
              bookmarks?.findManyBookmarks.find(
                (bookmark) => bookmark.postId == commentData.findOnePosts.id,
              ) as ForumPostBookmark
            }
            username={commentData?.findOnePosts.user.firstName}
            commentUserId={commentData?.findOnePosts.user.id}
            avatarImage={
              commentData?.findOnePosts.user.student?.avatarImage?.url
            }
            createdAt={commentData?.findOnePosts.createdAt}
            id={commentData?.findOnePosts.id}
            isSubcomment={false}
            reactionCount={commentData?.findOnePosts.ForumReaction}
            editComment={handleEditComment}
            deleteComment={handleDeleteComment}
            reactComment={handleReactComment}
            reportComment={handleReportComment}
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
            parentPostId={commentData?.findOnePosts.parentPost?.id}
            placeholder="Leave your reply..."
            replyMessage={commentData?.findOnePosts.text}
            replyUser={commentData?.findOnePosts.user.firstName}
            replyUserId={commentData?.findOnePosts.user.id}
            isSubcomment
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
          {subcommentData &&
            subcommentData.findManyPostsAndReactions.map((comment) => {
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

export default withAuthenticated(withApollo(ReplyDetails));

export const getServerSideProps = extractHostname;
