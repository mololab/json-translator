import * as fs from 'fs';
import { error, success } from '../utils/console';

export async function readProxyFile(file_path: string) {
  const confs = {
    checkerRX: /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}:(\d){1,}$/,
  };
  const data = await fs.promises.readFile(file_path, 'utf8');
  if (!data) {
    error('proxy file is empty!');
    return;
  }

  let proxyList = data.split(/\r?\n/);

  proxyList = proxyList.filter(proxy_item => confs.checkerRX.test(proxy_item));

  success(`\n---------------- Proxy Mode ----------------\n`);
  global.proxyList = proxyList;
}
