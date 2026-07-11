export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <main className="p-8">상품 상세 #{id} (구현 예정)</main>;
}
