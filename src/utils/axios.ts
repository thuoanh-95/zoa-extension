import axios from "axios";
import { ProxyAgent } from "proxy-agent";

export const agent = new ProxyAgent();

export const axiosClient = axios.create({
  proxy: false,
  httpsAgent: agent,
  httpAgent: agent,
});
