interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ComprovanteDetalhesPage({ params }: PageProps) {
    const { id } = await params;

    return (
        <div>
            Comprovante: {id}
        </div>
    );
}