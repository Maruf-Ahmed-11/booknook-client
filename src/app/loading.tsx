import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Loading() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-[#050505]">
            <LoadingSpinner size="lg" message="Accessing BookNook Digital Archives..." />
        </div>
    );
}

//✓✓✓