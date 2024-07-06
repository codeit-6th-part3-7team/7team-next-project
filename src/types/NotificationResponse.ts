type NotiDetailData = {
  createdAt: string;
  content: string;
  id: number;
};

export type NotiData = {
  totalCount: number;
  list: NotiDetailData[];
};
