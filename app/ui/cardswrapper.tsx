export default async function CardsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ul className="grid gap-4 md:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 list-none">
      {children}
    </ul>
  );
}
