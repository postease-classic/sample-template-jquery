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
  
  
      /*
       * データ件数取得
       * -----------------------------------------------------------------------
       */
      var $post_count = $data.outline.count_total;
  
      
      /*
       * ローディングの停止
       * -----------------------------------------------------------------------
       */
      $('.content-loader').hide();
      
      
      /**
       * ポスト一覧HTML生成
       * -----------------------------------------------------------------------
       */
      if ($post_count > 0)
      {
        // 外枠の生成
        $('main').append('<div id="posts" class="posts"></div>');
        
        $.each($data.list, function($key, $post)
        {
          /*
           * ポスト一覧テンプレートの読み込み
           * -------------------------------------------------------------------
           */
          $('#posts').append($template_posts);


          /*
           * データの書き出し
           * -------------------------------------------------------------------
           */
          // Title
          $('.post-heading').filter(':last').html('<a href="?post_id=' + $post.id + '">' + $post.title + '</a>');
          
          // Eyecatch
          if ($post.eyecatch)
            $('.post-eyecatch').filter(':last').html('<a href="?post_id=' + $post.id + '"><img src="' + $post.eyecatch + '" srcset="' + $post.eyecatch_1x + ' 1x, ' + $post.eyecatch_2x + ' 2x" alt="' + $post.title + '"></a>');
          
          // Publish Date
          $('.post-date').filter(':last').text($post.publish_date);

          // Content
          $('.post-outline').filter(':last').text($post.content);
          if ($post.content_cut_flg == 1)
          {
            $('.post-outline').filter(':last').append('...<span class="post-readmore"><a href="?post_id='+$post.id+'">&raquo; 続きを読む</a></span>');
          }
          
          // Page View
          if ($post.counter !== undefined && $post.counter.length !== 0)
            $.each($post.counter, function($key, $counter)
            {
              if ($key == 1)
              {
                $('.post-counter').filter(':last').html('<i class="fas fa-eye"></i> ' + $counter.count + ' views');
              }
            });

          // Category
          if ($post.categories.length !== 0)
          {
            var $html = '<i class="fa fa-tag" aria-hidden="true"></i> ';
            $.each($post.categories, function($key_cat, $category)
            {
              $html += '<a class="narrow" href="?category=' + $category.slug + '&category_text=' + $category.label + '">' + $category.label + '</a>'
            });
            $('.post-category').filter(':last').html($html);
          }

          // Tag
          if ($post.tags.length !== 0)
          {
            var $html = '<i class="fa fa-tags" aria-hidden="true"></i>';
            $.each($post.tags, function($key_tag, $tag)
            {
              $html += '<a href="?tag=' + $tag.slug + '&tag_text=' + $tag.label + '">' + $tag.label + '</a>'
            });
            $('.post-tag').filter(':last').html($html);
          }
          
          // Recommend
          if ($post.anchor > 0)
          {
            var $html= 'recommend : ';
            for ($i_anchor = 1; $i_anchor <= $post.anchor; $i_anchor ++)
            {
              $html += '<i class="fa fa-star" aria-hidden="true"></i> ';
            }
            $('.post-recommend').filter(':last').html($html);
          }

          // Author
          $('.post-author').html('Author : <a href="?clear=1&amp;created_by=' + $post.created_by + '&amp;author=' + $post.author + '">' + $post.author + '</a>');
  
  
          /*
           * ソーシャルボタンの生成
           * -------------------------------------------------------------------
           */
          // Social Facebook
          $('.facebook').attr('href', 'http://www.facebook.com/share.php?u=' + location.href);
          
          // Social Line
          $('.line').attr('href', 'https://social-plugins.line.me/lineit/share?url=' + location.href);

          // Social Twitter
          $('.twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURI('POSTEASE SAMPLE') + '&url=' + location.href + '&hashtags=postease');
          
        });
      }
      else {
        $('main').append('<p>この条件のポストはありません。</p>');
      }
      
  
      /**
       * ページネーション生成
       * -----------------------------------------------------------------------
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
       * -----------------------------------------------------------------------
       */
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
          $html_condition += '<button type="button" class="close condition-close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
          $html_condition += '</div>';
          $html_condition += '</div>';
          
          // 現在の検索条件HTMLレンダリング
          $('main').prepend($html_condition);
        }
        
        // 検索ワードを入力ボックスに残す
        if ($text) $('#text').val($text);
      }
      
      // 検索条件の削除
      $('.condition-close').on('click', function(){
        $('#posts').hide();
        location.href = '?';
      });
      
      
    })
    .fail(function($data)
      {
        alert('情報が取得できません。APIの設定などを確認してください。');
      });
    }
    
});