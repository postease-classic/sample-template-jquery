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
    .done(function ($post)
    {
      if (Object.keys($post).length)
      {
        /*
         * デバッグ
         * -------
         * Note:
         * コンソールで取得データを確認するには以下をコメントインしてください。
         * ---------------------------------------------------------------------
         */
        console.log(JSON.stringify($post,null,'\t'));
    
        
        /*
         * メタタグ書換え
         * ---------------------------------------------------------------------
         */
        var $this_title = $post.title + ' | ' + $('title').html();
        var $raw_content = html2text($post.content).substr(0, 100)
        var $pos = $raw_content.lastIndexOf('。');
        var $this_description = ($pos == -1) ? $raw_content : $raw_content.substr(0, $pos) + '。';
        $('title').html($this_title);
        $('meta[name=description]').attr('content', $this_description);
        $('meta[property="og:url"]').attr('content', location.href);
        $('meta[property="og:type"]').attr('content', 'article');
        $('meta[property="og:title"]').attr('content', $this_title);
        $('meta[property="og:description"]').attr('content', $this_description);
        $('meta[property="og:image"]').attr('content', $post.eyecatch_2x);
  
  
        /*
         * ローディングの停止
         * ---------------------------------------------------------------------
         */
        $('.content-loader').hide();
    
        
        /*
         * ポスト詳細テンプレートの読み込み
         * ---------------------------------------------------------------------
         */
        $('main').append($template_post);
        
        
        /*
         * データの書き出し
         * ---------------------------------------------------------------------
         */
        // Title
        $('.post-heading').text($post.title);
        
        // Eyecatch
        if ($post.eyecatch)
        {
          $('.post-eyecatch').html('<img src="' + $post.eyecatch + '" srcset="' + $post.eyecatch_1x + ' 1x, ' + $post.eyecatch_2x + ' 2x" alt="' + $post.title + '">');
        }
        
        // Publish DateTime
        $('.post-date').text($post.publish_datetime);

        // Content
        $('.post-content').html($post.content);

        // Signature
        $('.post-signature').text('Written by : ' + $post.author);

        // Author
        $('.post-author').html('Author : <a href="?clear=1&amp;created_by=' + $post.created_by + '&amp;author=' + $post.author + '">' + $post.author + '</a>');

        // Page View
        if ($post.counter !== undefined && $post.counter.length !== 0)
        {
          $.each($post.counter, function($key, $counter)
          {
            if ($key == 1)
            {
              $('.post-counter').filter(':last').html('<i class="fas fa-eye"></i> ' + $counter.count + ' views');
            }
          });
        }
        
        // Category
        if ($post.categories.length !== 0)
        {
          var $html = '<i class="fa fa-tag" aria-hidden="true"></i> ';
          $.each($post.categories, function($key_cat, $category)
          {
            $html += '<a href="?category=' + $category.slug + '&category_text=' + $category.label + '">' + $category.label + '</a>'
          });
          $('.post-category').html($html);
        }

        // Tag
        if ($post.tags.length !== 0)
        {
          var $html = '<i class="fa fa-tags" aria-hidden="true"></i>';
          $.each($post.tags, function($key_tag, $tag)
          {
            $html += '<a href="?tag=' + $tag.slug + '&tag_text=' + $tag.label + '">' + $tag.label + '</a>'
          });
          $('.post-tag').html($html);
        }

        // Recommend
        if ($post.anchor > 0)
        {
          var $html= 'recommend : ';
          for ($i_anchor = 1; $i_anchor <= $post.anchor; $i_anchor ++)
          {
            $html += '<i class="fa fa-star" aria-hidden="true"></i> ';
          }
          $('.post-recommend').html($html);
        }
  
        // Related Posts
        if ($post.relations.length !== 0)
        {
          var $html = '<h3>関連ポスト</h3>';
          $html += '<ul>';
          $.each($post.relations, function($key_relation, $relation)
          {
            $html += '<li><a href="?post_id=' + $relation.id + '"><i class="fas fa-arrow-circle-right"></i> ' + $relation.title + '</a></li>'
          });
          $html += '</ul>';
          $('.post-relations').html($html);
        }
  
        /*
         * ソーシャルボタンの生成
         * ---------------------------------------------------------------------
         */
        // Social Facebook
        $('.facebook').attr('href', 'http://www.facebook.com/share.php?u=' + location.href);
        
        // Social Line
        $('.line').attr('href', 'https://social-plugins.line.me/lineit/share?url=' + location.href);
        
        // Social Twitter
        $('.twitter').attr('href', 'https://twitter.com/intent/tweet?text=' + encodeURI($this_title) + '&url=' + location.href + '&hashtags=postease');
        
      }
      else {
        $('.content-loader').hide();
        $('main').append('<p>お探しのポストは見つかりませんでした。</p>');
      }
      
    })
    .fail(function($post)
    {
      alert('情報が取得できません。APIの設定などを確認してください。');
    });
  }
  
});