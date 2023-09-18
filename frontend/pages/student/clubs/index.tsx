import { zodResolver } from "@hookform/resolvers/zod";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import PostCollection from "@/components/Clubs/PostCollection";
import ReplyField from "@/components/Clubs/ReplyField";
import { Feedback } from "@/components/Feedback";
import { ForumLayout } from "@/components/Layout";
import {
  useFindAllPostLazyQuery,
  useCreatePostMutation,
  SortOrder,
  useUpdatePostMutation,
  useDeletePostMutation,
  useReactPostMutation,
  namedOperations,
  useReportPostMutation,
  ReactionEmojies,
  useCreateOneBookmarkMutation,
  useFindManyBookmarksQuery,
  useDeleteOneBookmarkMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
import { useStore } from "utils/hooks/zustand";
import { extractHostname, getTenant, Props } from "@/utils/tenant";

const StudentClubs = ({ hostname }: Props): React.ReactElement => {
  const [selectedCategory, setSelectedCategory] = React.useState({
    label: "",
    id: "",
  });

  const user = useStore((state) => state.user);

  const { data: bookmarks } = useFindManyBookmarksQuery({
    variables: {
      where: {
        userId: { equals: user?.id },
      },
    },
  });
  const [fetchPost, { data: posts }] = useFindAllPostLazyQuery();

  React.useEffect(() => {
    if (selectedCategory.label == "Popular Topics")
      fetchPost({
        variables: {
          where: {
            deleted: {
              equals: null,
            },
          },
          orderBy: [
            { commentCount: SortOrder.Desc },
            { UserForumReaction: { _count: SortOrder.Desc } },
          ],
          take: 10,
        },
      });
    else if (selectedCategory.label == "Your Topics")
      fetchPost({
        variables: {
          orderBy: [
            { commentCount: SortOrder.Asc },
            { UserForumReaction: { _count: SortOrder.Asc } },
          ],
          where: {
            userId: { equals: user?.id },
            deleted: {
              equals: null,
            },
          },
          take: 30,
        },
      });
    else if (selectedCategory.label == "Replies received")
      fetchPost({
        variables: {
          where: {
            parentPost: {
              is: {
                userId: {
                  equals: user?.id,
                },
              },
            },
            deleted: {
              equals: null,
            },
          },
          take: 30,
        },
      });
    else if (selectedCategory.label == "Bookmarks")
      fetchPost({
        variables: {
          where: {
            bookmarks: {
              some: {
                userId: {
                  equals: user?.id,
                },
              },
            },
            deleted: {
              equals: null,
            },
          },
          take: 30,
        },
      });
    else
      fetchPost({
        variables: {
          where: {
            category: {
              is: {
                name: {
                  equals: selectedCategory.label,
                },
              },
            },
            parentPostId: {
              equals: null,
            },
            deleted: {
              equals: null,
            },
          },
          orderBy: {
            createdAt: SortOrder.Desc,
          },
          take: 30,
        },
      });
  }, [selectedCategory, fetchPost]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  const [createPost] = useCreatePostMutation();

  const [editPost] = useUpdatePostMutation();

  const [deletePost] = useDeletePostMutation();

  const [reactPost] = useReactPostMutation();

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

  const onSubmit = async (data: any): Promise<void> => {
    await createPost({
      variables: {
        text: data.text,
        categoryId: selectedCategory.id,
      },
      onCompleted: () => {
        reset();
      },
      refetchQueries: [namedOperations.Query.findAllPost],
    }).catch((err) => err);
  };

  const handleEditPost = (id: string, text: string): void => {
    editPost({
      variables: {
        data: {
          text,
        },
        id,
      },
      refetchQueries: [namedOperations.Query.findAllPost],
    });
  };

  const handleDeletePost = (id: string): void => {
    deletePost({
      variables: {
        id,
      },
      refetchQueries: [namedOperations.Query.findAllPost],
    });
  };

  const handleReactPost = (id: string, emoji: ReactionEmojies): void => {
    reactPost({
      variables: {
        data: {
          postId: id,
          emoji,
        },
      },
      refetchQueries: [namedOperations.Query.findAllPost],
    });
  };

  const handleReportPost = (commentId: string): void => {
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
        {selectedCategory?.id && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <ReplyField
              avatarImage={
                user?.student?.avatarImage?.url
                  ? user?.student.avatarImage.url
                  : "/images/common/default.png"
              }
              placeholder="What's on your mind today?"
              registration={{ ...register("text") }}
            />
          </form>
        )}
        <PostCollection
          posts={posts}
          bookmarks={bookmarks}
          selectedCategory={selectedCategory}
          editPost={handleEditPost}
          deletePost={handleDeletePost}
          reactPost={handleReactPost}
          reportPost={handleReportPost}
          createBookmark={handleCreateBookmark}
          deleteBookmark={handleDeleteBookmark}
          setSelectedCategory={setSelectedCategory}
        />
      </>
    </ForumLayout>
  );
};

// StudentClubs.getLayout = function getLayout(
//   page: React.ReactElement,
// ): React.ReactElement {
//   console.log("hi");
//   return <ForumLayout>{page}</ForumLayout>;
// };

export default withAuthenticated(withApollo(StudentClubs));

export const getServerSideProps = extractHostname;
