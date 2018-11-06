/*
 * 固定ポスト一覧の取得（とレンダリング）
 * GET_POSTS
 * -----------------------------------------------------------------------------
 */


$(function(){
  
  /*
   * データ取得設定
   * Note:
   * 以下の条件で固定
   * -------------------------------------------------------------------------
   */
  var $config_posts =
    {
      'limit'        : 3,
      'author_id'    : 1,
      'with_counter' : 0,
      'with_custome' : 0,
    };
  
  
  /*
   * APIからカテゴリ一覧取得
   * ---------------------------------------------------------------------------
   */
  $.ajax({
    type: 'POST',
    url: $api_base + '?get_posts',
    dataType: 'json',
    data: {
      config: $config_posts
    }
  })
  
  .done(function($data)
  {
    
    /*
     * デバッグ
     * -------
     * Note:
     * コンソールで取得データを確認するには以下をコメントインしてください。
     * -------------------------------------------------------------------------
     */
    //console.log(JSON.stringify($data,null,'\t'));
    
    
    /*
     * HTML生成
     * -------------------------------------------------------------------------
     */
    var $html = '';
    if (Object.keys($data.list_index).length > 0)
    {
      $html += '<ul>';
      $.each($data.list_index, function($key, $post)
      {
        $html += '<li><a href="?post_id=' + $post.id + '">' + $post.title +'</a></li>';
      });
      $html += '</ul>';
    }
    else {
      $html_tag += '<p>固定ポストはありません。</p>';
    }
    
    /*
     * HTMLレンダリング
     * -------------------------------------------------------------------------
     */
    $('#fixed').append($html);
    
    
  })
  .fail(function($data)
  {
    //alert('情報が取得できません。APIの設定などを確認してください。');
  });
  
});