/*
 * ポスト詳細テンプレート
 * -------------------------------------------------------------------------
 */
var $template_post =
  '<div class="post">\n' +
  '\t<div class="post-outline">\n' +
  '\t\t<h2 class="post-heading"></h2>\n' +
  '\t\t<div class="post-eyecatch col-md-8 row"></div>\n' +
  '\t\t<div class="post-metas col-md-4 row">\n' +
  '\t\t\t<time class="post-date"></time>\n' +
  '\t\t\t<span class="post-counter"></span>\n' +
  '\t\t\t<span class="post-category"></span>\n' +
  '\t\t\t<span class="post-tag"></span>\n' +
  '\t\t\t<div class="post-extra">\n' +
  '\t\t\t\t<span class="post-recommend"></span>\n' +
  '\t\t\t\t<span class="post-author"></span>\n' +
  '\t\t\t</div>\n' +
  '\t\t</div>\n' +
  '\t\t<div class="social-article col-md-12 row">\n' +
  '\t\t\t<a rel="nofollow" target="_blank" href="" class="social-button facebook"><i class="fab fa-facebook-square"></i></a>\n' +
  '\t\t\t<a rel="nofollow" target="_blank" href="" class="social-button line"><i class="fab fa-line"></i></a>\n' +
  '\t\t\t<a rel="nofollow" target="_blank" href="" class="social-button twitter"><i class="fab fa-twitter-square"></i></a>\n' +
  '\t\t</div>\n' +
  '\t</div>\n' +
  '\t<div class="post-detail col-md-12 row">\n' +
  '\t\t<div class="post-content"></div>\n' +
  '\t\t<span class="post-signature"></span>\n' +
  '\t\t<div class="post-relations">\n' +
  '\t\t</div>\n' +
  '\t\t<div class="post-prevnext">\n' +
  '\t\t\t<span class="post-back">\n' +
  '\t\t\t\t<a href="#" onclick="javascript:window.history.back(-1);return false;">\n' +
  '\t\t\t\t\t<i class="fa fa-chevron-left" aria-hidden="true"></i> 戻る\n' +
  '\t\t\t\t</a>\n' +
  '\t\t\t</span>\n' +
  '\t\t</div>\n' +
  '\t</div>\n' +
  '</div>';