function Empty({ resourceName }: { resourceName: string }) {
  return (
    <p className="mb-4"> Es konnten keine {resourceName} gefunden werden.</p>
  );
}

export default Empty;
