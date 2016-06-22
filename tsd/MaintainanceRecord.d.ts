/**
 * @description Typedefinition of MaintainanceRecord
 */
interface MaintainanceRecord {

  id: string;
  bike: string;
  title: string;
  d_bunrui: string;
  c_bunrui: string;
  odd_meter: number;
  done_date: Date;
  money: number;
  comment: string;
  optional_1: any;
  optional_2: any;
  optional_3: any;
  update_datetime: Date;

  /**
   * @return {String} 生成されたID
   * @description 唯一キーを生成する. staticメソッド
   */
  generateId(): string;


}
