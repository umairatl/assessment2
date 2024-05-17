import App from "next/app";
import { createEmotionSsrAdvancedApproach } from "tss-react/next/pagesDir";

const { augmentDocumentWithEmotionCache, withAppEmotionCache } =
  createEmotionSsrAdvancedApproach({ key: "css" });

export { augmentDocumentWithEmotionCache };

export default withAppEmotionCache(App);
