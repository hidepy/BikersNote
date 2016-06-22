/*
  定数定義
*/

//module APP_CONFIGS{
namespace APP_CONFIGS{
  export const NAME = "app";
}

namespace VIEW_LABELS{
  export const ENTRY_BUTTON = "登録";
  export const UPDATE_BUTTON = "更新";

  //各ページタイトル
  export const TITLE_HOME = "home";
  export const TITLE_ENTRY = "entry";
  export const TITLE_MODIFY = "modify";
  export const TITLE_HEADERS = "headers";
  export const TITLE_DETAIL = "detail";
  export const TITLE_SETTINGS = "settings";

  // 共通で使用するラベル文字列
  export const MACHINE = "対象の機体";
  export const TITLE = "タイトル";
  export const D_BUNRUI = "大分類";
  export const C_BUNRUI = "中分類";
  export const ODD_METER = "現在の走行距離";
  export const DONE_DATE = "日付";
  export const MONEY = "費用";
  export const COMMENT = "コメント";
  export const OPTIONAL1_DEFAULT = "備考1";
  export const OPTIONAL2_DEFAULT = "備考2";
  export const OPTIONAL3_DEFAULT = "備考3";
}
// マスタ専用 数が増える見込みなので
namespace VIEW_LABELS_MASTER{
  //設定マスタヘッダタイトル
  export const MSTR_MACHINE_VIEW = "機体一覧";
  export const MSTR_BUNRUI_VIEW = "分類一覧";
}

namespace SELECT_LIST_TYPES{
  export const MY_MACHINES = "bike";
  export const D_BUNRUI = "d_bunrui";
  export const C_BUNRUI = "c_bunrui";
}

namespace CONST_MESSAGES{
  export const ENTRY_SUCCESS = "登録しました";
  export const ENTRY_FAILURE = "登録に失敗しました...";
  export const UPDATE_SUCCESS = "修正しました";
  export const UPDATE_FAILURE = "修正に失敗しました...";
  export const DELETE_SUCCESS = "削除しました";
  export const DELETE_FAILURE = "削除に失敗しました...";
}
