/*
  整備レコードクラス
*/
var MaintainanceRecord = (function () {
    function MaintainanceRecord() {
    }
    MaintainanceRecord.generateId = function () {
        return formatDate(new Date());
    };
    return MaintainanceRecord;
}());
