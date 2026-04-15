const URL_REGEX = /(https?:\/\/[\S]+|www\.[\S]+)/gi;
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\((https?:\/\/[\S]+|www\.[\S]+)\)/gi;
const TRAILING_PUNCTUATION_REGEX = /[).,!?:;]+$/;

function splitTrailingPunctuation(urlPart) {
  const trailingMatch = urlPart.match(TRAILING_PUNCTUATION_REGEX);

  if (!trailingMatch) {
    return { cleanUrl: urlPart, trailingText: "" };
  }

  const trailingText = trailingMatch[0];
  const cleanUrl = urlPart.slice(0, -trailingText.length);

  return { cleanUrl, trailingText };
}

function toHref(urlPart) {
  return urlPart.startsWith("http://") || urlPart.startsWith("https://")
    ? urlPart
    : `https://${urlPart}`;
}

function renderTextWithRawUrls(textPart, linkStyle, keyPrefix) {
  const parts = String(textPart).split(URL_REGEX);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    if (!part.match(URL_REGEX)) {
      return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
    }

    const { cleanUrl, trailingText } = splitTrailingPunctuation(part);

    if (!cleanUrl) {
      return <span key={`${keyPrefix}-text-${index}`}>{part}</span>;
    }

    return (
      <span key={`${keyPrefix}-url-${index}`}>
        <a
          href={toHref(cleanUrl)}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          {cleanUrl}
        </a>
        {trailingText}
      </span>
    );
  });
}

export default function LinkifiedText({ text, linkStyle }) {
  if (!text) {
    return null;
  }

  const input = String(text);
  const segments = [];
  let lastIndex = 0;
  let match;

  while ((match = MARKDOWN_LINK_REGEX.exec(input)) !== null) {
    const [fullMatch, label, url] = match;
    const start = match.index;

    if (start > lastIndex) {
      segments.push({ type: "text", value: input.slice(lastIndex, start) });
    }

    segments.push({ type: "link", label, url });
    lastIndex = start + fullMatch.length;
  }

  if (lastIndex < input.length) {
    segments.push({ type: "text", value: input.slice(lastIndex) });
  }

  if (segments.length === 0) {
    segments.push({ type: "text", value: input });
  }

  return segments.map((segment, index) => {
    if (segment.type === "link") {
      return (
        <a
          key={`md-link-${index}`}
          href={toHref(segment.url)}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          {segment.label}
        </a>
      );
    }

    return (
      <span key={`segment-${index}`}>
        {renderTextWithRawUrls(segment.value, linkStyle, `segment-${index}`)}
      </span>
    );
  });
}
