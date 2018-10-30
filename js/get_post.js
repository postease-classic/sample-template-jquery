/**
 * ポスト詳細の取得（とレンダリング）
 * GET_POSTS
 * -----------------------------------------------------------------------------
 */


$(function()
{
  if ($post_id)
  {
    /*
     * APIからポスト詳細取得
     * -------------------------------------------------------------------------
     */
    $.ajax({
      type: 'POST',
      url: $api_base + '?get_post',
      dataType: 'json',
      data: {
        target: $post_id,
      }
    })
    
    .done(function ($data)
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
       * -----------------------------------------------------------------------
       */
      var $html_post = '';
      if (Object.keys($data).length) {
        $html_post += '<div class="post">';
        $html_post += '<h2 class="post-heading">' + $data.title + '</h2>';
        if ($data.eyecatch) {
          $html_post += '<div class="post-eyecatch"><img src="' + $data.eyecatch + '" alt="' + $data.title + '"></div>';
        }
        $html_post += '<div class="post-metas">';
        $html_post += '<time class="post-date">' + $data.publish_date + '</time>';
        if ($data.counter !== undefined && $data.counter.length !== 0) {
          $.each($data.counter, function ($key, $counter) {
            if ($key == 1) {
              $html_post += '<span class="post-counter"><i class="fa fa-heart" aria-hidden="true"></i> ' + $counter.count + ' views</span>';
            }
          });
        }
        $html_post += '<span class="post-category">';
        if ($data.categories.length !== 0) {
          $.each($data.categories, function ($key, $category) {
            $html_post += '<a href="./?category=' + $category.slug + '&category_text=' + $category.label + '">' + $category.label + '</a> ';
          });
        }
        $html_post += '</span>';
        $html_post += '<span class="post-tag">';
        if ($data.tags.length !== 0) {
          $.each($data.tags, function ($key, $tag) {
            $html_post += '<a href="./?tag=' + $tag.slug + '&tag_text=' + $tag.label + '">' + $tag.label + '</a> ';
          });
        }
        $html_post += '</span>';
        $html_post += '<div class="post-extra">';
        $html_post += '<span class="post-recommend">';
        if ($data.anchor > 0) {
          $html_post += 'recommend : ';
          for ($i_anchor = 1; $i_anchor <= $data.anchor; $i_anchor++) {
            $html_post += '<i class="fa fa-star" aria-hidden="true"></i> ';
          }
        }
        $html_post += '</span>';
        $html_post += '<span class="post-author">Author : <a href="./?clear=1&created_by=' + $data.created_by + '&author=' + $data.author + '">' + $data.author + '</a></span>';
        $html_post += '</div>';
        $html_post += '</div>';
        $html_post += '<div class="post-content">' + $data.content + '</div>';
        $html_post += '<span class="post-signiture">Written by : ' + $data.author + '</span>';
        $html_post += '<div class="post-prevnext">';
        $html_post += '<span class="post-back"><a href="#" onclick="javascript:window.history.back(-1);return false;"><i class="fa fa-chevron-left" aria-hidden="true"></i> 戻る</a></span>';
        $html_post += '</div>';
        $html_post += '</div>';
      }
      else {
        $html_post += '<p>お探しのポストは見つかりませんでした。</p>';
      }
      
      
      /*
       * HTMLレンダリング
       * -----------------------------------------------------------------------
       */
      $('main').append($html_post);
      
      
    })
    .fail(function($data)
    {
      alert('情報が取得できません。APIの設定などを確認してください。');
    });
  }
  
});