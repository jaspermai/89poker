interface SubtitleProps {
    text: string;
    className?: string;
}

export function Subtitle({text, className = ''}: SubtitleProps) {
    return(
        <p className={`text-2xl md:text-4xl text-white flex items-center justify-center text-center break-words sm:px-4 ${className}`}>
            {text}
        </p>
    )
}