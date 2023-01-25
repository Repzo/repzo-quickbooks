import Repzo from "repzo";
export declare const set_error: (error_res: any) => any;
export declare const update_bench_time: (
  repzo: Repzo,
  app_id: string,
  key: string,
  value: string,
  format?: string
) => Promise<void>;
