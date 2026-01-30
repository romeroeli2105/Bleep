import { Layout } from "@/components/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-6 animate-in fade-in zoom-in duration-700 slide-in-from-bottom-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-light tracking-tight text-primary">
              Blank Page
            </h1>
            <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase opacity-60">
              Ready for creation
            </p>
          </div>
          
          <div className="w-16 h-[1px] bg-border mx-auto" />
        </div>
      </div>
    </Layout>
  );
}
