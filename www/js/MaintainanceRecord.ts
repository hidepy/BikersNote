/*
  整備レコードクラス
    めんどいんで、アクセサとかなしで...
*/
class MaintainanceRecord{

  public static generateId = function(){
    return formatDate(new Date());
  }

}
