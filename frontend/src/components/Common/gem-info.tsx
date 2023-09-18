import React from "react";

import { getTenant, Props } from "@/utils/tenant";

const GemInfo = ({ hostname }: Props): React.ReactElement => {
  const memoTenant = React.useMemo(() => {
    return getTenant(hostname).name;
  }, [hostname]);

  return (
    <div className="text-white">
      <div className="flex items-center space-x-2">
        <p>What is a Novagem?</p>
        <img src="/images/common/gem.svg" alt="" className="w-6" />
      </div>
      <p className="py-4 opacity-80">
        A Novagem is the {memoTenant} digital currency used to reward students.
        They can be used to:
      </p>
      <table className="table-auto">
        <tbody>
          <tr>
            <td className="pr-6">Buy Avatar Items</td>
            <td className="opacity-80">
              Your children can customize their avatar by using the avatar items
              bought in the avatar store
            </td>
          </tr>
          <tr>
            <td className="pr-6">Usage 2</td>
            <td className="opacity-80">Description of usage</td>
          </tr>
          <tr>
            <td className="pr-6">Usage 3</td>
            <td className="opacity-80">Description of usage</td>
          </tr>
          <tr>
            <td className="pr-6">Usage 4</td>
            <td className="opacity-80">Description of usage</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GemInfo;
