<?php
/**
 * can_edit
 * NOTICE サンプルでは、誰でも更新できる状態なので、条件を変更して担当者のみが更新できるようにする
 *
 * たとえば、WordPressを利用していて、管理者だけが更新できるようにする場合は、
 * (1 === 1) を
 * (current_user_can('administrator')) とする
 */
function can_edit() {  
  return (1 === 1)?
    true: false;
}