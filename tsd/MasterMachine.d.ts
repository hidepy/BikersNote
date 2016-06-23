interface I_MasterMachine {
  id: string;
  name: string;
  icon: any;
  purchase_date: Date;
  purchase_price: number;
  odd_meter: number;// 現在の...
  is_main: boolean; // 現在メイン機体になっているか
}
