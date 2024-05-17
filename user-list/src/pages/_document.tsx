import Document, { Html, Head, Main, NextScript } from "next/document";
import { augmentDocumentWithEmotionCache } from "./_app";

augmentDocumentWithEmotionCache(Document);

class CustomDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body style={{ margin: 0 }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
