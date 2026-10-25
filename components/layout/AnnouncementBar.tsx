import { site } from "@/config/site";

export function AnnouncementBar() {
  if (!site.announcement.enabled) return null;
  return (
    <div className="bg-tinta text-white">
      <p className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 px-4 py-2 text-center text-[0.8rem] font-medium sm:text-sm">
        {site.announcement.messages.map((m, i) => (
          <span key={m} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-amarillo" />}
            {m}
          </span>
        ))}
      </p>
    </div>
  );
}
