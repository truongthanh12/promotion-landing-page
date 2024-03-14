export interface ICampaign {
  compaign_id: string;
  start_at: string;
  end_at: string;
  promotion_code: string;
  segment: string;
  tnc: string;
  tag_line: string;
  kv: string;
  packages: number[];
  methods: any[];
}
