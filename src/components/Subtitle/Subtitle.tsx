interface SubtitleProps {
    text: string;
    className?: string;
}

export function Subtitle({text, className = ''}: SubtitleProps) {
    return(
        <p className={`text-4xl text-white flex items-center justify-center text-center break-words sm:text-2xl sm:px-4 ${className}`}>
            {text}
        </p>
    )
}