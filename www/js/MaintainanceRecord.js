/*
  整備レコードクラス
    めんどいんで、アクセサとかなしで...
*/
var MaintainanceRecord = (function () {
    function MaintainanceRecord() {
    }
    MaintainanceRecord.generateId = function () {
        return formatDate(new Date());
    };
    return MaintainanceRecord;
}());
