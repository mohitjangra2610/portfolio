import Container from "@/components/layout/container";

export default function Page() {
  return (
    <Container>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-lg text-gray-600">
          This is a showcase of my projects and skills. Feel free to explore and
          get in touch!
        </p>
      </div>
    </Container>
  );
}
