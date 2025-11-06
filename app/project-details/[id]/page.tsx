export default async function ProjectDetails(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return (
    <h1>Project Details ID: {id}</h1>
  );
}