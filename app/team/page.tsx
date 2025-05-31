import { title, subtitle } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
      <h1 className={title()}>Coming Soon</h1>
      <p className={subtitle({ class: "mt-4" })}>
        We&apos;re working hard to bring you this page. Stay tuned!
      </p>
    </div>
  );
}
