// Vurgu başlığı: { pre, em, post } — `em` serif italik render edilir.
// İki dilde farklı kelime uzunlukları için doğal sarma yapar (sabit <br> yok).
type Parts = { pre: string; em: string; post: string };

export function Emphasis({ parts }: { parts: Parts }) {
  return (
    <>
      {parts.pre}{" "}
      <span className="font-serif italic font-medium">{parts.em}</span>
      {parts.post ? <> {parts.post}</> : null}
    </>
  );
}
