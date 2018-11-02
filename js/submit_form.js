/*
 * フォーム＆メール送信
 * SUBMIT_FORM_SEND_MAIL
 * -----------------------------------------------------------------------------
 */


$(function ()
{
  $('.contact-loader').hide();
  $('#submit').on('click', function ()
  {
    /*
     * 入力チェックフラグ
     * ---------------
     * 0: 入力エラーなし　
     * 1: 入力エラーあり
     * -----------------------------------------------------------------------
     */
    var $invalid = 0;
  
    
    /*
     * 入力値の取得
     * -----------------------------------------------------------------------
     */
    var $name    = $('#name').val();
    var $email   = $('#email').val();
    var $content = $('#content').val();
  
  
    /*
     * 入力チェック
     * -----------------------------------------------------------------------
     */
    // お名前
    if (! $name)
    {
      $('#name_valid').addClass('alert').text('お名前は必須です');
      $invalid = 1;
    }
    else {
      $('#name_valid').removeClass('alert').text('');
      $invalid = 0;
    }
    
    // メールアドレス
    if (! $email)
    {
      $('#email_valid').addClass('alert').text('メールアドレスは必須です');
      $invalid = 1;
    }
    else {
      if (! $email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/))
      {
        $('#email_valid').addClass('alert').text('メールアドレスを正しく入力して下さい。');
        $invalid = 1;
      }
      else {
        $('#email_valid').removeClass('alert').text('');
        $invalid = 0;
      }
    }
  
    // お問合わせ内容
    if (! $content)
    {
      $('#content_valid').addClass('alert').text('お問い合わせ内容は必須です');
      $invalid = 1;
    }
    else {
      $('#content_valid').removeClass('alert').text('');
      $invalid = 0;
    }
  
  
    /*
     * データ送信とメール送信
     * -------------------------------------------------------------------------
     */
    if ($invalid == 0)
    {
      $('#submit').hide();
      $('.contact-loader').show();
      
      
      /*
       * データを格納するコンタクトを指定（通常は contact ）
       * -------------------------------------------------------------------------
       */
      var $contact_target = {
        posttype: 'contact'
      };
  
  
      /*
       * 格納したいデータを指定
       * -------------------------------------------------------------------------
       */
      var $form_data = {
        name: $name,
        email: $email,
        content: $content,
      };
  
      
      /*
       * APIでデータ送信＆メール送信実行
       * -------------------------------------------------------------------------
       */
      $.ajax({
        url: $api_base + '?submit_form_send_mail',
        type: 'POST',
        data: {
          contact_target: $contact_target,
          form_data: $form_data,
        },
        dataType: 'json'
      })
      
      .done(function ($data)
      {
        $('.contact-loader').hide();
        $('.contact-submit').text('お問い合わせを受け付けました。');
        $('#name').prop('disabled', true);
        $('#email').prop('disabled', true);
        $('#content').prop('disabled', true);
      })
      .fail(function($data)
      {
        alert('フォームを送信できません。APIの設定などを確認してください。');
      });
    }
  });
  
});