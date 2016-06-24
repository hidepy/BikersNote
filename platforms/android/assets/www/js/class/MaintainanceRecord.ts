/*
  レコードクラス
    うーん... これもサービス化するか
    loaclstorageに入れて保存しちゃう、というフロー上、クラスとオブジェクトの紐づけとれるし
*/
class MaintainanceRecord implements I_MaintainanceRecord{

  public id: string;
  public bike: string;
  public title: string;
  public d_bunrui: string;
  public c_bunrui: string;
  public odd_meter: number;
  public done_date: Date;
  public money: number;
  public comment: string;
  public optional_1: any;
  public optional_2: any;
  public optional_3: any;
  public update_datetime: Date;

  public static generateId = function(){
    return formatDate(new Date());
  }

  public static getProperties = function(with_type?: boolean): any{
    if(with_type){
      return [
        { name: "id", type: "string", no_disp: true},
        { name: "bike", type: "string", label: VIEW_LABELS.COL_MACHINE, not_normal: true, is_select: true },
        { name: "title", type: "string", label: VIEW_LABELS.COL_TITLE, input_type: "text" },
        { name: "d_bunrui", type: "string", label: VIEW_LABELS.COL_D_BUNRUI, not_normal: true, is_select: true },
        { name: "c_bunrui", type: "string", label: VIEW_LABELS.COL_C_BUNRUI,not_normal: true, is_select: true },
        { name: "odd_meter", type: "number", label: VIEW_LABELS.COL_ODD_METER, input_type: "number" },
        { name: "done_date", type: "Date", label: VIEW_LABELS.COL_DONE_DATE, input_type: "date" },
        { name: "money", type: "number", label: VIEW_LABELS.COL_MONEY, input_type: "date" },
        { name: "comment", type: "string", label: VIEW_LABELS.COL_COMMENT, input_type: "text" },
        { name: "optional_1", type: "any", label: "optional1", input_type: "text" },
        { name: "optional_2", type: "any", label: "optional2", input_type: "text" },
        { name: "optional_3", type: "any", label: "optional3", input_type: "text" },
        { name: "update_datetime", type: "Date", no_disp: true }
      ];
    }
    else{
      return [
        "id", "bike", "title", "d_bunrui", "c_bunrui", "odd_meter", "done_date", "money", "comment", "optional_1", "optional_2", "optional_3", "update_datetime"
      ];
    }
  }

}
