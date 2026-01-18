import Image from "next/image";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

interface BlockRendererProps {
  block: BlockObjectResponse;
}

interface RichTextItem {
  plain_text: string;
}

/**
 * Rich text 배열을 일반 텍스트로 변환하는 헬퍼 함수
 */
function renderRichText(richTextArray: RichTextItem[]): string {
  return richTextArray.map((text) => text.plain_text).join("");
}

/**
 * Notion 블록을 React 요소로 렌더링
 */
export default function BlockRenderer({ block }: BlockRendererProps) {
  if (block.type === "paragraph") {
    const paragraph = block.paragraph;
    const text = renderRichText(paragraph?.rich_text || []);
    return (
      <p className="text-base leading-relaxed mb-4">
        {text || (
          <span className="text-muted-foreground italic">[빈 문단]</span>
        )}
      </p>
    );
  }

  if (block.type === "heading_1") {
    const heading = block.heading_1;
    const text = renderRichText(heading?.rich_text || []);
    return <h1 className="text-3xl font-bold mb-4 mt-6">{text}</h1>;
  }

  if (block.type === "heading_2") {
    const heading = block.heading_2;
    const text = renderRichText(heading?.rich_text || []);
    return <h2 className="text-2xl font-bold mb-3 mt-5">{text}</h2>;
  }

  if (block.type === "heading_3") {
    const heading = block.heading_3;
    const text = renderRichText(heading?.rich_text || []);
    return <h3 className="text-xl font-bold mb-3 mt-4">{text}</h3>;
  }

  if (block.type === "bulleted_list_item") {
    const listItem = block.bulleted_list_item;
    const text = renderRichText(listItem?.rich_text || []);
    return (
      <ul className="list-disc list-inside mb-2 ml-4">
        <li className="text-base">{text}</li>
      </ul>
    );
  }

  if (block.type === "numbered_list_item") {
    const listItem = block.numbered_list_item;
    const text = renderRichText(listItem?.rich_text || []);
    return (
      <ol className="list-decimal list-inside mb-2 ml-4">
        <li className="text-base">{text}</li>
      </ol>
    );
  }

  if (block.type === "code") {
    const code = block.code;
    const text = renderRichText(code?.rich_text || []);
    return (
      <pre className="bg-muted p-4 rounded-lg mb-4 overflow-x-auto">
        <code className="text-sm font-mono">{text}</code>
      </pre>
    );
  }

  if (block.type === "divider") {
    return <hr className="my-6 border-t" />;
  }

  if (block.type === "image") {
    const image = block.image;
    let imageUrl = "";
    let caption = "";

    if (image?.type === "external") {
      imageUrl = image.external?.url || "";
    } else if (image?.type === "file") {
      imageUrl = image.file?.url || "";
    }

    if (image?.caption && image.caption.length > 0) {
      caption = renderRichText(image.caption);
    }

    if (!imageUrl) {
      return (
        <div className="bg-muted p-4 rounded-lg mb-4 text-muted-foreground">
          [이미지 없음]
        </div>
      );
    }

    return (
      <figure className="mb-4">
        <div className="relative w-full h-96">
          <Image
            src={imageUrl}
            alt={caption || "이미지"}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            priority={false}
          />
        </div>
        {caption && (
          <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  }

  if (block.type === "callout") {
    const callout = block.callout;
    const text = renderRichText(callout?.rich_text || []);
    return (
      <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg mb-4">
        <p className="text-base">{text}</p>
      </div>
    );
  }

  if (block.type === "quote") {
    const quote = block.quote;
    const text = renderRichText(quote?.rich_text || []);
    return (
      <blockquote className="border-l-4 border-muted-foreground pl-4 italic text-muted-foreground mb-4">
        {text}
      </blockquote>
    );
  }

  if (block.type === "toggle") {
    const toggle = block.toggle;
    const text = renderRichText(toggle?.rich_text || []);
    return (
      <details className="bg-muted rounded-lg p-3 mb-4 cursor-pointer">
        <summary className="font-semibold">{text}</summary>
        <div className="mt-3 ml-4">
          {/* 토글 내용은 추후 구현 */}
          <p className="text-sm text-muted-foreground italic">
            [토글 내용 렌더링은 추후 구현 예정]
          </p>
        </div>
      </details>
    );
  }

  // 미지원 블록 타입
  return (
    <div className="bg-muted/50 p-4 rounded-lg mb-4 text-muted-foreground text-sm">
      [지원하지 않는 블록 타입: {block.type}]
    </div>
  );
}
