export interface PackageItem {
  Billing_package_group_id: number;
  apple_product_id: string;
  description: string;
  duration: number;
  duration_type: string;
  expired_date: string;
  expiry_date_vinaphone: string;
  gift: string;
  gift_code: string;
  google_product_id: string;
  id: number;
  intro: string;
  message_popup: string;
  name: string;
  old_price: number;
  percent_discount: string;
  price: number;
  price_for_month: number;
  recurring: number;
  start_date: string;
  sub_name: string;
}

export interface PurePackageList {
  banner: string;
  banner_lower: string;
  banner_upper: string;
  created_date: string;
  description: string;
  id: number;
  image: string;
  is_public: number;
  items: PackageItem[];
  name: string;
  public_type: number;
  user_expired_date: string;
  user_is_buy: boolean;
  user_is_recurring: boolean;
}

export interface PackageList {
  filter(arg0: (it: PackageItem) => boolean): unknown;
  items: PackageItem[];
}
