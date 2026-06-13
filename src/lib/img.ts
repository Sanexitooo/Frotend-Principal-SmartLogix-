import type { ImgHTMLAttributes } from "react";

const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%231A1A1A'%3E%3Crect width='400' height='400'/%3E%3Ctext x='200' y='200' text-anchor='middle' fill='%23666' font-size='14'%3ESin imagen%3C/text%3E%3C/svg%3E";

export function imgOnError(e: React.SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.src !== FALLBACK_SRC) {
    img.src = FALLBACK_SRC;
  }
}

export function safeImgProps(
  props: ImgHTMLAttributes<HTMLImageElement>
): ImgHTMLAttributes<HTMLImageElement> {
  return { ...props, onError: imgOnError };
}
