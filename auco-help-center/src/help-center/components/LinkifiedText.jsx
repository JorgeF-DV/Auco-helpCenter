const URL_REGEX = /(https?:\/\/[\S]+|www\.[\S]+)/gi;
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

export default function LinkifiedText({ text, linkStyle }) {
  if (!text) {
    return null;
  }

  const parts = String(text).split(URL_REGEX);

  return parts.map((part, index) => {
    if (!part) {
      return null;
    }

    if (!part.match(URL_REGEX)) {
      return <span key={`text-${index}`}>{part}</span>;
    }

    const { cleanUrl, trailingText } = splitTrailingPunctuation(part);

    if (!cleanUrl) {
      return <span key={`text-${index}`}>{part}</span>;
    }

    return (
      <span key={`url-${index}`}>
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
