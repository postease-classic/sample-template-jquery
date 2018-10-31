/*
 * カテゴリ一覧の取得（とレンダリング）
 * GET_CATEGORIES
 * -----------------------------------------------------------------------------
 */


$(function(){
  
  /*
   * APIからカテゴリ一覧取得
   * ---------------------------------------------------------------------------
   */
  $.ajax({
    type: 'POST',
    url: $api_base + '?get_categories',
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
    var $html_category = '';
    if (Object.keys($data).length > 0)
    {
      $html_category += '<ul>';
      $.each($data, function($key, $category)
      {
        $html_category += '<li>';
        $html_category += '<a href="?category='+$category.slug+'&category_text='+$category.label+'">'+$category.label+'</a> ';
        $html_category += '<span class="badge">'+$category.count+'</span>';
        if ($category.children)
        {
          $html_category += '<ul>';
          $.each($category.children, function($key, $child)
          {
            $html_category += '<li>';
            $html_category += '<a href="?category='+$child.slug+'&category_text='+$child.label+'">'+$child.label+'</a> ';
            $html_category += '<span class="badge">'+$child.count+'</span>';
            $html_category += '</li>';
          });
          $html_category += '</ul>';
        }
        $html_category += '</li>';
      });
      $html_category += '</ul>';
    }
    else {
      $html_category += '<p>有効なカテゴリーはありません。</p>';
    }
    
    
    /*
     * HTMLレンダリング
     * -------------------------------------------------------------------------
     */
    $('#category').append($html_category);
    
    
  })
  .fail(function($data)
  {
    alert('情報が取得できません。APIの設定などを確認してください。');
  });
  
});