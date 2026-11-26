// Loads icons from /public/icons as <img>, so Tailwind can tint via filter.
const map = {
  receipt: "/icons/01_receipt_bill.svg",
  bolt: "/icons/02_lightning.svg",
  meter: "/icons/03_meter_gauge.svg",
  solar: "/icons/04_solar_panel.svg",
  evidence: "/icons/05_document_search.svg",
  timeline: "/icons/06_timeline.svg",
  folder: "/icons/07_folder_check.svg",
  question: "/icons/08_chat_question.svg",
  download: "/icons/09_download_export.svg",
  shield: "/icons/10_shield_lock.svg",
  upload: "/icons/11_upload_cloud.svg",
  calendar: "/icons/12_calendar.svg",
  scale: "/icons/13_balance_scale.svg",
  home: "/icons/14_home.svg",
  chart: "/icons/15_bar_chart.svg",
  info: "/icons/16_info_circle.svg",
};

export default function Icon({ name, className = "w-5 h-5" }) {
  const src = map[name];
  if (!src) return null;
  return <img src={src} alt="" className={className} draggable={false} />;
}
