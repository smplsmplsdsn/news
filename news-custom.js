/**
 * データ＋コーディングデータ反映(カスタマイズ用)
 *
 * ATTENTION テキストは改行コードを<br>タグに置き換えています
 *
 * @param (array) data 保存したお知らせ情報(日付とテキスト)のデータ
 */
const setNews = (data = []) => {
  let html = '',
      i

  for (i in data) {
    if (data[i].date) {

      // 自由にコーディング
      html += `
<dt>${data[i].date}</dt>
<dd>${data[i].text.replace(/\r?\n/g, '<br>')}</dd>
`
    }
  }

  // データをセットして表示・非表示にする
  const _news = document.getElementsByClassName('js-news-view')[0],
        _data = document.getElementsByClassName('js-news-data')[0]

  _news.style.display = (html != '')? 'block': 'none'
  _data.innerHTML = html
}