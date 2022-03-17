window.addEventListener('DOMContentLoaded', (event) => {
  
  // 別途、htmlファイルに「js-news」「js-news-edit-view」のCSSクラス名をセットする必要あり
  const _news = document.getElementsByClassName('js-news')[0]
  const _news_edit_view = document.getElementsByClassName('js-news-edit-view')[0]

  
  const _news_edit_setting = document.getElementsByClassName('js-news-edit-setting')[0]

  _news_edit_setting.innerHTML = `
<aside class="news-edit off js-news-edit">
<div class="news-edit__template js-news-template">
<div class="news-edit__unit js-news-unit">
  <div class="news-edit__delete"><a class="js-news-delete">削除</a></div>
  <div class="news-edit__form">
    <div class="news-edit__date"><input type="date"></div>
    <div class="news-edit__text"><textarea></textarea></div>
  </div>
</div>
</div>
<form class="js-news-form">
<div class="news-edit__list js-news-list"></div>
<p class="news-edit__add">
  <a class="js-news-add">追加する</a>
</p>
<div class="news-edit__nav">
  <a class="js-news-cancel">キャンセル</a>
  <div>
    <a class="js-news-reload off">再読み込み</a>
    <a class="js-news-save">保存する</a>
  </div>
</div>
</form>
</aside>
`
  
  const json = _news.getAttribute('data-json')


  // お知らせ編集エリア
  const _news_edit = _news_edit_setting.getElementsByClassName('js-news-edit')[0],
        _news_form = _news_edit_setting.getElementsByClassName('js-news-form')[0],
        _news_list = _news_edit_setting.getElementsByClassName('js-news-list')[0],
        _news_add = _news_edit_setting.getElementsByClassName('js-news-add')[0],
        _news_cancel = _news_edit_setting.getElementsByClassName('js-news-cancel')[0],
        _news_save = _news_edit_setting.getElementsByClassName('js-news-save')[0]
        _news_again = _news_edit_setting.getElementsByClassName('js-news-reload')[0]
  
  // コピー用要素
  const _news_template = _news_edit_setting.getElementsByClassName('js-news-template')[0],
        _news_template_unit = _news_template.getElementsByClassName('js-news-unit')[0]  
  
  let status_saving = 0;    // 0: 準備OK, 1: 通信中, 2: 処理完了直後
  
  /**
   * データを呼び出す
   *
   * @param (boolean) is_init
   */
  const loadNews = (is_init = false) => {
    
    fetch(json)
    .then(response => response.json())
    .then(data => {
      let i
      
      if (!is_init && _news_edit_view) {
        for (i in data) {          
          if (data[i].date && data[i].date != '') {
            addNewsRow(data[i])            
          }
        }        
      }
      
      if (setNews !== undefined) {
        setNews(data)
      }
    })
    .catch(error => {

      // TODO
      // エラーハンドリングがうまくできない..
      // _news_list.innerHTML = '読み込めませんでした。'
      // _news_save.classList.add('off')
      // _news_again.classList.remove('off')        
    });
    
    return false; 
  }
  

  /**
   * データを保存する
   */
  const saveNews = () => {
    
    const _news_unit = _news_list.getElementsByClassName('js-news-unit'),
          length_news_unit = _news_unit.length
    
    let data = [],
        i = 0,
        is_valid = true;

    if (status_saving === 2) {
      _news_save.innerHTML = '保存する'
      status_saving = 0
    } else {

      if (status_saving === 0) {
        status_saving = 1
        _news_save.innerHTML = '(保存中...)'

        if (length_news_unit > 0) {        

          // 値を確認する
          for (i = 0; i < length_news_unit; i++) {
            const tgt = _news_unit[i],
                  date = tgt.getElementsByTagName('input')[0].value,
                  text = tgt.getElementsByTagName('textarea')[0].value;

            // テキストが入力されているか判別する
            if (text.trim() != '') {          

              // 日付が入力されているか確認する
              if (date.trim() == '') {
                _news_save.innerHTML = '日付をセットしてください'
                status_saving = 2;
                is_valid = false;
                break;
              } else {
                data.push({
                  date: date,
                  text: text
                })
              }
            }
          }
        }
        
        // エラーがないか判別する
        if (is_valid) {

          // 通信する
          fetch(json, {
            method: 'POST',
            body: JSON.stringify({data: data})
          })
          .then(response => response.json())
          .then(data => {
            if (setNews !== undefined) {
              setNews(data)
            }
            _news_save.innerHTML = '保存する'
            status_saving = 0
            closeNewsEdit()
          })
          .catch(error => {
            _news_save.innerHTML = 'うまく機能していないところがあるようです'
            status_saving = 2
            setTimeout(() => {
              if (status_saving === 2) {
                _news_save.innerHTML = '保存する'
                status_saving = 0
              }
            }, 3000);
          });           
        }        
      }
    }
    return false; 
  }
  
  /**
   * 編集画面をセットする
   */
  const setNewsEdit = () => {
    _news_list.innerHTML = '';
    _news_save.classList.remove('off');
    _news_again.classList.add('off');
    _news_edit.classList.remove('off')
    loadNews()
    return false    
  }
  
  /**
   * 編集画面を閉じる
   */
  const closeNewsEdit = () => {
    _news_list.innerHTML = '';
    _news_edit.classList.add('off')
    return false;
  }
  
  /**
   * 行を追加する
   *
   * @param (object) obj: obj.date, objtext
   */
  const addNewsRow = (obj = {}) => {
    const clone_unit = _news_template_unit.cloneNode(true)
    
    if (obj.date && obj.text) {
      clone_unit.getElementsByTagName('input')[0].value = obj.date
      clone_unit.getElementsByTagName('textarea')[0].value = obj.text
    }
    
    _news_list.appendChild(clone_unit)

    clone_unit.getElementsByClassName('js-news-delete')[0].addEventListener('click', function() {
      clone_unit.remove();
      return false;
    })
    return false;
  }
  
  // データを読み込む
  loadNews(true)

  //　編集するボタンがあるか判別する
  if (_news_edit_view) {
    
    // 編集画面を表示する・再読み込みする
    _news_edit_view.addEventListener('click', setNewsEdit)
    _news_again.addEventListener('click', setNewsEdit)

    // 行を追加する
    _news_add.addEventListener('click', addNewsRow)

    // キャンセルする
    _news_cancel.addEventListener('click', closeNewsEdit)

    // 保存する
    _news_save.addEventListener('click', saveNews);
  }
  
});