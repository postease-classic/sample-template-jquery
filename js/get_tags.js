/*
 * タグ一覧の取得（とレンダリング）
 * GET_TAGS
 * -----------------------------------------------------------------------------
 */


$(function(){
  
  /*
   * APIからカテゴリ一覧取得
   * ---------------------------------------------------------------------------
   */
  $.ajax({
    type: 'POST',
    url: $api_base + '?get_tags',
    dataType: 'json',
  })

  .done(function($data)
  {
  
    /*
     * デバッグ
     * -------
     * Note:
     * コンソールで取得データを確認するには以下をコメントインしてください。
     * -----------------------------------------------------------------------
     */
    //console.log(JSON.stringify($data,null,'\t'));
  
  
    /*
     * HTML生成
     * -------------------------------------------------------------------------
     */
    var $html_tag = '';
    if (Object.keys($data).length > 0)
    {
      $.each($data, function ($key, $tag) {
        $html_tag += '<span class="tag-label">';
        $html_tag += '<a href="?tag=' + $tag.slug + '&tag_text=' + $tag.label + '">' + $tag.label + '</a> ';
        $html_tag += '<span class="badge">' + $tag.count + '</span>';
        $html_tag += '</span>';
      });
    }
    else {
      $html_tag += '<p>有効なタグはありません。</p>';
    }
  
    /*
     * HTMLレンダリング
     * -------------------------------------------------------------------------
     */
    $('#tag').append($html_tag);
  
  
  })
  .fail(function($data)
  {
    alert('情報が取得できません。APIの設定などを確認してください。');
  });
  
});