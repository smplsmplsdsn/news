/**
 * データ＋コーディングデータ反映(カスタマイズ用)
 *
 * ATTENTION テキストは改行コードを<br>タグに置き換えています
 *
 * @param (string) data
 * @param (string) text
 */
const setNews = (date, text) => {
  return `

<dt>${date}</dt>
<dd>${text}</dd>

`
}
