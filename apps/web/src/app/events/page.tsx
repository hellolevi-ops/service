import Link from "next/link";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import { EXPO_EVENTS, BRANCH_OFFICES } from "@/data/portalData";

export const metadata = { title: "活动与巡展" };

export default function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <div className="pb-6 border-b border-slate-200">
        <span className="text-xs font-semibold text-amber-800 tracking-wider block mb-1">
          EVENTS & EXPOS · 活动巡展
        </span>
        <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 font-editorial-title tracking-tight">
          全球名校教育展与招生官专场
        </h1>
        <p className="text-sm text-slate-500 mt-2 max-w-3xl">
          线下巡展、招生官面对面与大咖讲座。可先报名占座，或预约一对一评估。
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {EXPO_EVENTS.map((e) => (
          <article
            key={e.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] mb-3">
                <span className="font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                  {e.status}
                </span>
                <span className="text-slate-500">{e.type}</span>
                <span className="text-slate-400 ml-auto">{e.badge}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 font-editorial-title leading-snug">
                {e.title}
              </h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{e.theme}</p>
              <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {e.dateTime}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {e.city} · {e.venue}
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  已报名 {e.registeredCount} 人
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {e.guestSchools.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-[10px] text-slate-600"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="/book"
              className="mt-5 w-full py-2.5 text-center text-xs font-bold bg-slate-900 text-white rounded-xl inline-flex items-center justify-center gap-1"
            >
              报名 / 预约评估
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </article>
        ))}
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-900 font-editorial-title mb-4">
          城市分公司与海外中心
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BRANCH_OFFICES.map((b) => (
            <div
              key={b.id}
              className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <strong className="text-slate-900 text-sm">
                  {b.city}
                  {b.province ? ` · ${b.province}` : ""}
                </strong>
                <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200">
                  {b.tier}
                </span>
              </div>
              <p className="text-slate-600">{b.address}</p>
              <p className="text-slate-500">
                {b.phone} · {b.hours}
              </p>
              <p className="text-slate-500">顾问 {b.consultantCount} 人</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
