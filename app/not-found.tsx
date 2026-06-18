import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GradientText } from "@/components/ui/GradientText";
import { ChevronTiles } from "@/components/ui/ChevronTiles";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <ChevronTiles count={5} className="mb-8" tileClassName="h-8 w-4" />
      <p className="text-7xl font-extrabold tracking-tight">
        <GradientText>404</GradientText>
      </p>
      <h1 className="mt-4 text-2xl font-bold uppercase tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/" variant="gradient">
          Back to Home
        </Button>
        <Button href="/contact" variant="secondary">
          Contact Us
        </Button>
      </div>
    </Container>
  );
}
