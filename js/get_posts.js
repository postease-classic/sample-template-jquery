/**
 * ポスト一覧の取得（とレンダリング）
 * GET_POSTS
 * -----------------------------------------------------------------------------
 */


/*
 * 一覧の表示件数
 * ------------
 * Note:
 * 仕様に応じて変更してください。
 * -----------------------------------------------------------------------------
 */
var $limit = 5;


$(function ()
{
  if (! $post_id)
  {
    /*
     * データ取得設定
     * -------------------------------------------------------------------------
     */
    var $config_posts =
      {
        'page'           : $page,
        'limit'          : $limit,
        'text'           : $text,
        'year'           : $year,
        'month'          : $month,
        'day'            : $day,
        'category'       : $category,
        'tag'            : $tag,
        'created_by'     : $created_by,
        'content_length' : 100,
      };
  
    
    /*
     * APIからポスト一覧取得
     * -------------------------------------------------------------------------
     */
    $.ajax({
      type : 'POST',
      url  : $api_base + '?get_posts',
      dataType : 'json',
      data : {
        config: $config_posts,
      },
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
      
      
      // 取得件数
      var $post_count = $data.outline.count_total;
  
  
      /**
       * HTML生成
       * -----------------------------------------------------------------------
       */
      if ($post_count > 0)
      {
        var $html_posts = '';
        $.each($data.list, function($key, $row)
        {
          $html_posts += '<div id="posts" class="posts">';
          $html_posts += '<div class="post col-md-12">';
          $html_posts += '<h2 class="post-heading"><a href="?post_id=' + $row.id + '">' + $row.title + '</a></h2>';
          $html_posts += '<div class="row col-md-5">';
          if ($row.eyecatch)
          {
            $html_posts += '<a class="post-eyecatch" href="?post_id='+$row.id+'"><img src="'+$row.eyecatch+'" alt=""></a>';
          }
          $html_posts += '<time class="post-date">'+$row.publish_date+'</time>';
          if ($row.counter !== undefined && $row.counter.length !== 0)
          {
            $.each($row.counter, function($key, $counter)
            {
              if ($key == 1)
              {
                $html_posts += '<span class="post-counter"><i class="fa fa-heart" aria-hidden="true"></i> '+$counter.count+' views</span>';
              }
            });
          }
          $html_posts += '<span class="post-category">';
          if ($row.categories.length !== 0)
          {
            $.each($row.categories, function($key_cat, $category)
            {
              $html_posts += '<a href="?category='+$category.slug+'&category_text='+$category.label+'">'+$category.label+'</a> ';
            });
          }
          $html_posts += '</span>';
          $html_posts += '<span class="post-tag">';
          if ($row.tags.length !== 0)
          {
            $.each($row.tags, function($key_tag, $tag)
            {
              $html_posts += '<a href="?tag='+$tag.slug+'&tag_text='+$tag.label+'">'+$tag.label+'</a> ';
            });
          }
          $html_posts += '</span>';
          $html_posts += '<div class="post-extra">';
          $html_posts += '<span class="post-recommend">';
          if ($row.anchor > 0)
          {
            $html_posts += 'recommend : ';
            for ($i_anchor = 1; $i_anchor <= $row.anchor; $i_anchor ++)
            {
              $html_posts += '<i class="fa fa-star" aria-hidden="true"></i> ';
            }
          }
          $html_posts += '</span>';
          $html_posts += '</div>';
          $html_posts += '</div>';
          $html_posts += '<div class="row col-md-offset-5">';
          $html_posts += '<p class="post-outline">' + $row.content;
          if ($row.content_cut_flg == 1)
          {
            $html_posts += '...<span class="post-readmore"><a href="?post_id='+$row.id+'">&raquo; 続きを読む</a></span>';
          }
          $html_posts += '</p>';
          $html_posts += '</div>';
          $html_posts += '</div>';
          $html_posts += '</div>';
          $html_posts += '</div>';
        });
      }
      else {
        $html_posts = '<p>この条件のポストはありません。</p>';
      }
      
      
      /*
       * HTMLレンダリング
       * -----------------------------------------------------------------------
       */
      $('main').append($html_posts);
  
  
  
      /**
       * ページネーション生成
       * ---------------------------------------------------------------------
       */
      if ($post_count > 0)
      {
        var $html_pagenation = '';
        if ($data.outline.pages > 1)
        {
          $html_pagenation += '<nav class="pagenator col-md-12">';
          $html_pagenation += '<ul>';
          $html_pagenation += '<li><a class="pagenator-page" href="?page=1">&laquo;</a></li> ';
          for ($page_i = 1; $page_i <= $data.outline.pages; $page_i ++)
          {
            if ($page_i != $page)
            {
              $html_pagenation += '<li><a class="pagenator-page" href="?page='+$page_i+'">'+$page_i+'</a></li> ';
            }
            else {
              $html_pagenation += '<li><span class="focus">'+$page_i+'</span></li> ';
            }
          }
          $html_pagenation += '<li><a class="pagenator-page" href="?page='+$data.outline.pages+'">&raquo;</a></li>';
          $html_pagenation += '</ul>';
          $html_pagenation += '</nav>';
    
          // ページネーションHTMLレンダリング
          $('main').append($html_pagenation);
        }
      }
      
      
      
      /**
       * 現在の検索条件を表示
       * -------------------------------------------------------------------- */
      var $html_condition = '';
      if (getParam() != false)
      {
        if ($text || $year || $month || $day || $category_text || $tag_text || $author)
        {
          $html_condition += '<div class="condition">';
          $html_condition += '<div class="alert alert-dismissible" role="alert">';
          if ($text) $html_condition += '<strong>検索ワード</strong> ' + $text;
          else if ($year && $month && $day) $html_condition += '<strong>アーカイブ</strong> '+$year+'年 '+$month+'月 '+$day+'日';
          else if ($year && $month) $html_condition += '<strong>アーカイブ</strong> '+$year+'年 '+$month+'月';
          else if ($year) $html_condition += '<strong>アーカイブ</strong> '+$year+'年';
          else if ($category_text) $html_condition += '<strong>カテゴリー</strong> ' + $category_text;
          else if ($tag_text) $html_condition += '<strong>タグ</strong> ' + $tag_text;
          else if ($author) $html_condition += '<strong>執筆者</strong> ' + $author;
          $html_condition += ' <span class="badge">'+$post_count+'</span>';
          $html_condition += '</div>';
          $html_condition += '</div>';
          
          // 現在の検索条件HTMLレンダリング
          $('main').prepend($html_condition);
        }
        
        // 検索ワードを入力ボックスに残す
        if ($text) $('#text').val($text);
      }
      
      
    })
    .fail(function($data)
      {
        alert('情報が取得できません。APIの設定などを確認してください。');
      });
    }
    
});