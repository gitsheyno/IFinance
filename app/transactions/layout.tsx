export default function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-background border-4">
      <main className="border-2 border-yellow-200">{children}</main>
    </div>
  );
}
