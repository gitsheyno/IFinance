export default function TransactionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" bg-background">
      <main className="">{children}</main>
    </div>
  );
}
