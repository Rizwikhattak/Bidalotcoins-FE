// NotificationToggle.jsx

import { usePushNotifications } from "../../Hooks/usePushNotifications";

export default function NotificationToggle() {
  const { status, enable, disable } = usePushNotifications();

  if (status === "denied")
    return (
      <p>
        You previously blocked notifications. Enable them in your browser’s site
        settings and refresh the page.{" "}
        {/* UX hint for the “denied” edge-case */}
      </p>
    );

  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        checked={status === "granted"}
        onChange={(e) => (e.target.checked ? enable() : disable())}
      />
      Enable push notifications
    </label>
  );
}
