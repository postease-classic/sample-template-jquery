/*
 * カウンター（PV）
 * SET_COUNTER
 * -----------------------------------------------------------------------------
 */


$(function ()
{
  if ($post_id)
  {
    if (getParam('preview') === false || getParam('preview') !== 1)
    {
      var $type = 1; // 1:PV
      $.ajax({
        type: 'POST',
        url: $api_base + '?set_counter',
        dataType: 'json',
        data: {
          post_id: $post_id,
          type: $type,
        }
      })
      .fail(function($data)
      {
        alert('情報が取得できません。APIの設定などを確認してください。');
      });
    }
  }
  
});