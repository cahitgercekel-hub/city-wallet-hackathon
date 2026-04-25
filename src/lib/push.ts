import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const VAPID_PUBLIC_KEY =
  import.meta.env.VITE_VAPID_PUBLIC_KEY ||
  import.meta.env.VITE_LOVABLE_VAPID_PUBLIC_KEY ||
  "";

export const isPushSupported = () =>
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  "PushManager" in window &&
  "Notification" in window;

export const isIOS = () => {
  if (typeof navigator === "undefined") return false;
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; ++i) arr[i] = raw.charCodeAt(i);
  return arr;
};

export const ensureServiceWorker = async () => {
  if (!("serviceWorker" in navigator)) return null;
  try {
    return (
      (await navigator.serviceWorker.getRegistration("/sw.js")) ??
      (await navigator.serviceWorker.register("/sw.js"))
    );
  } catch (e) {
    console.error("SW register failed", e);
    return null;
  }
};

export const subscribeToPush = async (
  merchantId: string,
  merchantName: string
) => {
  if (!isPushSupported()) {
    toast.error("Push notifications aren't supported on this browser.");
    return false;
  }
  if (isIOS()) {
    toast.info(
      "On iPhone, add this app to your Home Screen first to receive push notifications."
    );
  }
  if (!VAPID_PUBLIC_KEY) {
    toast.error("Push isn't fully configured yet — VAPID key missing.");
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    toast.error("Notifications permission was denied.");
    return false;
  }

  const reg = await ensureServiceWorker();
  if (!reg) {
    toast.error("Couldn't start the notification worker.");
    return false;
  }

  const sub =
    (await reg.pushManager.getSubscription()) ??
    (await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    }));

  const json = sub.toJSON() as {
    endpoint: string;
    keys: { p256dh: string; auth: string };
  };

  const { error } = await supabase.functions.invoke("subscribe-push", {
    body: {
      merchantId,
      merchantName,
      endpoint: json.endpoint,
      p256dh: json.keys.p256dh,
      auth: json.keys.auth,
    },
  });

  if (error) {
    toast.error("Couldn't save your subscription.");
    return false;
  }

  toast.success(`We'll notify you when ${merchantName} has a new offer 🎉`);
  return true;
};

export const unsubscribeFromPush = async (
  merchantId: string,
  merchantName: string
) => {
  const reg = await ensureServiceWorker();
  if (!reg) return false;
  const sub = await reg.pushManager.getSubscription();
  if (!sub) return false;

  await supabase.functions.invoke("unsubscribe-push", {
    body: { merchantId, endpoint: sub.endpoint },
  });

  toast.success(`Notifications off for ${merchantName}`);
  return true;
};

export const sendTestPush = async (merchantId: string, merchantName: string) => {
  const { error } = await supabase.functions.invoke("send-push", {
    body: {
      merchantId,
      title: `${merchantName} has a new offer!`,
      body: "Tap to view today's deal before it's gone.",
    },
  });
  if (error) {
    toast.error("Couldn't send test push.");
    return;
  }
  toast.success("Test push sent — check your notifications.");
};
