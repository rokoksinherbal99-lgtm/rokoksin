export default function AdminLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="mt-3 text-sm text-muted-foreground">Memuat...</p>
      </div>
    </div>
  );
}
