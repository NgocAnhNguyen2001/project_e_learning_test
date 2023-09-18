import { default as NextHead } from "next/head";
import React from "react";

import { getTenant, Props } from "@/utils/tenant";

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({
  title = "",
  description = "",
  hostname,
}: HeadProps & Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <NextHead>
      <title>{title ? `${title} | ${memoTenant}` : undefined}</title>
      <meta name="description" content={description} />
    </NextHead>
  );
};
