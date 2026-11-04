interface LoadingSpinnerProps {
    message?: string;
    size?: "sm" | "md" | "lg";
    fullScreen?: boolean;
}

export default function LoadingSpinner({
    message = "Loading archive data...",
    size = "md",
    fullScreen = false
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "h-6 w-6 border-2",
        md: "h-12 w-12 border-[3px]",
        lg: "h-16 w-16 border-4",
    }[size];

    const content = (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
            <div className="relative">
                {/* Outer glowing track */}
                <div
                    className={`${sizeClasses} rounded-full border-zinc-800 border-t-[#e50914] animate-spin shadow-[0_0_25px_rgba(229,9,20,0.45)]`}
                />
            </div>
            {message && (
                <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-400 animate-pulse text-center">
                    {message}
                </p>
            )}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center bg-[#050505]">
                {content}
            </div>
        );
    }

    return content;
}

