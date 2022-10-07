export interface PhoneInfo{
    OS: string;
    Model: string;
    Uptime: number[];
    Cpu: {
      cpu: string,
      core: number,
      freq: number
    };
    Memory: {
      total: number,
      free: number
    }
}