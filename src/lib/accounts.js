export const ACCOUNT_SIZES = [100000, 200000, 300000, 400000, 500000];

export function getAccountProfit(account) {
  return Math.max(0, account.balance - account.startingBalance);
}
