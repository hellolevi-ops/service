import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata = { title: "隐私政策" };

export default function PrivacyPage() {
  return (
    <LegalShell title="隐私政策" updated="2026-09-28">
      <P>
        {SITE.brand}（经营展示主体：{SITE.icpText}；以下简称「我们」）重视您的个人信息保护。本政策说明我们如何收集、使用、存储与删除与留学咨询服务相关的信息。政策版本：{SITE.privacyVersion}。
      </P>
      <H>处理目的</H>
      <P>
        用于响应评估预约、匹配导师、服务履约、质量回访、合规审计与必要的安全防护。未经同意，不会向无关第三方出售个人信息。
      </P>
      <H>我们收集的信息</H>
      <P>
        包括但不限于：姓名、手机号、微信号、意向国家/赛道、教育背景摘要、来源页与 UTM、以及您主动填写的表单与沟通记录。低龄（K12）咨询还将收集监护人姓名与联系方式。我们不会以隐蔽方式收集与服务无关的敏感信息。
      </P>
      <H>保存期限</H>
      <P>
        未签约线索默认保存不超过 24 个月；签约客户资料按合同与会计档案要求保存。到期后删除或匿名化，法律另有要求的除外。
      </P>
      <H>共享范围</H>
      <P>
        仅在实现上述目的所必需时，与受托处理方（如云主机、邮件送达、企业微信客服工具）共享最小必要字段；我们要求对方按约定保密与删除。不会向无关营销方出售名单。
      </P>
      <H>撤回与删除</H>
      <P>
        您可通过监督邮箱 {SITE.complaintEmail} 申请查阅、更正、删除或撤回同意（法律允许范围内）。我们将在 15 个工作日内响应；撤回同意不影响撤回前基于同意的处理。
      </P>
      <H>未成年人</H>
      <P>
        面向低龄留学的咨询须由监护人确认并提供监护人联系方式。我们不会主动面向未满 14 周岁的儿童开展营销推送。
      </P>
      <H>Cookie 与统计</H>
      <P>
        网站使用必要 Cookie 以维持会话；可能使用隐私友好的访问统计（如配置 GA4 / 百度统计）。您可在浏览器中限制 Cookie，但可能影响部分表单体验。正式统计 ID 接入后将在本页补充说明。
      </P>
      <H>安全与日志</H>
      <P>
        线索与沟通记录保存在受控服务器环境；访问按岗位最小权限。系统日志与通知邮件默认对手机号脱敏展示。
      </P>
      <P>
        详细条款以签约时《个人信息处理告知同意书》为准。投诉与监督：{SITE.complaintEmail}。
      </P>
    </LegalShell>
  );
}

function LegalShell({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-6">
      <div className="page-banner">
        <p className="text-xs text-slate-500 mb-2">
          <Link href="/" className="hover:text-blue-900">
            首页
          </Link>{" "}
          / 法律文本
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-editorial-title">
          {title}
        </h1>
        <p className="text-xs text-slate-500 mt-2">最近更新：{updated}</p>
      </div>
      <div className="space-y-4 text-sm text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}

function H({ children }: { children: React.ReactNode }) {
  return <h2 className="text-base font-bold text-slate-900 pt-2">{children}</h2>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
