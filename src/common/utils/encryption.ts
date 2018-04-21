import * as sha256 from 'sha256'

export function passwordEncrypt(value: string): string {
  return sha256(value);
};
