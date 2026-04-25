import { toast } from "sonner";

export const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

/** Mock subscribe — local-only, no backend. */
export const subscribeToPush = async (
  _merchantId: string,
  merchantName: string
) => {
  toast.success(`We'll notify you when ${merchantName} has a new offer 🎉`);
  return true;
};

export const unsubscribeFromPush = async (
  _merchantId: string,
  merchantName: string
) => {
  toast.success(`Notifications off for ${merchantName}`);
  return true;
};
