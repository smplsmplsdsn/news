<?php
/**
 * TODO
 * can_edit
 *
 * サンプルでは、誰でも更新できる状態なので、条件をセットして担当者のみが更新できるようにする
 * たとえば、WordPressを利用していて、管理者だけが更新できるようにする場合は、
 * 条件式 (1 === 1) を (current_user_can('administrator')) 
 * とすることができる
 */
function can_edit() {
  $can_edit = false;  
  
  if (1 === 1) {
    $can_edit = true;    
  }
  
  return $can_edit;
}