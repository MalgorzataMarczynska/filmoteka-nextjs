export default async function CardsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ul className="grid gap-8 grid-cols-4 list-none">{children}</ul>;
}
