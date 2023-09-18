/*eslint linebreak-style: ["error", "windows"]*/
export const getCategoryImages = (category?: string): string => {
  if (category) {
    switch (category) {
      case "Technology":
        return "/images/common/credit_cards.png";
      case "Finance":
        return "/images/common/credit_cards.png";
      case "Arts & Craft":
        return "/images/common/art.png";
      case "Engineering":
        return "/images/common/art.png";
      default:
        return "/images/common/art.png";
    }
  }
  return "/images/common/art.png";
};
