/*
  定数定義
*/

//module APP_CONFIGS{
namespace APP_CONFIGS{
  export const NAME = "app";
}

namespace STORAGE_TYPE{
  export const TRAN_RECORDS = "MAINTAINANCE_RECORDS";
  export const MASTER_MACHINE = "MASTER_MACHINE";
  export const MASTER_D_BUNRUI = "MASTER_D_BUNRUI";
  export const MASTER_C_BUNRUI = "MASTER_C_BUNRUI";
}

namespace VIEW_LABELS{
  export const ENTRY_BUTTON = "登録";
  export const UPDATE_BUTTON = "更新";
  export const SHOW_BUTTON = "照会";
  export const EDIT_BUTTON = "編集";
  export const DELETE_BUTTON = "削除";

  //各ページタイトル
  export const TITLE_HOME = "home";
  export const TITLE_ENTRY = "entry";
  export const TITLE_MODIFY = "modify";
  export const TITLE_HEADERS = "headers";
  export const TITLE_DETAIL = "detail";
  export const TITLE_SETTINGS = "settings";

  // 共通で使用するラベル文字列
  export const COL_MACHINE = "対象の機体";
  export const COL_TITLE = "タイトル";
  export const COL_D_BUNRUI = "大分類";
  export const COL_C_BUNRUI = "中分類";
  export const COL_ODD_METER = "現在の走行距離";
  export const COL_DONE_DATE = "日付";
  export const COL_MONEY = "費用";
  export const COL_COMMENT = "コメント";
  export const COL_OPTIONAL1_DEFAULT = "備考1";
  export const COL_OPTIONAL2_DEFAULT = "備考2";
  export const COL_OPTIONAL3_DEFAULT = "備考3";
}
// マスタ専用 数が増える見込みなので
namespace VIEW_LABELS_MASTER{

  //設定マスタヘッダタイトル
  export const MSTR_MACHINE_VIEW = "機体一覧";
  export const MSTR_BUNRUI_VIEW = "分類一覧";
  export const MACHINE_SIGN_UP = "新規";
  export const MACHINE_SIGN_UP_BUTTON = "登録";
  export const MACHINE_LIST = "一覧";

  // COL共通
  export const COL_NAME = "名称";

  export const COL_MACHINE = "機体名";
  export const COL_HOME_IMG = "アイコン画像";
  export const COL_PRCS_DATE = "購入日付";
  export const COL_RPCS_PRICE = "購入価格";
  export const COL_CURR_ODD = "現在の走行距離";
  export const COL_MAIN_FLG = "メインの機体にする";

}

namespace SELECT_LIST_TYPES{
  export const MY_MACHINES = "bike";
  export const D_BUNRUI = "d_bunrui";
  export const C_BUNRUI = "c_bunrui";
}

namespace RETURN_CD{
  export const SUCCESS = "0";
  export const NO_DATA = "1"; //取得データ/処理対象データがない場合
  export const HAS_REGULAR_ERR = "8"; //システムで想定されるエラー(エラーチェックなど)
  export const HAS_FATAL_ERR = "9"; //致命的なエラー
}

namespace CONST_MESSAGES{
  export const ENTRY_SUCCESS = "登録しました";
  export const ENTRY_FAILURE = "登録に失敗しました...";
  export const UPDATE_SUCCESS = "修正しました";
  export const UPDATE_FAILURE = "修正に失敗しました...";
  export const DELETE_SUCCESS = "削除しました";
  export const DELETE_FAILURE = "削除に失敗しました...";

  export const CONFIRM_DELETE = "1件削除します。よろしいですか？";
}
