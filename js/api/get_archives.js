/*
 * アーカイブの取得（とレンダリング）
 * GET_ARCHIVES
 * -----------------------------------------------------------------------------
 */


$(function () {
  
  /*
   * APIからアーカイブ取得
   * ---------------------------------------------------------------------------
   */
  $.ajax({
    type: 'POST',
    url: $api_base + '?get_archives',
    dataType: 'json',
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
    var $html_archive = '';
    if (Object.keys($data).length > 0)
    {
      $html_archive += '<ul>';
      $.each($data, function ($year, $year_row) {
        $html_archive += '<li><a href="?year=' + $year + '">' + $year + '年</a> <span class="badge">' + $year_row.count + '</span></li>';
        $html_archive += '<li>';
        $html_archive += '<ul>';
        $.each($year_row.months, function ($month, $month_row) {
          $html_archive += '<li><a href="?year=' + $year + '&month=' + $month + '"> ' + $month + '月</a> <span class="badge">' + $month_row.count + '</span></li>';
          $html_archive += '<li>';
          $html_archive += '<ul>';
          $.each($month_row.days, function ($day, $day_row) {
            $html_archive += '<li><a href="?year=' + $year + '&month=' + $month + '&day=' + $day + '"> ' + $day + '日</a> <span class="badge">' + $day_row.count + '</span></li>';
          });
          $html_archive += '</ul>';
          $html_archive += '</li>';
        });
        $html_archive += '</ul>';
        $html_archive += '</li>';
      });
      $html_archive += '</ul>';
    }
    else {
      $html_archive += '<p>アーカイブはありません。</p>';
    }
  
  
    /*
     * HTMLレンダリング
     * -------------------------------------------------------------------------
     */
    $('#archive').append($html_archive);
    
    
  })
  .fail(function($data)
  {
    alert('情報が取得できません。APIの設定などを確認してください。');
  });
  
})