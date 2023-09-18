import { useRouter } from "next/router";
import Head from "next/head";
import React from "react";
import { toast } from "react-toastify";

import { Feedback } from "@/components/Feedback";
import { AppLayout } from "@/components/Layout";
import EditChildForm from "@/components/Parent/Child/EditChildForm";
import { extractHostname, Props, getTenant } from "@/utils/tenant";
import {
  UpdateChildDetailsInput,
  useChildLazyQuery,
  useRemoveChildMutation,
  useUpdateChildMutation,
} from "schema/generated/graphql";
import { withApollo } from "utils/hooks/withApollo";
import withAuthenticated from "utils/hooks/withAuthenticated";
export const getServerSideProps = extractHostname;

const EditChildren = ({ hostname }: Props): React.ReactElement => {
  // ============VIEWS
  const router = useRouter();

  const [getChild, childResponse] = useChildLazyQuery();
  const [updateChild] = useUpdateChildMutation();
  const [removeChild] = useRemoveChildMutation();

  // ============EFFECTS
  React.useEffect(() => {
    const getChildData = async (): Promise<void> => {
      await getChild({
        variables: {
          id: router.query.childId as string,
        },
      });
    };

    if (router.query && router.query.childId) {
      getChildData();
    }
  }, [router, getChild]);

  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  // ============FUNCTIONS
  const childSubmit = async (data: UpdateChildDetailsInput): Promise<void> => {
    try {
      await updateChild({
        variables: {
          data: {
            loginPattern: data.loginPattern,
            firstName: data.firstName,
            lastName: data.lastName,
            username: data.username,
            birthDate: data.birthDate,
          },
          id: childResponse.data?.child.id as string,
        },
      });
      router.back();
    } catch (e: any) {
      if (e.graphQLErrors[0].message.includes("already used")) {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Username already in use"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      } else {
        toast(
          <Feedback
            title="There's an error!"
            subtitle="Something went wrong"
            type="error"
            disableFeedback={true}
          />,
          {
            progress: undefined,
            toastId: 1,
            autoClose: 3000,
          },
        );
      }
    }
  };

  const childDelete = async (): Promise<void> => {
    try {
      await removeChild({
        variables: {
          id: childResponse.data?.child.id as string,
        },
      });

      router.back();
    } catch {
      toast(
        <Feedback
          title="There's an error!"
          subtitle="Something went wrong"
          type="error"
          disableFeedback={true}
        />,
        {
          progress: undefined,
          toastId: 1,
          autoClose: 3000,
        },
      );
    }
  };

  // ============VIEWS
  return (
    <AppLayout hostname={hostname}>
      <Head>
        <title>{memoTenant}</title>
      </Head>
      <div className="relative min-h-screen bg-fixed bg-bottom bg-no-repeat bg-cover bg-dashboard-light">
        <div className="absolute top-0 left-0 z-0 w-full h-full bg-white bg-opacity-90" />
        <div className="relative z-10 py-24 lg:py-32">
          <div className="container px-6 mx-auto lg:px-8">
            {childResponse && childResponse.data?.child ? (
              <EditChildForm
                onSubmit={childSubmit}
                onDelete={childDelete}
                child={childResponse.data.child as any}
              />
            ) : null}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default withAuthenticated(withApollo(EditChildren));
