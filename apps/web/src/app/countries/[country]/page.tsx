import { redirect } from "next/navigation";

const MAP: Record<string, string> = {
  uk: "/tracks/uk-pg",
  us: "/tracks/us-ug",
  hk: "/tracks/hk-sg",
  sg: "/tracks/hk-sg",
};

export function generateStaticParams() {
  return Object.keys(MAP).map((country) => ({ country }));
}

export default async function CountryRedirectPage({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  redirect(MAP[country] || "/tracks");
}
