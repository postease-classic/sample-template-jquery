/*
 * ポスト一覧テンプレート
 * -------------------------------------------------------------------------
 */
var $template_posts =
  '<div class="post col-md-12 row">\n' +
  '\t<h2 class="post-heading"></h2>\n' +
  '\t<div class="row col-md-5">\n' +
  '\t\t<div class="post-eyecatch" href=""></div>\n' +
  '\t\t<time class="post-date"></time>\n' +
  '\t\t<span class="post-counter">\n' +
  '\t\t</span>\n' +
  '\t\t<span class="post-category"></span>\n' +
  '\t\t<span class="post-tag"></span>\n' +
  '\t\t<div class="post-extra">\n' +
  '\t\t\t<span class="post-recommend"></span>\n' +
  '\t\t\t<span class="post-author"></span>\n' +
  '\t\t</div>\n' +
  '\t</div>\n' +
  '\t<div class="col-md-offset-5">\n' +
  '\t\t<p class="post-outline"></p>\n' +
  '\t</div>\n' +
  '\t<div class="col-md-12 post-separator"></div>\n' +
  '</div>';


/*
 * ポスト詳細テンプレート
 * -------------------------------------------------------------------------
 */
var $template_post =
  '<div class="post">\n' +
  '\t<h2 class="post-heading"></h2>\n' +
  '\t<div class="post-eyecatch"></div>\n' +
  '\t<div class="post-metas">\n' +
  '\t\t<time class="post-date"></time>\n' +
  '\t\t<span class="post-counter"></span>\n' +
  '\t\t<span class="post-category"></span>\n' +
  '\t\t<span class="post-tag"></span>\n' +
  '\t\t<div class="post-extra">\n' +
  '\t\t\t<span class="post-recommend"></span>\n' +
  '\t\t\t<span class="post-author"></span>\n' +
  '\t\t</div>\n' +
  '\t</div>\n' +
  '\t<div class="social-article">\n' +
  '\t\t<a rel="nofollow" target="_blank" href="" class="social-button facebook"><i class="fab fa-facebook-square"></i></a>\n' +
  '\t\t<a rel="nofollow" target="_blank" href="" class="social-button line"><i class="fab fa-line"></i></a>\n' +
  '\t\t<a rel="nofollow" target="_blank" href="" class="social-button twitter"><i class="fab fa-twitter-square"></i></a>\n' +
  '\t</div>\n' +
  '\t<div class="post-content"></div>\n' +
  '\t<span class="post-signature"></span>\n' +
  '\t<div class="post-prevnext">\n' +
  '\t\t<span class="post-back">\n' +
  '\t\t\t<a href="#" onclick="javascript:window.history.back(-1);return false;">\n' +
  '\t\t\t\t<i class="fa fa-chevron-left" aria-hidden="true"></i> 戻る\n' +
  '\t\t\t</a>\n' +
  '\t\t</span>\n' +
  '\t</div>\n' +
  '</div>';