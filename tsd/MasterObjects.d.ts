/* master machine */
interface I_MasterMachine {
  id: string;
  name: string;
  icon: any;
  purchase_date: Date;
  purchase_price: number;
  odd_meter: number;// 現在の...
  is_main: boolean; // 現在メイン機体になっているか
}

/* master dbunrui */
interface I_MasterDBunrui {
  id: string;
  name: string;
}

/* master cbunrui */
interface I_MasterCBunrui {
  id: string;
  name: string;
  parent_id: string;
}
