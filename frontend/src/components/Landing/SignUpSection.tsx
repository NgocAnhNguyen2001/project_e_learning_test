import Image from "next/image";
import Link from "next/link";
import React from "react";

import Section from "../Elements/Section";

interface ISignUpSection {
  memoTenant: string;
  memoTenantSignupImage: string;
}

export const SignUpSection = ({
  memoTenant,
  memoTenantSignupImage,
}: ISignUpSection): React.ReactElement => {
  return (
    <div className="relative z-10 mt-60">
      <Section size="2xl" padding="sm" className="relative z-10">
        <Link href="/adult/auth/signup">
          <div className="flex flex-col md:flex-row space-x-5 space-y-10 items-center cursor-pointer">
            <div className="relative w-full md:w-1/2 h-96">
              <Image
                layout="fill"
                objectFit="contain"
                src={memoTenantSignupImage}
                alt=""
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-5xl font-black text-[#8027AA] cursor-pointer hover:text-[#a55dc7]">
                SIGN UP NOW
              </p>
              <p className="text-4xl font-extrabold text-[#9E34CD]">
                and get started on your {memoTenant} journey!
              </p>
              <p className="text-lg font-bold text-[#333333] mt-2">
                Available on all browsers
              </p>
            </div>
          </div>
        </Link>
      </Section>
    </div>
  );
};
