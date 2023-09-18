import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

export const tenants = [
  {
    hostname: "frontend.staging.novalearn.org",
    id: "nova-learn",
    name: "Novalearn",
    logo: {
      png: "/images/tenants/novalearn/logo.png",
      svg: "/images/tenants/novalearn/logo.svg",
      placehold: "/images/tenants/novalearn/placehold.png",
      landing: "/images/tenants/novalearn/landing_logo.png",
      white: "/images/tenants/novalearn/landing_logo_white.png",
    },
    courseCategories: ["ALL"],
    courseDisplayVideo: true,
    removeCourses: false,
    landing: {
      preview: true,
      unique: true,
      endorsement: true,
      faq: true,
      signupImage: "/images/landing/multidevice.webp",
      bottomHighlights: true,
      heroTitle: "After-School Learning",
      heroSubtitle:
        "Support your kids' extracurricular learning through optimised and gamified edutainment",
      heroImages: [
        "/images/landing/hero-navigation/1.webp",
        "/images/landing/hero-navigation/2.webp",
        "/images/landing/hero-navigation/3.webp",
      ],
      previewSection: {
        url: "https://youtu.be/h3QMI3bmzxY",
        description:
          "After-school learning is all about keeping kids engaged through subjects they find interesting. At Novalearn, we provide a broad spectrum of STEAM learning courses online so every kid can easily find what piques their interest. Being in the driver's seat of their education makes them more likely to remain engaged.",
      },
    },
    backgroundClasses: {
      navbar: "text-white",
      hero: "bg-landing-gradient",
      courseHighlights: "bg-space",
      footer: "bg-footer -mt-60 ",
      overlay: "bg-dark-overlay bg-opacity-10",
      loginButtons: "transparent",
      passcode: "",
      passcodeColor: "white",
      passcodeButton: "",
      courseHighlightPaddingTop: "mt-60",
      footerPaddingTop: "pt-60",
      coursesDarkBackground: true,
    },
    email: "hello@novalearn.org",
    address: "Unit 3, 16/F, W50, 50, Wong Chuk Hang Road, Wong Chuk Hang",
  },
  {
    hostname: "prister.staging.novalearn.org",
    id: "prister",
    name: "PRISTER Academy",
    logo: {
      png: "/images/tenants/mindworks/logo.png",
      svg: "/images/tenants/mindworks/logo.png",
      placehold: "/images/tenants/mindworks/logo.png",
      landing: "/images/tenants/mindworks/logo.png",
      white: "/images/tenants/mindworks/logo.png",
    },
    courseCategories: ["ART", "TECH", "TECHNOLOGY"],
    courseCategoriesReplacment: {
      TECH: { name: "Marty", img: "/images/course/marty.webp" },
      TECHNOLOGY: { name: "Marty", img: "/images/course/marty.webp" },
      ART: { name: "Cubico", img: "/images/course/cubico.webp" },
    },
    removeCourses: true,
    courseDisplayVideo: false,
    landing: {
      preview: false,
      unique: false,
      endorsement: false,
      courseImage: "/images/course/marty.webp",
      faq: false,
      signupImage: "/images/landing/signup-prister.webp",
      bottomHighlights: false,
      heroTitle: "STEM Education",
      heroSubtitle:
        "Creating new tools, driving new direction for STEM teaching.",
      heroImages: [
        "/images/landing/hero-navigation/prister-1.webp",
        "/images/landing/hero-navigation/prister-2.webp",
        "/images/landing/hero-navigation/prister-3.webp",
        "/images/landing/hero-navigation/prister-4.webp",
        "/images/landing/hero-navigation/prister-5.webp",
      ],
      previewSection: {
        url: "https://youtu.be/-W_npvESh1w",
        description:
          "Prister strives to promote the development of STEM education in Hong Kong that should be highly valued by encouraging growth and development of kids that are highly creative in areas outside the formal education.",
      },
    },
    backgroundClasses: {
      navbar: "text-black",
      hero: "bg-white text-black",
      courseHighlights: "bg-[#fae674]",
      footer: "bg-[#fae674] text-black fill-black",
      overlay: "bg-transparent",
      loginButtons: "gray",
      passcode: "bg-[#4f8ec9] border-b-transparent",
      passcodeColor: "blue",
      passcodeButton: "bg-[#fedc1d] border-b-transparent",
      courseHighlightPaddingTop: "",
      footerPaddingTop: "",
      coursesDarkBackground: false,
    },
    email: "info@prister.net",
    address: "Ngau Tau Kok, Hoi Bun Rd, 133號, Mg Tower Podium, 16 樓G 室",
  },
];

export const getTenant = (host?: string): typeof tenants[0] => {
  //TODO : requires change
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";

  const tenantENV = process.env.NEXT_PUBLIC_TENANT;
  console.log(`tenant`, tenantENV, hostname);

  // ENV get's replaced to it's build's env at build time
  // const tenant = tenants.find(
  //   (tenant) => tenant.id == process.env.NEXT_PUBLIC_TENANT,
  // );
  const tenant = tenants.find((tenant) => tenant.hostname == host);
  if (!tenant) {
    return tenants[0];
  }
  return tenant;
};

export type Props = {
  hostname?: string;
};
/**
 * should export this funtion as getServerSideProps, only works in pages folder
 */
export function extractHostname(
  ctx: GetServerSidePropsContext,
): GetServerSidePropsResult<Props> {
  return {
    props: {
      hostname: ctx.req.headers.host,
    },
  };
}
